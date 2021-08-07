import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert'
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAILIURE,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from  './types'




//register user
export const signUp = ({name, email, password}) => async dispatch=>{
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, email, password});

    try{
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: SIGNUP_FAILIURE //dont need payload as we are intilaisng back to where it was. nothing new.
        })
    }

};

//load user function

export const loadUser = ()=> async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

  try{
       const res = await axios.get('/api/auth');
       dispatch({
           type: USER_LOADED,
           payload: res.data
       })
  } catch (err){
      dispatch(
          {
              type: AUTH_ERROR
          }
      )
  }
}

//login
export const login = (email, password) => async dispatch=>{
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL //dont need payload as we are intilaisng back to where it was. nothing new.
        })
    }

};


//LOGOUT

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT});
}