  import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './nav.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from "../../assets/images/logo.png"
import ProfileIcon from './profile'
import { Timer } from '../../model/Timer.model';
import TimerComponent from '../Timer/Timer.component';

import dashboardIcon from '../../assets/images/dashbord.png';
import leadsIcon from '../../assets/images/leads.png';
import projectsIcon from '../../assets/images/projects.png';
import customersIcon from '../../assets/images/customers.png';
import teamIcon from '../../assets/images/team.png';
import statisticsIcon from '../../assets/images/statistics.png';
import presenceIcon from '../../assets/images/presence.png';
import bookkeepingIcon from '../../assets/images/bookkeeping.png';
import tasksIcon from '../../assets/images/tasks.png';

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

    return `${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}, ${greeting}:`;
  };

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
                    <li className={`nav-item ${location.pathname.includes('/projectStatus') ? 'active' : ''}`}>
                      <Link to={'projectStatus'}>סטטוס פרויקטים</Link>
                    </li>
                  </>
                ) :

                  type === "עובד" ? (
                    <>
                      <li className={`nav-item ${location.pathname.includes('/allDeshbord') ? 'active' : ''}`}>
                        <Link to={'allDeshbord'}>דשבורד</Link>
                      </li>
                      <li className={`nav-item ${location.pathname === '/tasks' ? 'active' : ''}`}>
                        <Link to={'tasks'}>משימות</Link>
                      </li>
                      <li className={`nav-item ${location.pathname.includes('/customers') ? 'active' : ''}`}>
                        <Link to={'customers'}>לקוחות</Link>
                      </li>
                      <TimerComponent />
                    </>
                  ) :

                    type === "עובד לידים" ? (
                      <>
                        <li className={`nav-item ${location.pathname.includes('/allDeshbord') ? 'active' : ''}`}>
                          <Link to={'allDeshbord'}>דשבורד</Link>
                        </li>
                        <li className={`nav-item ${location.pathname.includes('/leads') ? 'active' : ''}`}>
                          <Link to={'leads'}>לידים</Link>
                        </li>
                        <TimerComponent />
                      </>
                    ) :

                      type === "מנהל" ? (
                        <>
                          <li className={`nav-item ${location.pathname.includes('/allDeshbord') ? 'active' : ''}`} data-tooltip="דשבורד">
                            <Link to="allDeshbord">
                              <img src={dashboardIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/leads') ? 'active' : ''}`} data-tooltip="לידים">
                            <Link to="leads">
                              <img src={leadsIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/customers') ? 'active' : ''}`} data-tooltip="לקוחות">
                            <Link to="customers">
                              <img src={customersIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/projects') ? 'active' : ''}`} data-tooltip="פרויקטים">
                            <Link to="projects">
                              <img src={projectsIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname === '/tasks' ? 'active' : ''}`} data-tooltip="משימות">
                            <Link to="tasks">
                              <img src={tasksIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/bookkeeping') ? 'active' : ''}`} data-tooltip='הנה"ח'>
                            <Link to="bookkeeping">
                              <img src={bookkeepingIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/presence') ? 'active' : ''}`} data-tooltip="נוכחות">
                            <Link to="presence">
                              <img src={presenceIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/statistics') ? 'active' : ''}`} data-tooltip="סטטיסטיקות">
                            <Link to="statistics">
                              <img src={statisticsIcon} alt="" />
                            </Link>
                          </li>
                          <li className={`nav-item ${location.pathname.includes('/team') ? 'active' : ''}`} data-tooltip="צוות">
                            <Link to="team">
                              <img src={teamIcon} alt="" />
                            </Link>
                          </li>
                          <TimerComponent />
                        </>
                      ) :

                        <p style={{ fontSize: "17px" }}>הזן פרטי גישה כדי להתחבר למערכת</p>
                }
              </ul>
            </nav>
          </header>
        </div>
        <ProfileIcon />
        <img src={logo} alt="" id='img' />

      </div>
      {/* <Outlet /> */}
    </>


  );
};

export default Nav;
