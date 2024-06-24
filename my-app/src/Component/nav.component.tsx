import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Link, Outlet, useNavigate } from 'react-router-dom';

const Nav = () => {
  const currentUserType = useSelector((state:{ user: { currentUser: {UserEmail:string,UserPassword:string,UserType:string } } }) => state.user.currentUser.UserType);



  const navigate = useNavigate();
  
    useEffect(() => {
      if(currentUserType==="customer")
       navigate('/not-found');
     }, [currentUserType,navigate]);
   
 
  return (
    <div className={'nav'}>
    <header>
        <nav>
            <ul>
               
               <li className="nav"><Link to={'dashboard'}>דשבורד</Link></li>
               <li className="nav"><Link to={'leads'}>לידים</Link></li>
                <li className="nav"><Link to={'customers'}>לקוחות</Link></li>
                {currentUserType==="admin"&&<>
                <li className="nav"><Link to={'staff'}>צוות</Link></li>
                <li className="nav"><Link to={'tasks'}>משימות</Link></li> 
                <li className="nav"><Link to={'bookkeeping'}>הנה"ח</Link></li></>}
            </ul>
        </nav>
    </header>
    <Outlet />
</div>
  );
};

export default Nav;
