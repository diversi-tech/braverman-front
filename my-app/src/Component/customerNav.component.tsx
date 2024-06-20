import React from "react"

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import ShowUsers from "./ShowUsers.component"
import { useEffect } from "react";

const CustomerNav = () => {

    const navigate = useNavigate();
  
    useEffect(() => {
       navigate('/customers');
     }, [navigate]);
   
     return (
      <Outlet/>
     );
   };
   


export default CustomerNav
