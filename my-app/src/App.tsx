import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import AddUser from "./Component/addUser.component"
import ProjectsTable from './Component/costumers.component';

import Login from '../../my-app/src/Component/Login';
import WorkerNav from './Component/workerNav.component';
import AdminNav from './Component/adminNav.component';
import Nav from './Component/nav.component'

const App = () => {
  const isAuthenticated = useSelector((state:{ user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);


  return (
    <div className="App">

      
   
      {!isAuthenticated ? (
        <Login />
      ) : (
        <Nav/>
      )}
    </div>
  );
};

export default App;
