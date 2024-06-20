// Nav.js
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from './adminNav.component';
import WorkerNav from './workerNav.component';
import CustomerNav from './customerNav.component';

const Nav = () => {
  const currentUserType = useSelector((state:{ user: { currentUser: {UserEmail:string,UserPassword:string,UserType:string } } }) => state.user.currentUser.UserType);
  let navigationComponent: ReactElement | null = null;


  const isAuthenticated = useSelector((state:{ user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);
  const currentUser = useSelector((state:{ user: { currentUser: {UserEmail:string,UserPassword:string,UserType:string } } }) => state.user.currentUser);

  

  switch (currentUserType) {
    case 'admin':
      navigationComponent = <AdminNav />;
      break;
    case 'worker':
      navigationComponent = <WorkerNav />;
      break;
    case 'customer':
      navigationComponent = <CustomerNav />;
      break;
    default:
      navigationComponent = <WorkerNav />;
      // navigationComponent = null;

      
  }

  return (
    <div>
      {navigationComponent}
    </div>
  );
};

export default Nav;
