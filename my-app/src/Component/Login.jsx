// import React, { useState } from 'react';

// const Login = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = () => {
//         // Here you can add any validation before calling onLogin
//         // For simplicity, let's assume username and password are required
//         if (username && password) {
//             onLogin({ username, password });
//         } else {
//             alert('Please enter username and password');
//         }
//     };

//     return (
//         <div className="login">
//             <h2>Login</h2>
//             <form>
//                 <label>
//                     Username:
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </label>
//                 <br />
//                 <button type="button" onClick={handleLogin}>
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };
// export default Login;
