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
import ProjectsTable from './Component/customers/costumers.component';
import { MainProject } from './Component/project/projects/projectMain/mainProject.component';
import Nav from './Component/nav/nav.component';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
console.log('REACT_APP_BRAVERMAN:', process.env.REACT_APP_BRAVERMAN);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />}>
            <Route path="/nav" element={<Nav />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/bookkeeping" element={<Bookkeeping />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/customers" element={<ProjectsTable />} />
            <Route path="/main-project" element={<MainProject />} />
            <Route path='/leads' element={<Leads />} />
            </Route>
          </Routes>
        </HashRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
