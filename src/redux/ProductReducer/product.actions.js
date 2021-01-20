import axios from "axios";
import {GET_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, TOTAL_QTY, RESET_CART} from './product.types';

export const getProducts = () => {
    return async dispatch => {
         try{
             let response = await axios.get("https://fakestoreapi.com/products");
             if(response.data && response.status === 200){
                dispatch({
                   type : GET_PRODUCTS,
                   payload : response.data
                })
             }
         }
         catch(error){
            console.log(error?.message);
         }
    }
}

export const addToCart = (item) => {
    console.log(item);
    return dispatch => {

        dispatch({
            type : ADD_TO_CART,
            payload : item
        })
        dispatch({
            type :  TOTAL_QTY
        })
    }
}

export const removeFromCart = (itemId) => {
    return dispatch => {
        dispatch({
            type : REMOVE_FROM_CART,
            payload : {id : itemId}
        })
        dispatch({
            type :  TOTAL_QTY
        })
    }
}

export const resetCart = () => {
    console.log("reset cart")
    return dispatch => {
        dispatch({
            type : RESET_CART
        })
    }
}