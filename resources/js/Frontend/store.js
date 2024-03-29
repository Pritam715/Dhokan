import { createStore } from "redux";
import rootReducer from './components/reducers';
import { persistStore } from 'redux-persist';



export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default { store, persistStore };