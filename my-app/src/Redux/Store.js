import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userReducer';
import leadsReducer from './Leads/leadsReducer';
import statusLeadReducer from './enum/statusLeadReducer';
import  statusProjectReducer from "./Project/projectStatusReducer";
import taskReducer from './Task/taskReducer';
import enumsReducer from './Enums/enumsReducer';
import projectReducer from './Project/projectReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    leads : leadsReducer,
    statusLead: statusLeadReducer,
    projectStatus:statusProjectReducer,
  }
    Task : taskReducer,
    LevelUrgencyStatus : enumsReducer,
    Project : projectReducer,
    }
});

export default store;