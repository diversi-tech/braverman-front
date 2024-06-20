import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Login from '../../my-app/src/Component/Login';
import WorkerNav from './Component/workerNav.component';
import AdminNav from './Component/adminNav.component';
import Nav from './Component/nav.component'

const App = () => {
  const isAuthenticated = useSelector((state:{ user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);
  // const currentUser = useSelector((state:{ user: { currentUser: {UserEmail:string,UserPassword:string,UserType:string } } }) => state.user.currentUser);

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
