const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require('./models/Users')


//application/x-www-form-urlencoded 이런걸 분석해서 가져오기 위해 아래 옵션을 추가
app.use(bodyParser.urlencoded({extended:true}))

//application/json 이런걸 분석해서 가져오기 위해 아래 옵션을 추가
app.use(bodyParser.json())

const monoose = require('mongoose')
const { json } = require('body-parser')
monoose.connect('mongodb+srv://circlestar:alstn8775*@cmsmongo.07d76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('연결됨....'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! sfsdfsdfsdf')
})

app.post('/register',(req, res) =>{

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})