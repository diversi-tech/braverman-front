import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/User/userAction';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../api/user.api';

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (UserEmail && UserPassword) {
      console.log('Logging in with', { UserEmail, UserPassword });
      const response = await LoginUser(UserEmail, UserPassword);
      if (response.status === 200) {
        const x = response;
        console.log(x);
        console.log(x.data);
        alert("success");
        dispatch(setUser(UserEmail, UserPassword, x.data.id, x.data.userType.id, x.data.userType.description, x.data.firstName, x.data.lastName));
        sessionStorage.setItem("userId", x.data.id);
        navigate("/home");
      } else {
        alert("מייל וסיסמא לא קיימים");
      }
    } else {
      alert('נא להכניס מייל וסיסמא');
    }
  };

  const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';
  const onSuccess = (googleUser:  any) => {
    console.log('Login Success:', googleUser);
    // You can handle the login success here, e.g., dispatching user data to Redux
  };

  const onFailure = () => {
    console.log('Login Failed');
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

      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <h2>התחברות באמצעות Google</h2>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            // buttonText="התחברות עם Google"
            // Add additional props as needed
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
