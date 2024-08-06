import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/login/Login';
import { Dashboard } from './Component/dashboard/dashboard.component';
import Leads from './Component/leads/leads.component';
import { Staff } from './Component/staff/staff.component';
import { Tasks } from './Component/tasks/tasks.component';
import { Bookkeeping } from './Component/bookkeeping/bookkeeping.component';
import { NotFound } from './Component/notFound/notFound.component';
import { MainProject } from './Component/project/projects/projectMain/mainProject.component';
import Nav from './Component/nav/nav.component';
import UserTable from './Component/user/user.component';
import { TaskCategories } from './Component/adminScreen/taskCategories/taskCategoriesMain/taskCategories.component';
import ShowProjectStatus from './Component/project/ShowProjectStatus';
import { DashboardGraph } from "./Component/graphLead/mainGraphLead.component";
import { Info } from './Component/tasks/info';
import QuickActions from './Component/userScreen/quickActions';
import ReportIssue from './Component/userScreen/reportFault';
import Feedback from './Component/userScreen/feedback';
import UrgentTasksTable from './Component/dashboard/urgentTasks';
import AttendanceReport from './Component/Timer/AttendanceReport.component';
import ChatTable from './Component/tasks/chat';
import AnyDeskChecker from "./Component/technicalSupport/anydesck";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log('REACT_APP_BRAVERMAN:', process.env.REACT_APP_BRAVERMAN);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/nav" element={<Nav />}></Route>
            <Route path="/dashboardStatus" element={<DashboardGraph />} />
            <Route path="/tehila" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/bookkeeping" element={<Bookkeeping />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/customers" element={<MainProject />} />
            <Route path='/leads' element={<Leads />} />
            <Route path='/user' element={<UserTable />} />
            <Route path='/AttendanceReport/:userId' element={<AttendanceReport />} />
            <Route path='/projectStatus' element={<ShowProjectStatus />} />
            <Route path='/taskCategories' element={<TaskCategories />} />
            <Route path='/quickActions' element={<QuickActions />} ></Route>
            <Route path='/reportIssue' element={<ReportIssue />} ></Route>
            <Route path='/feedback' element={<Feedback />} ></Route>
            <Route path='/urgentTasksTable' element={<UrgentTasksTable />} ></Route>
            <Route path='/chat' element={<ChatTable />} ></Route>
            <Route path='/support' element={<AnyDeskChecker />} ></Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
