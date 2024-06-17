import React, { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  password: string;
  userType: string;
}

const ShowUsers: React.FC = () => {
    //כאן צריכה להיות קריאה לפונקצית שליפת הנתונים מהסרוויס
  const [users, setUsers] = useState<User[]>([
    { firstName: 'John', lastName: 'Doe', password: 'password123', userType: 'Admin' },
    { firstName: 'Jane', lastName: 'Smith', password: 'password456', userType: 'Worker' },
    { firstName: 'Alice', lastName: 'Johnson', password: 'password789', userType: 'Customer' }
  ]);
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
              <select
                value={user.userType}
                onChange={(e) => handleUserTypeChange(index, e.target.value)}
              >
                {userTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowUsers;
