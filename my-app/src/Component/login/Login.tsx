import React, { useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
// import { setUser } from '../../Redux/User/userAction';
import { log } from 'console';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';
import { LoginUser, LoginWithGoogle } from '../../api/user.api';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { setCurrentUser } from '../../Redux/User/userAction';


interface GoogleCredentials {
  email: string;
}

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  // const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  // console.log(currentUser);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const navigate = useNavigate();
  const handleLogin = async () => {
    debugger
    if (UserEmail && UserPassword) {
      console.log('Logging in with', { UserEmail, UserPassword });
      const response = await LoginUser(UserEmail, UserPassword);
      if (response.status === 200) {
        debugger
        const x = response;
        console.log(x);
        console.log(x.data);
        alert("success");
        dispatch(setCurrentUser(x.data))
        // dispatch(setUser(UserEmail, UserPassword, x.data.id, x.data.userType.id, x.data.userType.description, x.data.firstName, x.data.lastName));
        sessionStorage.setItem("userId", x.data.id);
        sessionStorage.setItem("userType", x.data.userType.description);
        sessionStorage.setItem("firstName", x.data.firstName);
        sessionStorage.setItem("lastName", x.data.lastName);
        sessionStorage.setItem("email", x.data.email);
        if (x.data.userType.description === "customer")
          navigate("/projectStatus");
        else if (x.data.userType.description === "admin"){
          debugger
          navigate("/leads");}
        else
          navigate("/leads");
      } else {
        alert("מייל וסיסמא לא קיימים");
      }
    } else {
      alert('נא להכניס מייל וסיסמא');
    }
  };

  const clientId = '412263291390-jkirnvmjnk6qbera6qcdq3k6cotqk9o7.apps.googleusercontent.com';
  const onSuccess = (googleUser: any) => {
    console.log('Login Success:', googleUser);
    const credentials = jwtDecode<GoogleCredentials>(googleUser.credential);
    console.log(credentials);
    LoginWithGoogle(credentials.email).then((response) => {
      if (response.status === 200) {
        const x = response;
        console.log(x);
        console.log(x.data);
        Swal.fire('Success', 'התחברת בהצלחה', 'success');
        // dispatch(setUser(x.data.userEmail, x.data.userPassword, x.data.id, x.data.userType.id, x.data.userType.description, x.data.firstName, x.data.lastName));
        sessionStorage.setItem("userId", x.data.id);
        sessionStorage.setItem("userType", x.data.userType.description);
        sessionStorage.setItem("firstName", x.data.firstName);
        sessionStorage.setItem("lastName", x.data.lastName);
        sessionStorage.setItem("email", x.data.email);

        if (x.data.userType.description === "לקוח")
          navigate("/projectStatus");
        else if (x.data.userType.description === "מנהל"){
          debugger
          navigate("/leads");}
        else
          navigate("/leads");

      } else {
        Swal.showValidationMessage('מייל וסיסמא לא קיימים');
      }
    })
      .catch((error) => {
        console.log(error);
        Swal.fire("error", 'שגיאה בהתחברות', 'error');
      });

  };

  const onFailure = () => {
    console.log('Login Failed');
  };

  return (
     <div className='login' >
    <p id='p'>התחברות למערכת</p>
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <div id='allin'>
      <input
        id="username"
        placeholder=":הכנס אימייל"
        className='textBox'
        value={UserEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        required
      />
        <div>
          <input
            type='password'
            id="password"
            placeholder=':סיסמא'
            className='textBox'
            value={UserPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <div id='btn'>
        <button type="submit" className='textBox' id="submit">
          <div id='en'>
            <span className='enter'>  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='ok'>
            <path d="M0.00598005 4.00597L1.90735e-06 20L16 19.998L16.002 18L3.41396 18L20 1.414L18.586 -1.78373e-06L1.99997 16.586L1.99996 3.99999L0.00598005 4.00597Z" fill="#002046" /> 
             </svg> כניסה  </span>
            
          </div>
        </button>
      </div>
      </div>
         {/* כפתור התחברות מהירה */}
      <div >
        <button type="button" id='linkq' >
        <GoogleOAuthProvider clientId={clientId}>
        <div className="custom-google-login-button">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
          // buttonText="התחברות עם Google"
          />
          </div>
      </GoogleOAuthProvider>
        </button>
      </div>
      </form>
      
    </div> 
      );
      }
      export default Login;