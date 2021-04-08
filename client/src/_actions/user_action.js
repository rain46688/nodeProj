import axios from 'axios'
//타입에서 가져오기
import {LOGIN_USER} from './types'

export function loginUser(dataToSubmit){
        //서버로 state에 있는 값을 보내기 우리가 스프링에서 ajax쓰는거랑 비슷함
        //'/api/users/login'이건 서버쪽 js에있는 매핑값 성공하면 reponse로 넘어옴
    const request =  axios.post('/api/users/login', dataToSubmit).then(response => 
        response.data
    )
    //reducer로 넘기기
    return{
        type : LOGIN_USER,
        payload : request
    }
}