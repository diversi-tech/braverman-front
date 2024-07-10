import React, { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Component/nav/nav.component';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    debugger
    if (!sessionStorage.getItem("userId")) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default App;
