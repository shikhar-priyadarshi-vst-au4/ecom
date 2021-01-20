import {SET_USER} from './auth.types';
export const SETUSER = (data) => {
    console.log("data", data);
    return dispatch => {
        dispatch({
            type : SET_USER,
            payload : data
        })
    }
}