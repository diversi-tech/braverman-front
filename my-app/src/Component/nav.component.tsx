// import React, {  useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import './nav.css'

// import { Link, Outlet, useNavigate } from 'react-router-dom';

// const Nav = () => {
//   const currentUserType = useSelector((state:{ user: { currentUser: {UserEmail:string,UserPassword:string,UserType:string } } }) => state.user.currentUser.UserType);



//   const navigate = useNavigate();
  
//     useEffect(() => {
//       if(currentUserType==="customer")
//        navigate('/not-found');
//      }, [currentUserType,navigate]);
   
 
//   return (
//     <div className="nav-container">
//     <header>
//         <nav className='nav'>
//             <ul className='nav-list'>
               
//                <li className="nav-item"><Link to={'dashboard'}>דשבורד</Link></li>
//                <li className="nav-item"><Link to={'leads'}>לידים</Link></li>
//                <li className="nav-item"><Link to={'customers'}>לקוחות</Link></li>
//                 {currentUserType==="admin"&&<>
//                 <li className="nav-item"><Link to={'staff'}>צוות</Link></li>
//                 <li className="nav-item"><Link to={'tasks'}>משימות</Link></li> 
//                 <li className="nav-item"><Link to={'bookkeeping'}>הנה"ח</Link></li></>}
//             </ul>
//         </nav>
//     </header>
//     <Outlet />
// </div>
//   );
// };

// export default Nav;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './nav.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const Nav = () => {
  const currentUserType = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUserType === "customer")
      navigate('/not-found');
  }, [currentUserType, navigate]);
  console.log(location.pathname);
  

  return (
    <>

    <div className="nav-container">
      <header>
        <nav className='nav'>
          <ul className='nav-list'>
            <li className={`nav-item ${location.pathname.includes('/dashboard' )? 'active' : ''}`}><Link to={'dashboard'}>דשבורד</Link></li>
            <li className={`nav-item ${location.pathname .includes( '/leads' )? 'active' : ''}`}><Link to={'leads'}>לידים</Link></li>
            <li className={`nav-item ${location.pathname.includes('/customers' )? 'active' : ''}`}><Link to={'customers'}>לקוחות</Link></li>
            {currentUserType === "admin" && <>
              <li className={`nav-item ${location.pathname .includes('/staff') ? 'active' : ''}`}><Link to={'staff'}>צוות</Link></li>
              <li className={`nav-item ${location.pathname.includes( '/tasks' )? 'active' : ''}`}><Link to={'tasks'}>משימות</Link></li>
              <li className={`nav-item ${location.pathname .includes( '/bookkeeping' )? 'active' : ''}`}><Link to={'bookkeeping'}>הנה"ח</Link></li>
            </>}
          </ul>
        </nav>
      </header>
      </div>

      <Outlet />
    </>

   
  );
};

export default Nav;
