import React, { useEffect } from 'react';
import './App.css';


import { useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';
import { ShowProgramStatus } from './Component/Project/ShowProgramStatus';
import Links from './Component/Links/Links';

const App = () => {
  const isAuthenticated = useSelector((state: { user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);
  
  const navigate = useNavigate();

  useEffect(() => {


    if (!sessionStorage.getItem("isAuthenticated")) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
