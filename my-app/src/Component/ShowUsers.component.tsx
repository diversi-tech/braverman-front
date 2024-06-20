import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserById, getUsers } from '../api/user.api';

interface User {
  firstName: string;
  lastName: string;
  password: string;
  userType: string;
}

const ShowUsers = () => {
  const role = useSelector((state: { user: { role: string } }) => state.user.role);
  //כאן צריכה להיות קריאה לפונקצית שליפת הנתונים מהסרוויס
  console.log(role);
  
  const [users, setUsers] = useState<User[]>(() => {
    // תנאי מסוים לאתחול המשתמשים
    if (role!=="customer") {
      return [
        { firstName: 'John', lastName: 'Doe', password: 'password123', userType: 'Admin' },
        { firstName: 'Jane', lastName: 'Smith', password: 'password456', userType: 'Worker' },
        { firstName: 'Alice', lastName: 'Johnson', password: 'password789', userType: 'Customer' }
      ];
    } else {
      return [
        { firstName: 'David', lastName: 'Cohen', password: '1324', userType: 'customer' }
      ];
    }
  });
  // const [users, setUsers] = useState<User[]>([])

  // useEffect(() => {
  //   async function getData() {
  //     let result;
  //     try {
  //       if (role == 'admin'){
  //          result = await getUsers();
  //          }
  //       else
  //         result=await getUserById(1)
  //       setUsers(result);

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  // })
  //שליפת הtypes מהמודל
  const userTypes = ['Admin', 'Worker', 'Customer'];
  //צריך לעדכן את פונקציית setUsers כך שתקרא לפונקציית עדכון בסרוויס
  const handleUserTypeChange = (index: number, newType: string) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, userType: newType } : user
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
              {role==="admin"&&<select
                value={user.userType}
                onChange={(e) => handleUserTypeChange(index, e.target.value)}
              >
                {userTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>}
        {
          role!=="admin"&&user.userType
        }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowUsers;
