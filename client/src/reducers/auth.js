import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILIURE,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from  '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true, //turn to false whwen we get resposne from backend.
    user: null
}


export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
     
        case SIGNUP_SUCCESS:
            case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
            };
        case SIGNUP_FAILIURE:
            case AUTH_ERROR:   
            case LOGIN_FAIL: 
            case LOGOUT:   //remove any invalid token from local storage.
                localStorage.removeItem('token');
                return  {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: true
                };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        default: return state;        
    }
}