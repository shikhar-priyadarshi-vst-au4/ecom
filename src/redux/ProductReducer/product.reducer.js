import {GET_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, TOTAL_QTY, RESET_CART} from './product.types';
const initState = {
    products : [],
    Items : [],
    totalQty : 0,
    totalPrice : 0
}
export const ProductsReducer = (state = initState, action) => {
   switch(action.type){
       case GET_PRODUCTS:
           return {...state, products : action.payload};
       case ADD_TO_CART: 
           return {...state, Items : addToCart(state.Items, action.payload) };
       case REMOVE_FROM_CART:
            return {...state, Items : removeFromCart(state.Items, action.payload.id)};    
       case TOTAL_QTY:
           return {...state, totalQty : calculateTotalQty(state.Items), totalPrice : calculateTotalPrice(state.Items)};
       case RESET_CART:
        console.log("reset cart in reducer")
           return {...state, totalQty : 0, totalPrice : 0, Items : []};            
       default:
           return state;
   }
}

const addToCart = (Items, item) => {
    let findItemIndex = Items.findIndex(v => v.id === item.id);
    if(findItemIndex > -1 && Items.length > 0){
        let matchedItem = Items[findItemIndex];
        matchedItem.qty++;
        Items.splice(findItemIndex, 1);
        Items.unshift(matchedItem);
    }
    else{
        let newItem = {...item};
        newItem.qty = 1;
        Items.unshift(newItem);
    }
    return Items;
} 

const removeFromCart = (Items, itemId) => {
    if(Items.length > 0){
        let findItemIndex = Items.findIndex(v => v.id === itemId);
        if(findItemIndex > -1){
            let matchedItem = Items[findItemIndex];
            matchedItem.qty--;
            if(matchedItem.qty === 0){
                Items.splice(findItemIndex, 1);
            }
            else{
                Items.splice(findItemIndex, 1, matchedItem);
            }
        }
    }
    return Items;
}

const calculateTotalQty = (Items) => {
    let totalQty = Items.reduce((acc,cur) => {
        acc+=cur.qty;
        return acc;
    }, 0)

    console.log("total qty in cart", totalQty);
    return totalQty;
}

const calculateTotalPrice = (Items) => {
    let totalPrice = Items.reduce((acc,cur) => {
        acc+=cur.price*cur.qty;
        return acc;
    }, 0)

    console.log("total qty in cart", totalPrice);
    return totalPrice.toFixed(2);
}