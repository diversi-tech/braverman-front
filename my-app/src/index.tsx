import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { createBrowserRouter,RouterProvider,
} from "react-router-dom";
import { Dashboard } from './Component/dashboard/dashboard.component';
import { Bookkeeping } from './Component/bookkeeping/bookkeeping.component';
import { Staff } from './Component/staff/staff.component';
import { Tasks } from './Component/tasks/tasks.component';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Leads from './Component/leads/leads.component';
import Login from './Component/login/Login';
import Nav from './Component/nav/nav.component';
import { NotFound } from './Component/notFound/notFound.component';
import ProjectsTable from './Component/customers/costumers.component';
import {MainProject} from "./Component/project/projects/projectMain/mainProject.component";
const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path:'login',
        Component:Login
      },
      // {
      //   path:'home',
      //   Component:Nav,
        // children:[
          {
            path: 'dashboard',
            Component: Dashboard,
          },{
            path: 'leads',
            Component: Leads,
          },{
            path: 'customers',
            Component: MainProject,
          },{
            path: 'staff',
            Component: Staff,
          }, {
            path: 'tasks',
            Component: Tasks,
          },{
            path: 'bookkeeping',
            Component: Bookkeeping,
          }
        ]},
      // },
     {
        path:'not-found',
        Component:NotFound
      },
      {
        path:'*',
        Component:NotFound
      }
      
    
      
 ] 
  
                        
);


const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);

reportWebVitals();
