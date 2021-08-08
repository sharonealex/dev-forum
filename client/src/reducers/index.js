
//this file is the root reducer
//we will have multiple reducers profile, alert 
import {combineReducers} from 'redux';
import alert from './alert'
import auth from './auth'
import profile from './profile';
import post from './post'

export default combineReducers ({ //add all the reducers here
alert,
auth,
profile,
post
})

//jwt is stateless. so on page loada its lost 
//so in the state it goes back to authenticated: null
//we need to persist user to keep session logged in