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
export const getUsers = async () => {
    try {
      const response = await axios.get('https://localhost:7119/api/User/GetAll');
      return [...response.data]; 
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; 
    }
  };
export const getUserById=async (userId:string)=>{
    try{
    const response= await axios.get(`https://localhost:7119/api/User/${userId}`);
    return [response.data];
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return []; 
      }
}

export const updateUser=async(userId:string,newUser:User)=>
{
  try
  {
    const response=await axios.put(`https://localhost:7119/api/User/${userId}`,newUser);
    return response.data;
  }
  catch(error)
  {
    console.error('error update user: ',error);
    return error;
    
  }
}

