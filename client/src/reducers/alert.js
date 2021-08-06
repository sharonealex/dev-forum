//reducer functuon that takes in piece of state about alerts.
//an action is going to get dispatched from the actions file.
import {SET_ALERT, REMOVE_ALERT} from '../actions/types';
const initialState = [] //will be an array of objects



export default function(state = initialState, action){

    switch(action.type){
        case SET_ALERT:
            return [...state, action.payload] //state is immutable so we copy existing state and add to it
        //remove a specific array by id
        case REMOVE_ALERT:
         return state.filter(alert => 
             alert.id !== alert.action.payload
         )    
    }
}