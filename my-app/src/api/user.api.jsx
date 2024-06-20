import axios from 'axios';

 const addUser = (user) => {
    console.log(user.id);
    return axios.put(`http://localhost:3000/meeting/`,user);
}

const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/meeting/');
      return response.data; 
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; 
    }
  };
const getUserById=(userId)=>{
    return axios.get("");
}

export {addUser,getUsers,getUserById}
