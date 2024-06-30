import React, { useEffect } from 'react';
import './App.css';


import { useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const isAuthenticated = useSelector((state: { user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {

     //sessionStorage.setItem('isAuthenticated','true')
    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
