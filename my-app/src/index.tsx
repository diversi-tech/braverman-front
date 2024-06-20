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
import { Customers } from './Component/customers.component';
import { Staff } from './Component/staff.component';
import { Tasks } from './Component/tasks.component';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import WorkerNav from './Component/workerNav.component';
import Leads from './Component/Leads.component';


const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'customers',
        Component: Customers,
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
      {
        path:'Leads',
        Component:Leads,
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
