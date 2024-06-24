import React, { useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { setUser } from '../Redux/userAction';
import { LoginUser } from '../api/user.api';
import { log } from 'console';
import { Outlet, useNavigate } from 'react-router-dom';

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserType, setUserType] = useState('');
  const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser);
  const isAuthenticated = useSelector((state: { user: { isAuthenticated: boolean } }) => state.user.isAuthenticated);

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const handleLogin = () => {
    if (currentUser.UserType === "customer")
      navigate("/customers");
    else 
      navigate("/home");
    
    sessionStorage.setItem("isAuthenticated", "true");
    // if (UserEmail && UserPassword) {
    //   console.log('Logging in with', { UserEmail, UserPassword });
    //   LoginUser(UserEmail,UserPassword).
    //   then(x=>{
    //     if(x.status==200){
    //     console.log(UserType);
    //     alert("success")
    //     dispatch(setUser({ UserEmail,UserPassword, UserType }));
    //     debugger

    //     }
    //     else
    //        alert("מייל וסיסמא לא קיימים ")

    //   }).catch(x=>{
    //     alert("error")
    //     console.log("erorr");   
    //     console.log(x.response);
    //   })

    // } else {
    //   alert('נא להכניס מייל וסיסמא');
    // }
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

// const navigate = useNavigate();

//     const handleClick = () => {
//         navigate("/home")
//       };
//     return(
//         <>
//         <p>login</p>
//         <button onClick={handleClick}>אישור</button>
//         <Outlet/>
//         </>
//     )

export default Login;
