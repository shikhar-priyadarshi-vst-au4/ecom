import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {rootReducer} from './root.reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['products', 'auth'], // which reducer want to store
    stateReconciler: hardSet,  
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunkMiddleware));

const persistor = persistStore(store);

export { persistor, store };