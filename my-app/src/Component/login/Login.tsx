import React, { useState } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { setUser } from '../../Redux/User/userAction';
import { LoginUser } from '../../api/user.api';
import { log } from 'console';
import { useNavigate } from 'react-router-dom';
import { User } from '../../model/user.model';

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');


  const currentUser = useSelector((state:{ user: { currentUser:User } }) => state.user.currentUser);
//   const currentUser = useSelector((state: { userReducer: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.userReducer.currentUser);
   console.log(currentUser);
  
  const dispatch = useDispatch();
  const nav = useNavigate()
  const navigate = useNavigate();

  const handleLogin  = async () => {
    if (UserEmail && UserPassword) {
      console.log('Logging in with', { UserEmail, UserPassword });
      const response = await LoginUser(UserEmail, UserPassword);
      if (response.status === 200) {
        const x = response;
        console.log(x); 
          console.log(x.data);
          
        alert("success")
        dispatch(setUser(x.data));
        sessionStorage.setItem("userId", x.data.id);
        
            navigate("/updateUser");
        
        }
        else
           alert("מייל וסיסמא לא קיימים ")     
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
    </div>
  );
};

export default Login;
