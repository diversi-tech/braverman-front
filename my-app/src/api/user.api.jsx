import axios from 'axios';

export const addUser = (user) => {
    return axios.put(`http://localhost:3000/meeting/`,user);
}


//login
export const LoginUser =(userEmail,userPassword)=>{
    debugger
    console.log(userEmail,userPassword);
return axios.post(`https://localhost:7119/api/User/Login?UserEmail=${encodeURIComponent(userEmail)}&UserPassword=${encodeURIComponent(userPassword)}`);
}


