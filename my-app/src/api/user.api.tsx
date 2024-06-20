import axios from 'axios';
import { User} from "../model/user.model";

export const addUser = (user:User) => {
    console.log(user);
    // return axios.put(`http://localhost:3000/meeting/`,user);
}

export const LoginUser =(userEmail:string,userPassword:string)=>{
    debugger
    console.log(userEmail,userPassword);
return axios.post(`https://localhost:7119/api/User/Login?UserEmail=${encodeURIComponent(userEmail)}&UserPassword=${encodeURIComponent(userPassword)}`);
}

