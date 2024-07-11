import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css'; 
import { getUsers } from '../../api/user.api';
import { UserType } from '../../model/userType.model';
import { User } from '../../model/user.model';
import { BiUserCircle } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../Redux/User/userAction';


const UserTable = () => {
    const [userTypes, setTypes]=useState<UserType[]>([])
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
     const userState = useSelector((state: { user: { allUser: { [key: string]: User[] } } }) => state.user);
     let dispatch = useDispatch();

     useEffect(() => {
      const fetchData = async () => {
        try {
          let data;
          console.log(userState.allUser);
          if (userState.allUser.length) {
            data = userState.allUser;
          } else {
            const resAllLeads = await getUsers();
            data = resAllLeads
            dispatch(setAllUsers(data));
          }
          if(Array.isArray(data))
          setUsers(data);
        } catch (error) {
          console.error('Error fetching leads:', error);
        }
      };
     fetchData();
    }, [dispatch]);
    

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

 const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="user-table-container">
      <div className="table-title">
        תצוגת משתמשי מערכת
      </div>
      <table>
        <thead>
          <tr className="table-header-row">
          <th>סיסמה</th>
          <th>פרויקטים</th>

            <th>אימייל</th>
            <th>ניהול תפקיד</th>
            <th>שם משתמש</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>   
             <td>{user.password}</td>
             <td>   {user.projectsId.join(', ')}  <CiLock /></td>
            
              <td>{user.email}</td>
              <td>{user.userType ? user.userType.description : '-'}</td>
              <td>  {user.firstName} {user.lastName} </td>
              <td><BiUserCircle  className='user-icon'/></td>
            </tr>
          ))}
           </tbody>
           </table>  
          <div className="pagination">
        <button 
          className="pagination-button" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        > 
         <SlArrowDown className="icon"/>
        </button>
        <button 
          className="pagination-button" 
          onClick={handleNextPage} 
          disabled={indexOfLastUser >= users.length}
        >
         <SlArrowUp className="icon"/>
        </button>
      </div>
       
    </div>
  );
};

export default UserTable;
