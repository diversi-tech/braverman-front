import axios from 'axios';
import { User} from "../model/user.model";

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
 const apiUrl = process.env.REACT_APP_BRAVERMAN;


export const addUserApi = (user:User) => {
    console.log(user);
    return axios.post(`${apiUrl}User/PostUser`,user);
}

export const LoginUser = async(userEmail:string,userPassword:string)=>{
    
    console.log(userEmail,userPassword);
    return await axios.post(`${apiUrl}User/Login?UserEmail=${encodeURIComponent(userEmail)}&UserPassword=${encodeURIComponent(userPassword)}`);
// return axios.post(`${apiUrl}User/Login?UserEmail=${encodeURIComponent(userEmail)}&UserPassword=${encodeURIComponent(userPassword)}`);
}

export const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}User/GetAll`);
      return [...response.data]; 
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; 
    }
  };

  export const getUserById = async (userId: string) => {
    try {
  
      const response = await axios.get(`https://localhost:7119/api/User/GetById?id=${userId}`);
      return [response.data];
    }
    catch (error) {
      console.error('Error fetching user:', error);
      return [];
    }
  }
export const UpdateUserAPI = (newUser: User) => {
  return axios.put(`https://localhost:7119/api/User/UpdateUser`, newUser);
}

  export const LoginWithGoogle=async(userEmail:string)=>{
    
    console.log(userEmail);
    return axios.post(`${apiUrl}User/LoginByGoogle?UserEmail=${encodeURIComponent(userEmail)}`);
}

export const GetAllProjectPerUser=async (userId:string)=>{
    try{
    const response= await axios.get(`${apiUrl}User/GetAllProjectPerUserAsync?userId=${userId}`);
    return response.data;
    }
    catch (error) {
        console.error('Error fetching projects:', error);
      }
}
  

