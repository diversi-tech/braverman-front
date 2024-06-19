// Nav.js
import React from 'react';
import { useSelector } from 'react-redux';
import AdminNav from './adminNav.component';
import WorkerNav from './workerNav.component';
import CustomerNav from './customerNav.component';

const Nav = () => {
  const role = useSelector((state:{ user: { role: string } }) => state.user.role);

  let navigationComponent = null;

  switch (role) {
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
      navigationComponent = null;
  }

  return (
    <div>
      {navigationComponent}
    </div>
  );
};

export default Nav;
