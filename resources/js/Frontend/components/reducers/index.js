// import changeTheNumber from "./upDown";
import { cartReducer } from "./CartReducer";
import { AuthReducer } from "./AuthReducer";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from "redux";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['carts', 'Auth']
}

// const rootReducer = combineReducers(
//     {
//         carts: cartReducer,

//     }
// )
const rootReducer = combineReducers(
    {
        carts: cartReducer,
        Auth: AuthReducer

    }
)

// export default rootReducer;

export default persistReducer(persistConfig, rootReducer);