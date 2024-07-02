import React, { useEffect } from 'react';
import './App.css';


import { useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const isAuthenticated = useSelector((state: { user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);
  //const isAuthenticated = sessionStorage.getItem('userId')
  const navigate = useNavigate();

  useEffect(() => {


    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate('/Login');
    }
  }, [isAuthenticated, navigate]);

 

  return (
    <>
    
      <Outlet />
    </>
  );
};

export default App;
