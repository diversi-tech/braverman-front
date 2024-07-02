import React, { useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { setUser } from '../../Redux/User/userAction';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LoginUser, LoginWithGoogle } from '../../api/user.api';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import './Login.css';

interface GoogleCredentials {
  email: string;
}

const Login = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [UserPassword, setUserPassword] = useState('');


  const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
  console.log(currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    debugger
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
    const credentials = jwtDecode<GoogleCredentials>(googleUser.credential);
    console.log(credentials);
    LoginWithGoogle(credentials.email).then((response) => {
      if (response.status === 200) {
        const x = response;
        console.log(x);
        console.log(x.data);
        Swal.fire('Success', 'התחברת בהצלחה', 'success');
        dispatch(setUser(x.data.userEmail, x.data.userPassword, x.data.id, x.data.userType.id, x.data.userType.description, x.data.firstName, x.data.lastName));
        sessionStorage.setItem("userId", x.data.id);
        navigate("/home");
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
    <div id='login'>
      <div></div>
      <svg width="331" height="30" viewBox="0 0 331 30" fill="none" xmlns="http://www.w3.org/2000/svg" id='p'>
        <path d="M4.51578 29.24C2.95578 29.24 1.35578 29.04 0.235781 28.84L0.835781 24.28C1.75578 24.44 2.87578 24.56 3.87578 24.56C5.47578 24.56 6.39578 23.88 6.39578 21.52V9.8H1.19578V5.04H16.1558C24.9158 5.04 27.5958 7.6 27.5958 15.64V29H22.2758V15.72C22.2758 10.68 21.1558 9.8 16.6758 9.8H11.7558V22.12C11.7558 27.36 9.15578 29.24 4.51578 29.24ZM31.8048 29V24.28H35.6848C40.3648 24.28 43.5648 21.68 43.5648 16.92C43.5648 12.28 40.3648 9.8 35.6848 9.8H31.8048V5.04H35.6848C43.5648 5.04 48.9648 8.84 48.9648 16.96C48.9648 24.88 43.5648 29 35.6848 29H31.8048ZM63.2636 29V16.24C63.2636 11.08 61.3436 9.8 56.7036 9.8H50.8636V5.04H57.2236C65.7436 5.04 68.6236 7.92 68.6236 16.08V29H63.2636ZM72.8205 29V24.28H79.3005L71.9805 5.04H77.7405L84.4605 23.56C88.4605 22.16 89.9405 18.64 89.9405 12.48V5.04H95.1805V12.24C95.1805 23.04 90.3005 29 79.5005 29H72.8205ZM115.225 29.28C113.345 29.28 111.785 29.08 110.465 28.76L111.465 24.24C112.345 24.48 113.745 24.68 114.785 24.68C118.745 24.68 121.945 21.64 121.945 17C121.945 12.64 119.105 9.36 115.465 9.36C112.105 9.36 109.665 11.2 108.345 15.8L104.505 29H98.9848L103.345 14.36L98.3848 5.04H104.065L106.665 10.48C108.745 6.8 112.105 4.8 116.185 4.8C122.185 4.8 127.305 9.88 127.305 17C127.305 24.04 122.265 29.28 115.225 29.28ZM135.174 29L141.214 9.8H129.534V0.88H134.734V5.04H146.894V9.16L140.614 29H135.174ZM163.969 29.24C162.409 29.24 160.809 29.04 159.689 28.84L160.289 24.28C161.209 24.44 162.329 24.56 163.329 24.56C164.929 24.56 165.849 23.88 165.849 21.52V9.8H160.649V5.04H175.609C184.369 5.04 187.049 7.6 187.049 15.64V29H181.729V15.72C181.729 10.68 180.609 9.8 176.129 9.8H171.209V22.12C171.209 27.36 168.609 29.24 163.969 29.24ZM193.658 29V9.8H190.778V5.04H199.018V29H193.658ZM216.154 29V16.24C216.154 11.08 214.234 9.8 209.594 9.8H203.754V5.04H210.114C218.634 5.04 221.514 7.92 221.514 16.08V29H216.154ZM225.711 29V24.28H238.111V15.8C238.111 10.8 236.231 9.8 232.271 9.8H225.711V5.04H232.951C240.591 5.04 243.431 7.72 243.431 15.72V24.28H246.871V29H225.711ZM251.275 29V9.8H248.395V5.04H262.595C269.595 5.04 273.275 7.68 273.275 15.12V29H267.955V15.16C267.955 11.08 266.195 9.8 262.435 9.8H256.635V29H251.275ZM281.469 29.24C279.909 29.24 278.309 29.04 277.189 28.84L277.789 24.28C278.709 24.44 279.829 24.56 280.829 24.56C282.429 24.56 283.349 23.88 283.349 21.52V9.8H278.149V5.04H293.109C301.869 5.04 304.549 7.6 304.549 15.64V29H299.229V15.72C299.229 10.68 298.109 9.8 293.629 9.8H288.709V22.12C288.709 27.36 286.109 29.24 281.469 29.24ZM325.598 29V16.44C325.598 11.08 323.678 9.8 319.158 9.8H309.398V5.04H319.678C327.598 5.04 330.958 8 330.958 16.28V29H325.598ZM309.838 29V17H315.198V29H309.838Z" fill="#002046" />
      </svg>
      <form onSubmit={handleLogin}>
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


      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <h2>התחברות באמצעות Google</h2>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            // buttonText="התחברות עם Google"
          />
        </div>
      </GoogleOAuthProvider>
        </div>
        <div id='btn'>
          <button type="submit" className='textBox' id="submit"><div id='en'>
            <span className='enter'>  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='ok'>
              <path d="M0.00598005 4.00597L1.90735e-06 20L16 19.998L16.002 18L3.41396 18L20 1.414L18.586 -1.78373e-06L1.99997 16.586L1.99996 3.99999L0.00598005 4.00597Z" fill="#002046" />
            </svg> כניסה  </span></div>
          </button>
        </div>
        {/* כפתור התחברות מהירה */}
        {/* <div> <button type="button" id='linkq'    onClick={linkWhithGogle}>
          <svg width="217" height="20" viewBox="0 0 217 20" id='q' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2752 19V9.19C13.2752 4.42 11.6852 3.34 7.90523 3.34H0.705234V1.15H8.11523C13.4252 1.15 15.6152 3.46 15.6152 9.13V19H13.2752ZM1.06523 19V10H3.40523V19H1.06523ZM28.4065 19V9.19C28.4065 4.54 26.9965 3.34 23.0065 3.34H18.1465V1.15H23.2165C28.7365 1.15 30.7465 3.55 30.7465 9.13V19H28.4065ZM35.6231 10.75V3.34H33.4031V1.15H37.9631V10.75H35.6231ZM55.4334 19V9.19C55.4334 4.42 53.8434 3.34 50.0634 3.34H42.8634V1.15H50.2734C55.5834 1.15 57.7734 3.46 57.7734 9.13V19H55.4334ZM43.2234 19V10H45.5634V19H43.2234ZM72.1259 19.15C70.9259 19.15 69.8159 19.06 68.9159 18.91L69.2759 16.69C70.0559 16.87 71.4059 16.99 72.3059 16.99C75.9659 16.99 78.7559 14.05 78.7559 10.03C78.7559 6.16 76.3259 3.07 73.1459 3.07C70.1759 3.07 68.0759 4.87 66.9059 8.65L63.6959 19H61.2659L64.7159 8.32L60.9059 1.15H63.3959L65.7659 6.13C67.1759 2.89 69.8159 0.97 73.2659 0.97C77.6459 0.97 81.0959 5.02 81.0959 10.03C81.0959 15.07 77.3459 19.15 72.1259 19.15ZM94.7402 19.15C93.6002 19.15 92.5202 19.03 91.7402 18.91L92.1302 16.9C92.8802 17.02 93.8402 17.08 94.6202 17.08C95.9102 17.08 96.7202 16.6 96.7202 14.41V3.34H92.7302V1.15H103.68C109.5 1.15 111.3 3.07 111.3 8.53V19H108.96V8.59C108.96 4.06 107.76 3.34 103.68 3.34H99.0602V14.44C99.0602 17.89 97.3802 19.15 94.7402 19.15ZM117.071 19V3.34H114.851V1.15H119.411V19H117.071ZM134.051 19V9.19C134.051 4.54 132.641 3.34 128.651 3.34H123.791V1.15H128.861C134.381 1.15 136.391 3.55 136.391 9.13V19H134.051ZM140.109 19V16.81H150.399V9.19C150.399 4.42 148.809 3.34 145.029 3.34H140.109V1.15H145.239C150.549 1.15 152.739 3.46 152.739 9.13V16.81H155.289V19H140.109ZM158.966 19V3.34H156.746V1.15H166.886C171.296 1.15 173.996 2.77 173.996 7.99V19H171.656V8.05C171.656 4.3 170.066 3.34 166.676 3.34H161.306V19H158.966ZM180.727 19.15C179.587 19.15 178.507 19.03 177.727 18.91L178.117 16.9C178.867 17.02 179.827 17.08 180.607 17.08C181.897 17.08 182.707 16.6 182.707 14.41V3.34H178.717V1.15H189.667C195.487 1.15 197.287 3.07 197.287 8.53V19H194.947V8.59C194.947 4.06 193.747 3.34 189.667 3.34H185.047V14.44C185.047 17.89 183.367 19.15 180.727 19.15ZM214.428 19V9.19C214.428 4.42 212.838 3.34 209.058 3.34H201.858V1.15H209.268C214.578 1.15 216.768 3.46 216.768 9.13V19H214.428ZM202.218 19V10H204.558V19H202.218Z" fill="#002046" />
          </svg>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="28" height="28" fill="url(#pattern0_37_2631)" />
            <defs>
              <pattern id="pattern0_37_2631" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_37_2631" transform="scale(0.0344828)" />
              </pattern>
            </defs>
          </svg>
        </button></div> */}
      </form>
    </div>
  );
};

export default Login;
