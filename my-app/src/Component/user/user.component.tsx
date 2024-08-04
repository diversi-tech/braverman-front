import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css'; 
import { addUserApi, GetAllProjectPerUser, getUsers } from '../../api/user.api';
import { UserType } from '../../model/userType.model';
import { User } from '../../model/user.model';
import { BiUserCircle } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setAllUsers } from '../../Redux/User/userAction';
import { FaUserEdit } from "react-icons/fa";
import { GetById } from '../../api/project.api';
import { useNavigate } from 'react-router-dom';
import { RiUserAddLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import ReactDOM from 'react-dom';
import AddUserForm from './addUser.component';
import Swal from 'sweetalert2';
import store from '../../Redux/Store';
import { ProviderWrapper } from './UpdateUser.component';


interface UserWithProjectsNames extends User {
  projectsNames: string[];
}

const UserTable = () => {
    const [userTypes, setTypes] = useState<UserType[]>([]);
    // const [users, setUsers] = useState<UserWithProjectsNames[]>([]);
    const [users,setUsers]=useState<User[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;
    const userState = useSelector((state: { user: { allUser: User[] } }) => state.user.allUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                debugger
                let data: User[] = [];
                if (userState.length) {
                    data = userState;
                } else {
                    const resAllUser = await getUsers();
                    data = resAllUser;
                     dispatch(setAllUsers(data));
                }
                debugger
                setUsers(data);
                // const updatedUsers = await Promise.all(data.map(async (user: User) => {
                //     const projectsNames = await fetchProjectsNames(user.projectsId);
                //     return { ...user, projectsNames };
                // }));
   
                // setUsers(updatedUsers);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };
        fetchData();
    }, [dispatch, userState]);

    const fetchProjectsNames = async (projectsIds: string[]) => {
        debugger
        const projectsNames = await Promise.all(projectsIds.map(async (projectId: string) => {
            try {
                const response = await GetById(projectId);
                return response.businessName;
            } catch (error) {
                console.error(`Error fetching project with ID ${projectId}:`, error);
                return '';
            }
        }));
        return projectsNames;
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };
    let nav = useNavigate();
    const updateUser = async (userId: string) => {
        debugger
        Swal.fire({
            title: 'עדכון משתמש',
            html: '<div id="update-user"></div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {
                const container = document.getElementById('update-user');
                if (container) {
                    ReactDOM.render(                        
                        <ProviderWrapper userId={userId} />,
                        container
                    );
                   
                }
                
            },
        })
    }


const addUser = () => {
  Swal.fire({
    title: 'הוספת משתמש חדש',
    html: '<div id="add-lead-container"></div>',
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: false,
    didOpen: () => {
      const container = document.getElementById('add-lead-container');
      if (container) {
        ReactDOM.render(
            <Provider store={store}>
          <AddUserForm
            // open={true}
            users={users}
            setUser={setUsers}
            handleUserAdded={async (newUser: User) => {
                debugger
              try {
                // debugger
                 const response = await addUserApi(newUser);
                 const addedUser = response.data;
                 setUsers(prevUsers => [...prevUsers, newUser]);
                // const updatedProjectsNames = await fetchProjectsNames(newUser.projectsId);
                // updateUserProjects(addedUser.id, updatedProjectsNames);
                // dispatch(addUser(addedUser));
                Swal.fire('Success', 'המשתמש נוסף בהצלחה', 'success');
              } catch (error) {
                Swal.fire('Error', 'שגיאה בהוספת המשתמש', 'error');
              }
            }}
          />,
        </Provider>,
          container
        );
      }
    },
  });
};
const updateUserProjects = (userId: string, projectsNames: string[]) => {
    setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => {
            if (user.id === userId) {
                return { ...user, projectsNames };
            }
            return user;
        });
        return updatedUsers;
    });
};

    return (
        <div className="user-table-container">
            <div className="table-title">
                תצוגת משתמשי מערכת
            </div>
            <table>
                <thead>
                    <tr className="table-header-row">
                        <th style={{textAlign:'right',width:'25%'}}>פרויקטים</th>
                        <th style={{textAlign:'right' ,width:'25%'}}>אימייל</th>
                        <th style={{textAlign:'right',width:'25%'}} >ניהול תפקיד</th>
                        <th style={{textAlign:'right',width:'25%'}}>שם משתמש</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
<td > {Object.values(user.projectsId).join(', ')} <CiLock /></td>
{/* {user.projectsNames.join(', ')} <CiLock /> */}
                            <td>{user.email}</td>
                            <td>{user.userType?.description}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td onClick={() => updateUser(user.id)}><LiaUserEditSolid className='user-icon' /></td>
                           
                        </tr>
                    ))}

                     <td colSpan={6} onClick={() => addUser()} style={{marginBlockStart:'10px'}}><RiUserAddLine className='user-icon'/>
                     </td>
                </tbody>
            </table>
            <div className="pagination">
              <div className='pagination2'>
              <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={indexOfLastUser >= users.length}
                >
                 <SlArrowDown className="icon" />
                </button>
                <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
               <SlArrowUp className="icon" />
                </button>
               
               
            </div>
            </div>
        </div>
    );
};

export default UserTable;
