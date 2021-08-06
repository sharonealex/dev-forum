/* eslint-disable default-case */
//reducer functuon that takes in piece of state about alerts.
//an action is going to get dispatched from the actions file.
import {SET_ALERT, REMOVE_ALERT} from '../actions/types';
const initialState = [] //will be an array of objects



export default function(state = initialState, action){
 const {type, payload} = action;
    switch(type){
        case SET_ALERT: //when we dispatch type set alert, we return array with the existing state + new payload.
            return [...state, payload]; //state is immutable so we copy existing state and add to it
        //remove a specific array by id
        case REMOVE_ALERT:
         return state.filter(alert => 
             alert.id !== payload    //will return all alerts except that matches the payload.
         );
         default: return state;
    }
}