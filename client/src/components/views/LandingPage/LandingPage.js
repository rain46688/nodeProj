import React,{useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickLogoutHandler = () =>{
        //여긴 redux를 사용하지않고 그냥 axios를 들어가서씀 ajax랑 비슷
        axios.get(`/api/users/logout`).then(
            response => {
                console.log(response.data)
                if(response.data.success){
                    props.history.push('/login')
                }else{
                    alert('로그아웃 실패')
                }
            }
        )
    }

    return (
        <div style={{display:'flex', justifyContent : 'center', alignItems: 'center', width:'100%', height:'100vh'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h2>시작 페이지</h2>
                <button onClick={onClickLogoutHandler}>로그아웃</button>
            </div>
        </div>
    )
}

export default withRouter(LandingPage)
 