import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userReducer';
import leadsReducer from './Leads/leadsReducer';
import statusLeadReducer from './enum/statusLeadReducer';
import  statusProjectReducer from "./Project/projectStatusReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    leads : leadsReducer,
    statusLead: statusLeadReducer,
    projectStatus:statusProjectReducer,

  }
});

export default store;