import React, { useEffect } from 'react';
import './App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Component/nav/nav.component';
import Leads from './Component/leads/leads.component';
import ContactOptions from './Component/ContactOption/ContactOption';
import ChatForm from './Component/ContactOption/Chat';
import MoreStatus from './Component/project/moreStatus';



const App = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!sessionStorage.getItem("userId")) {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <>
    {/* <ContactOptions></ContactOptions>
    <ChatForm></ChatForm> */}
      <Nav />
      <Outlet />
      <MoreStatus ></MoreStatus>
    </>
  );
};

export default App;
