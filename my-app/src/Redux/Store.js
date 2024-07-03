import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userReducer';
import leadsReducer from './Leads/leadsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    leads : leadsReducer,
  }
});

export default store;