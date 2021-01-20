import {SET_USER} from './auth.types';

let initState = {
    // isAuthenticated : false,
    userInfo : null
}


export const AuthReducer = (state = initState, action) => {
    switch(action.type){
        case SET_USER:
            console.log("payload", action.payload);
            return {...state, userInfo : action.payload};
        default :
           return state;
    }
}