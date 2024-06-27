import { combineReducers, createStore } from 'redux';
import userReducer from './User/userReducer';

const rootReducer = combineReducers({
  user: userReducer 
});

const store = createStore(rootReducer);
window.store = store;
export default store;
