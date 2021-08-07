import axios from "axios"
import { setAlert } from "./alert"

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

export const getCurrentProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profiles/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    }catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//create profile
//history object has the push method for redirect
export const createProfile = (formData, history, edit = false) => async dispatch => {
try{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await axios.post('/api/profiles', formData, config);

        dispatch({
        type: GET_PROFILE,
        payload: res.data
        })

dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created', 'success'))

if(!edit){
    history.push('/dashboard') //thisis how we do in actions
}

    }
catch(err){
    const errors = err.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    
    dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
    })
}
}



//ADD EXPERIENCE

export const addExperience = (formData, history)=> async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const res = await axios.put('/api/profiles/experience', formData, config);
    
            dispatch({
            type: GET_PROFILE,
            payload: res.data
            })
    
    dispatch(setAlert('Experience Added', 'success'))
    
   
        history.push('/dashboard') //thisis how we do in actions
    
    
        }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//educ

export const addEducation = (formData, history)=> async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const res = await axios.put('/api/profiles/education', formData, config);
    
            dispatch({
            type: GET_PROFILE,
            payload: res.data
            })
    
    dispatch(setAlert('Education Added', 'success'))
    
   
        history.push('/dashboard') //thisis how we do in actions
    
    
        }
    catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
