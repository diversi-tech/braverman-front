import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './nav.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import ProfileIcon from './profile'
import { Timer } from '../../model/Timer.model';
import TimerComponent from '../Timer/Timer.component';


const Nav = () => {
  // const currentUserType = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
  // const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  const type=sessionStorage.getItem("userType")
  const navigate = useNavigate();
  const location = useLocation();


  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    let greeting;
    if (hours < 12) {
      greeting = 'בוקר טוב';
    } else if (hours < 18) {
      greeting = 'צהריים טובים';
    } else {
      greeting = 'ערב טוב';
    }

    return `${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}, ${greeting}:)`;
  }
  useEffect(() => {
    // if (currentUserType === "customer")
    //   navigate('/not-found');
  }, [type, navigate]);
  return (
    <>
      <div id='imgandnav'>
        <div className="nav-container">
          <header>
            <nav className='nav'>
              <ul className='nav-list'>

                {type === "לקוח" ? (
                  <>
                  <p>{getGreetingMessage()}</p>
                  <li className={`nav-item ${location.pathname.includes('/dashboard') ? 'active' : ''}`}><Link to={'projectStatus'}></Link></li>  
               </>  
                  
                ) :
                type === "עובד" ? (<>
                    {/* <li className={`nav-item ${location.pathname.includes('/dashboard') ? 'active' : ''}`}><Link to={'dashboard'}>דשבורד</Link></li> */}
                    <li className={`nav-item ${location.pathname.includes('/leads') ? 'active' : ''}`}><Link to={'leads'}>לידים</Link></li>
                    <li className={`nav-item ${location.pathname.includes('/customers') ? 'active' : ''}`}><Link to={'customers'}>לקוחות</Link></li>
                    
                  </>)
                    :
                    type === "מנהל" ? (<>
                      {/* <li className={`nav-item ${location.pathname.includes('/dashboard') ? 'active' : ''}`}><Link to={'dashboard'}>דשבורד</Link></li> */}
                      <li className={`nav-item ${location.pathname.includes('/leads') ? 'active' : ''}`}><Link to={'leads'}>לידים</Link></li>
                      <li className={`nav-item ${location.pathname.includes('/customers') ? 'active' : ''}`}><Link to={'customers'}>לקוחות</Link></li>
                      <li className={`nav-item ${location.pathname.includes('/user') ? 'active' : ''}`}><Link to={'user'}>משתמשים</Link></li>
                      {/* <li className={`nav-item ${location.pathname.includes('/staff') ? 'active' : ''}`}><Link to={'staff'}>צוות</Link></li> */}
                      <li className={`nav-item ${location.pathname.includes('/tasks') ? 'active' : ''}`}><Link to={'tasks'}>משימות</Link></li>
                      <TimerComponent></TimerComponent>
                      {/* <li className={`nav-item ${location.pathname.includes('/bookkeeping') ? 'active' : ''}`}><Link to={'bookkeeping'}>הנה"ח</Link></li> */}
                    </>) :

                      <p>הזן פרטי גישה כדי להתחבר למערכת</p>
                }
              </ul>
            </nav>
          </header>
        </div>
        <img src={logo} alt="" id='img' />
        <ProfileIcon />
        
      </div>
      {/* <Outlet /> */}
    </>


  );
};

export default Nav;
