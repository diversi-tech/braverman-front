import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserById, getUsers } from '../../../api/user.api';
import { User } from '../../../model/user.model';
import { getTypes } from '../../../api/userType.api';
import { UserType } from '../../../model/userType.model';



const ShowUsers =  () => {
  const role = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);
  const userId=useSelector((state: { user: { currentUser: { UserId:string,UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserId);

  const [users, setUsers] = useState<User[]>([])
  const [userTypes, setTypes]=useState<UserType[]>([])
  useEffect(() => {
    async function getData() {
      let usersResult;
      let userTypesResult;
      try {
        if (role === 'admin'||role==="worker") {
          usersResult = await getUsers();
        }
        else
          usersResult = await getUserById(userId)
        setUsers(usersResult);
        userTypesResult=await getTypes();
        setTypes(userTypesResult);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [role]);
  
  const userTypesDescription=userTypes.map(d=>d.description);
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
                value={user.typeUser.description}
                onChange={(e) => handleUserTypeChange(index, e.target.value)}
              >
                {userTypesDescription.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>}
              {
                role !== "admin" && user.typeUser.description
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowUsers;
