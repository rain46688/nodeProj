//export default인건 {}없이 가져올수있다고한다.
const express = require('express')
const app = express()
//포트 번호
const port = 5000
const bodyParser = require('body-parser')
const config = require('./config/key')
const {User} = require('./models/Users')
//cookieparser사용하기 토큰 쿠키에 저장
const cookieParser = require('cookie-parser')
//미들웨어 auth
const {auth} = require('./middleware/auth')


//application/x-www-form-urlencoded 이런걸 분석해서 가져오기 위해 아래 옵션을 추가
app.use(bodyParser.urlencoded({extended:true}))

//application/json 이런걸 분석해서 가져오기 위해 아래 옵션을 추가
app.use(bodyParser.json())
app.use(cookieParser())

const monoose = require('mongoose')
const { json } = require('body-parser')
monoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('연결됨....'))
.catch(err => console.log(err))


app.get('/api/hello', (req,res) =>{
  res.send('서버에서 보낸 메세지')
})

app.get('/', (req, res) => {
  res.send('Hello World! sfsdfsdfsdf')
})

app.post('/api/users/register',(req, res) =>{

    //회원 가입 필요한 정보들을 client에서 가져오면 그것을 DB에 넣어준다.

    const user = new User(req.body)
  //req.body는 json 형식으로 넘어온다.
  //이건 bodyParser를 이용해서 클라이언트의 정보를 req로 받아주는것이라고한다.

  //몽고 디비에있는 함수
  user.save((err, userInfo) => {
    if(err) return res.json({success:false, err})
    //성공 못하면 false랑 err 내용이 뜨는것
    return res.status(200).json({//200은 성공을 의미
      success:true
      //성공하면 success가 true가 뜨고
    })
  })
})

app.post('/api/users/login', (req, res) => {

      //이메일 디비에서 확인
      //몽고디비에서 제공하는 findOne 함수를 이용해서 찾기
      //req.body.email는 넘어오는 리퀘스트에 email 값
      User.findOne({email:req.body.email}, (err, userInfo) =>{
        //userInfo가 없으면 로그인 실패라고 표시해줌
        console.log("userInfo : "+userInfo)
        //userInfo 값에는 몽고디비에서 해당 이메일에 맞는 값들을 가져와줌 role,id,name,email 등등
        if(!userInfo){
          return res.json({
            loginSuccess:false,
            message:"로그인 실패"
          })
        }

        //비밀번호 확인
    //comparePassword 함수는 Users.js에서 만듬
    userInfo.comparePassword(req.body.password,(err, isMatch) =>{
        console.log("isMatch : "+isMatch)
        console.log("err : "+err) 
        console.log("req.body.password : "+req.body.password)

        //isMatch가 false인경우
        if(!isMatch)
        return res.json({
          loginSuccess:false, 
          message:"비밀번호 틀림"})
        //isMatch가 true인 경우
        //로그인 성공하면 토큰 생성하기
        userInfo.generateToken((err, userInfo) =>{
          //err가 있으면 400 페이지랑 에러를 표시한다
          console.log("err : "+err)
          if(err) return res.status(400).send(err)

          //토큰을 쿠키나 로컬스토리지에 저장한다
          res.cookie("loginMember",userInfo.token).status(200).json({
            loginSuccess : true,
            userId : userInfo._id,
            message:"로그인 성공"
          })
      })
    })
  })
})

//auth 미들웨어이다.
// role 1 어드민 role 2 특정 부서 어드민
// role 0 일반유저 role 0이 아니면 관리자
// 이건 만드는 사람이 정하는것
app.get('/api/users/auth',auth,(req,res) =>{
  console.log("미들웨어 지나서 메소드 실행됨");
  //여기까지 미들웨어를 통과해왔다는것은 
  //authentication 이 true라는 말
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
})

//auth를 넣는건 findOneAndDelete 함수를 쓸때 req.user._id를
//미들웨어 auth에서 넣은 user를 가져와야되서 그렇다함
app.get('/api/users/logout',auth, (req,res) => {

  console.log("req.user._id : "+req.user._id)
  //몽고 디비에서 제공하는 함수
  User.findOneAndUpdate({_id : req.user._id},{token:""},(err, user) => {
    if(err) return res.json({success:false, err})
    return res.status(200).send({
      success:true,
      message:"로그 아웃 성공"
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})