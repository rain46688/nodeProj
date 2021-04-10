//import React from 'react'
import React, {useState} from 'react'//useState는 여기서 가져올수있음
//redux 사용하려면 필요`
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {


    //Dispatch 이용하기
    const dispatch = useDispatch();

    //state하면 자동완성있음
    //""로 주는 이유는 처음에 빈칸이기 때문
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    //이벤트 핸들러를 실행해서 이메일이랑 패스워드 input을 변경한느것
    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();//새로고침 안되게 만들기
        
        console.log('이메일 : ',Email);
        console.log('이름 : ',Name);
        console.log('비번 : ',Password);
        console.log('비번 확인 : ',ConfirmPassword);

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 서로 맞지 않습니다.')
        }

        let body = { 
            email : Email,
            password : Password,
            name : Name
        }
        //(registerUser 액션을 user_acction.js에 만들어줘야된다.
        dispatch(registerUser(body)).then(response =>{
            //여기서 payload 확인은 server 에 index.js에서 뭘로 줬냐에 따라 다른거 registerSuccess아니고 success임 
            if(response.payload.success){
                //매핑 이동 props를 이용함 
                props.history.push('/login')
            }else {
                alert('Failed to sign up!')
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
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button type="submit">
                Join
            </button>

        </form>

    </div>
    )
}

export default withRouter(RegisterPage)
