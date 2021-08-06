import {SET_ALERT, REMOVE_ALERT} from './types'; //thse are to be dispatched which triggers a case in the reducer
  
import { v4 as uuidv4 } from 'uuid';


//setAlert action
export const setAlert = (msg, alertType)=>(dispatch)=>{ //want to dispatch more than one action type from this function, so using thunk middleware
    const id = uuidv4();
dispatch({
    type: SET_ALERT,
    payload: {msg, alertType, id}
});
setTimeout(()=>{
 dispatch({
     type: REMOVE_ALERT,
     payload: id
 })
}, 2000) // this will be dispatched 2 secs after previous action

};