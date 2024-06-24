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
import { Dashboard } from './Component/dashboard.component';
import { Bookkeeping } from './Component/bookkeeping.component';
import { Staff } from './Component/staff.component';
import { Tasks } from './Component/tasks.component';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Leads from './Component/leads.component';
import ShowUsers from './Component/ShowUsers.component';
import Login from './Component/Login';
import Nav from './Component/nav.component';
import { NotFound } from './Component/notFound.component';


const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {

        path:'login',
        Component:Login
      },
      {
        path:'home',
        Component:Nav,
        children:[
          {
            path: 'dashboard',
            Component: Dashboard,
          },{
            path: 'leads',
            Component: Leads,
          },{
            path: 'customers',
            Component: ShowUsers,
          },{
            path: 'staff',
            Component: Staff,
          }, {
            path: 'tasks',
            Component: Tasks,
          },{
            path: 'bookkeeping',
            Component: Bookkeeping,
          },
        ]
      },
      {
        path: 'customers',
        Component: ShowUsers,
      },{
        path:'not-found',
        Component:NotFound
      }
      
    
        
 ] }]
      
                        
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
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
