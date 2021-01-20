import {combineReducers} from 'redux';
import {AuthReducer} from './AuthReducer/auth.reducer';
import {ProductsReducer} from './ProductReducer/product.reducer';
export const rootReducer = combineReducers({
    auth : AuthReducer,
    products : ProductsReducer,
})