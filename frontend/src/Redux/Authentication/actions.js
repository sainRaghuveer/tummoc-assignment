import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE } from "./actionTypes"
import axios from "axios";


const signupRequestAction=()=>{
    return(
        {type:USER_LOGIN_REQUEST}
    )
}
const signupSuccessAction=(payload)=>{
    return(
        {type:USER_LOGIN_SUCCESS, payload}
    )
}
const signupFailureAction=()=>{
    return(
        {type:USER_LOGIN_FAILURE}
    )
}

const loginRequestAction=()=>{
    return(
        {type:USER_LOGIN_REQUEST}
    )
}
const loginSuccessAction=(payload)=>{
    return(
        {type:USER_LOGIN_SUCCESS, payload}
    )
}
const loginFailureAction=()=>{
    return(
        {type:USER_LOGIN_FAILURE}
    )
}



export const signup=(userData, successToast, routeNavigate)=>(dispatch)=>{
    dispatch(signupRequestAction());

    return axios.post(`http://localhost:8800/signup`,userData).then((res)=>{
        // console.log("loginUserData", res)
    dispatch(signupSuccessAction(res.data.user))
    successToast(res.data.message, "success");
    routeNavigate()
    }).catch((error)=>{
        // console.log("error", error)
        dispatch(signupFailureAction());
        successToast(error.response.data.message, "error")
    })
}

export const login=(userData, successToast, routeNavigate)=>(dispatch)=>{
    dispatch(loginRequestAction());

    return axios.post(`http://localhost:8800/login`,userData).then((res)=>{
        // console.log("loginUserData", res)
    dispatch(loginSuccessAction(res.data.user));
    successToast(res.data.message, "success");
    routeNavigate()
    }).catch((error)=>{
        // console.log("error", error)
        dispatch(loginFailureAction());
        successToast("Something went wrong check your email or password", "error")
    })
}