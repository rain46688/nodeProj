//import React from 'react'
import React, {useState} from 'react'//useState는 여기서 가져올수있음
import axios from 'axios'
//redux 사용하려면 필요`
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'

function LoginPage(props) {

    //Dispatch 이용하기
    const dispatch = useDispatch();

    //state하면 자동완성있음
    //""로 주는 이유는 처음에 빈칸이기 때문
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    //이벤트 핸들러를 실행해서 이메일이랑 패스워드 input을 변경한느것
    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();//새로고침 안되게 만들기

        console.log('이메일 : ',Email);
        console.log('비번 : ',Password);

        let body = {
            email : Email,
            password : Password
        }
        //loginUser라는 액션을 만들어줘야된다.
        dispatch(loginUser(body)).then(response =>{
            if(response.payload.loginSuccess){
                //매핑 이동 props를 이용함 
                props.history.push('/')
            }else {
                alert('Error')
            }
        })

    }

    return ( 
        <div style={{display:'flex', justifyContent : 'center', alignItems: 'center', width:'100%', height:'100vh'}}>
        
        <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}>
            <label>Email</label>
            {/* 타이핑을하면 onChange라는 이벤트를 실행해서 state를 바꿔줌 */}
            <input type="email" value={Email} onChange={onEmailHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <br/>
            <button type="submit">
                Login
            </button>

        </form>

    </div>
    )
}

export default LoginPage
