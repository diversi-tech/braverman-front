import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userReducer';
import leadsReducer from './Leads/leadsReducer';
import statusLeadReducer from './enum/statusLeadReducer';
import statusProjectReducer from './Project/projectStatusReducer';
import projectReducer from './Project/projectReducer';
import taskReducer from './tasx/taskReducer';
import enumsReducer from './enum/enumReducer';
import timerReducer from './Timer/timerReducer';
import UserTypeReducer from './User/userTypeReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    leads: leadsReducer,
    statusLead: statusLeadReducer,
    projectStatus: statusProjectReducer,
    Task: taskReducer,
    LevelUrgencyStatus: enumsReducer,
    Project: projectReducer,
    UserType: UserTypeReducer
  },
});

export default store;
