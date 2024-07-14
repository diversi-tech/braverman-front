import React, { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Component/nav/nav.component';
import Leads from './Component/leads/leads.component';


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    debugger
    if (!sessionStorage.getItem("userId")) {
      navigate('/Login');
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
