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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import withReactContent from 'sweetalert2-react-content';


interface GoogleCredentials {
  email: string;
}

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  // console.log(currentUser);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const handleLogin = async () => {
    
    if (UserEmail && UserPassword) {
      console.log('Logging in with', { UserEmail, UserPassword });
      const response = await LoginUser(UserEmail, UserPassword);
      if (response.status === 200) {
    
        const x = response;
        console.log(x);
        console.log(x.data);
        MySwal.fire({
          title: 'success',
          text: 'התחברת בהצלחה',
          icon: 'success',
          confirmButtonText: 'אישור',
          customClass: {
            confirmButton: 'my-confirm-button'
          }
        });  
              dispatch(setCurrentUser(x.data))
        // dispatch(setUser(UserEmail, UserPassword, x.data.id, x.data.userType.id, x.data.userType.description, x.data.firstName, x.data.lastName));
        sessionStorage.setItem("userId", x.data.id);
        sessionStorage.setItem("userType", x.data.userType.description);
        sessionStorage.setItem("firstName", x.data.firstName);
        sessionStorage.setItem("lastName", x.data.lastName);
        sessionStorage.setItem("email", x.data.email);
        if (x.data.userType.description === "לקוח")
          navigate("/quickActions");
        else if (x.data.userType.description === "מנהל")
          navigate("/leads");
        else
          navigate("/leads");
      } else {
        MySwal.fire({
          title: 'error',
          text: 'מייל וסיסמא לא קיימים',
          icon: 'error',
          confirmButtonText: 'אישור',
          customClass: {
            confirmButton: 'my-confirm-button'
          }
        });      }
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
        MySwal.fire({
          title: 'success',
          text: 'התחברת בהצלחה',
          icon: 'success',
          confirmButtonText: 'אישור',
          customClass: {
            confirmButton: 'my-confirm-button'
          }
        });     
        sessionStorage.setItem("userId", x.data.id);
        sessionStorage.setItem("userType", x.data.userType.description);
        sessionStorage.setItem("firstName", x.data.firstName);
        sessionStorage.setItem("lastName", x.data.lastName);
        sessionStorage.setItem("email", x.data.email);


        if (x.data.userType.description === "לקוח")
          navigate("/quickActions");
        else if (x.data.userType.description === "מנהל"){
          navigate("/leads");}
        // else
        //   navigate("/leads");

      } else {
        MySwal.fire({
          title: 'error',
          text: 'מייל וסיסמא לא קיימים',
          icon: 'error',
          confirmButtonText: 'אישור',
          customClass: {
            confirmButton: 'my-confirm-button'
          }
        });       }
    })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: 'error',
          text: 'שגיאה בהתחברות ',
          icon: 'error',
          confirmButtonText: 'אישור',
          customClass: {
            confirmButton: 'my-confirm-button'
          }
        });       });

  };

  const onFailure = () => {
    console.log('Login Failed');
  };

  return (
     <div className='login' >
    <p id='p' style={{marginTop: '110px'}}>התחברות למערכת</p>
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
            type={!showPassword ? 'password' : ''}
            id="password"
            placeholder=':סיסמא'
            className='textBox'
            value={UserPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
           <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
        </div>
        <div id='btn'>
        <button type="submit" className='textBox' id="submit">
          <div id='en'>
            <span className='enter'>  <svg width="20" height="20" fontSize={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='ok'>
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
