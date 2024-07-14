import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userReducer';
import leadsReducer from './Leads/leadsReducer';
import statusLeadReducer from './enum/statusLeadReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    leads : leadsReducer,
    statusLead: statusLeadReducer
  }
});

export default store;