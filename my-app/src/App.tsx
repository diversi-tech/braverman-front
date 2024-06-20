import React, { useEffect } from 'react';
import './App.css';
import AddUser from "./Component/addUser.component"
import ProjectsTable from './Component/costumers.component';


import { useDispatch, useSelector } from 'react-redux';
import Nav from './Component/nav.component';
import Login from './Component/Login';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from './Redux/userAction';

const App = () => {
  const isAuthenticated = useSelector((state:{ user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);
console.log(isAuthenticated);

const dispatch = useDispatch();

  useEffect(() => {
    // לדוגמה, ניתן לקרוא ל-API כדי לוודא את מצב המשתמש
    const user = { username: 'JohnDoe' ,role:"admin"}; 

    // נתונים לדוגמה
    dispatch(setUser(user));

  }, [dispatch]);



 
    const navigate = useNavigate();
  
  //  useEffect(() => {
    if(!isAuthenticated)
      {
        console.log("effect");
        console.log(isAuthenticated);
        
        
        navigate('/login');

      }
    // }, [isAuthenticated,navigate]);
  
    return (
     <Outlet/>
    );
  };
  
  export default App;
