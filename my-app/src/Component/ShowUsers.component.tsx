import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserById, getUsers } from '../api/user.api';
import { User } from '../model/user.model';



const ShowUsers = () => {
  const role = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);


  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function getData() {
      let result;
      try {
        if (role === 'admin'||role==="worker") {
          result = await getUsers();
        }
        else
          result = await getUserById("6677d684d811b6361d218707")
        setUsers(result);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [role]);
  //שליפת הtypes מהמודל
  const userTypes = ['Admin', 'Worker', 'Customer'];
  //צריך לעדכן את פונקציית setUsers כך שתקרא לפונקציית עדכון בסרוויס
  const handleUserTypeChange = (index: number, newType: string) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, userType:{id:'',description:newType} } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Password</th>
          <th>User Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.password}</td>
            <td>
              {role === "admin" && <select
                value={user.userType.description}
                onChange={(e) => handleUserTypeChange(index, e.target.value)}
              >
                {userTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>}
              {
                role !== "admin" && user.userType.description
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowUsers;
