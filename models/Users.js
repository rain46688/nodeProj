const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// 10글자의 솔트값을 만든다는 의미
const saltRounds = 10

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
        maxlength: 5
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


userSchma.methods.comparePassword = function(plainPassword,callbackFunction){
    //플레인 패스워드를 암호화해서 디비에 비교해서 같은지 확인
    bcrypt.compare(plainPassword,this.password, function(err,isMatch){
        if(err) return callbackFunction(err)
        callbackFunction(null, isMatch)
    })

}



const User = mongoose.model('User',userSchma)
module.exports = { User }