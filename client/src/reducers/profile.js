import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [] ,  //other viewed profiles,
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload} = action;

    switch(type){
         case GET_PROFILE:
             return {
                 ...state,
                 profile: payload,
                 loading: false
             }
             case UPDATE_PROFILE:
                return {
                    ...state,
                    profile: payload,
                    loading: false
                }
            case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
             case PROFILE_ERROR:
                 return {
                     ...state,
                     error: payload,
                     loading: false
                 };
              case CLEAR_PROFILE:
                  return {
                    ...state,
                    profile: null,
                    loading: false,
                    repos: []
                  }   
                case GET_REPOS:
                    return {
                        ...state,
                        repos: payload,
                        loading: false
                    }; 
                 default: 
                 return state;
    }
}