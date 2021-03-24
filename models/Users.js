const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// 10글자의 솔트값을 만든다는 의미
const saltRounds = 10
//jsonwebtoken 가져오기
const jwt = require('jsonwebtoken');

const userSchma = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },email:{
        type: String,
        trim:true,
        unique:1
    },password:{
        type: String,
        maxlength: 500
    },lastname:{
        type: String,
        maxlength: 50
    },role:{
        type:Number,
        default: 0
    },image: String,
    token:{
        type: String
    },tokenExp:{
        type: Number
    }
})

//save하기 전에 즉 몽고 디비에 넣기 전에 처리할 함수를 적는것
//비밀번호를 암호화하려면 디비에 넣기 전에 해야되기때문이다.
userSchma.pre('save',function( next ){
    //비밀번호를 암호화 시킨다.
    console.log("Users.js pre실행")
    let user = this;//이건 위에 모델들을 가르키는것이다. user.password하면 사용자가 입력한 비밀번호가 넘어옴

    if(user.isModified('password')){
        //패스워드가 변경될때만 실행되게 만듬
        bcrypt.genSalt(saltRounds,function(err, salt){
            //에러 났을 경우
            if(err) return next(err)
            //user.password 플래인 패스워드
            //성공했을경우
            bcrypt.hash(user.password, salt, function(err, hash){
                //에러 났을경우
                if(err) return next(err)
                //성공했을 경우
                user.password = hash
                next()
            })
        })
    }else {
        next()
    }
})

//comparePassword 함수 생성
userSchma.methods.comparePassword = function(plainPassword,callbackFunction){
    console.log("Users.js comparePassword실행")
    //플레인 패스워드를 암호화해서 디비에 비교해서 같은지 확인
    console.log("plainPassword : "+plainPassword)
    console.log("this.password : "+this.password)
    bcrypt.compare(plainPassword, this.password, function(err, isMatchPassword){
        console.log("isMatchPassword : "+isMatchPassword+", err : "+err)
        //bcrypt의 compare함수로 플레인 패스워드를 암호화하고 기존 패스워드랑 비교
        if(err) return callbackFunction(err)
        //callbackFunction 콜백 함수로 err를 보내거나 null, isMatchPassword(참거짓)를 일치하냐 안하냐 보냄
        callbackFunction(null, isMatchPassword)
    })
}

userSchma.methods.generateToken = function(callbackFunction){
    //jsonwebToken을 이용해서 token을 생성하기
    //위의 모델에서 this로 가져오는것 
    const user = this
    //_id는 몽고 디비에 자동으로 들어가는 id 컬럼, 유저마다 식별자, 기본키 라보면됨
   let token =  jwt.sign(user._id.toHexString(), 'cmsweb')  
    //user._id, 'cmsweb' 둘을 합쳐서 token을 만드는것이고 'cmsweb'으로 user id를 가져올수있음
    user.token = token
    //몽고 디비에서 쓰는 save함수를 이용해서 디비에 token값 넣기
    user.save(function(err, user){
        if(err) return callbackFunction(err)
        //에러가 없는 경우에는 에러는 null이고 user정보를 넣어줌
        callbackFunction(null, user)
    })
}

//token은 auth.js에서 넘어온 쿠키에 있던 토큰값 현재 로그인한 유저 토큰
userSchma.statics.findByToken = function(token, callbackFunction){
    console.log("findByToken 메소드 실행됨");
    let user = this;

    //토큰을 디코드하기
    jwt.verify(token, 'cmsweb', function(err, decode_user_id){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id" : decode_user_id, "token":token},function(err, userInfo){
            //근데 이미 로그인해서 토큰이 쿠키에 저장되어있으면
            //디비랑 비교해서 이미 인증이 된거 아닌가??
            //로그인할땐 이메일이랑 비밀번호를 비교함
            if(err) return callbackFunction(err)
            callbackFunction(null, userInfo)
        })


    })
}



const User = mongoose.model('User',userSchma)
module.exports = { User }