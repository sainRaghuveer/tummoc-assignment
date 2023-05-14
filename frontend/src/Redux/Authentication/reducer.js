import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_FAILURE, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "./actionTypes"

const initialState={
    isAuth:false,
    user:{},
    isLoading:false,
    isError:false,
}

export const reducer=(state=initialState, {type, payload})=>{

    switch(type){
        case USER_SIGNUP_REQUEST:{
            return {...state, isLoading:true}
        }
        case USER_SIGNUP_SUCCESS:{
            return {...state, isLoading:false, isAuth:true, user:payload}
        }
        case USER_SIGNUP_FAILURE:{

        }
        case USER_LOGIN_REQUEST:{
            return {...state, isLoading:true}
        }
        case USER_LOGIN_SUCCESS:{
            return {...state, isLoading:false, isAuth:true, user:payload}
        }
        case USER_LOGIN_FAILURE:{
            return {...state, isLoading:false, isError:true}
        }
        default:{
            return state;
        }
    }
}