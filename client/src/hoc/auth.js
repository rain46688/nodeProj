import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'

//adminRoute = null는 어드민인지 판단하는건데 true면 어드민이고 아무것도 안넣으면 자동 null넣는다는 문법이라함
export default function (SpecificComponent, option, adminRoute = null){

    //위 파라미터의 option
    //null = 아무나 출입 가능한 페이지
    //true = 로그인한 유저만 출입 가능한 페이지
    //false = 로그인안한 유저만 출입 가능한 페이지


    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response =>{
                console.log(response)
                
                //분기 처리

                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                        //로그인하고 오라고 보내버리기
                    }
                }else{
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                        //어드민 출입 페이지에 어드민이 아닌 유저가 들어오는 경우 메인으로 보내기
                    }else{
                        if(!option){
                            props.history.push('/')
                            //로그인한 유저가 로그인 페이지나 회원가입 페이지에 접속하려고할때 메인으로 보내기
                        }
                    }
                }


            })


        },[])

        return (
            //이렇게 해주면 각각 컴포넌트에 react-router-dom 넣어줄 필요없음
            <SpecificComponent{...props}/>
        )
    }
    return AuthenticationCheck
}