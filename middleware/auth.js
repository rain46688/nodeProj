//user 모델 불러오기
const { User } = require('../models/Users');


let auth = (req, res, next) => {
    console.log("auth.js안에 auth 메소드 실행됨");
    //인증 처리 하는곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.loginMember;

    //토큰을 복호화 한후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        console.log("auth.js안에 auth 안에 findByToken 메소드 실행됨");
    //유저가 있으면 인증됨
    //유저가 없으면 인증 안됨
        if(err) res.status(200).send(err);
        if(!user) return res.json({isAuth : false, error : true});

        //index.js에서 req로 사용하기 위해서 token 이랑 user를 넣는것
        req.token = token;
        req.user = user;
        //다음으로 진행하기 위해 next를 씀
        next();
    });


}

//다른곳에서 쓰기 위해
module.exports = { auth };