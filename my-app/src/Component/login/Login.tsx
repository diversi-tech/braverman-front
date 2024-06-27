import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/userAction';
import { LoginUser } from '../../api/user.api';
import { Outlet, useNavigate } from 'react-router-dom';
import ShowUsers from '../adminScreen/showUsers/ShowUsers.component';

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserType, setUserType] = useState('');
  
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const handleLogin = () => {


    if (UserEmail && UserPassword) {
      console.log('Logging in with', { UserEmail, UserPassword });
      LoginUser(UserEmail, UserPassword).
        then(x => {
          if (x.status === 200) {
            console.log(UserType);
            alert("success")
            dispatch(setUser({ UserEmail, UserPassword, UserType }));
            sessionStorage.setItem("isAuthenticated", "true");

            navigate("/home");


          }
          else
            alert("מייל וסיסמא לא קיימים ")

        }).catch(x => {
          alert("error")
          console.log("erorr");
          console.log(x.response);
        })

    } else {
      alert('נא להכניס מייל וסיסמא');
    }
  };

  return (
    <div className="login">
      <h2>להתחברות</h2>
      <form>
        <label>
          אימייל:
          <input
            type="text"
            value={UserEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          סיסמא:
          <input
            type="password"
            value={UserPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          התחברות
        </button>
      </form>

      <Outlet />

    </div>
  );
};



export default Login;
