import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
// const apiUrl = process.env.REACT_APP_BRAVERMAN
const apiUrl = 'https://localhost:7119/api/';

export const getTypes = async () => {  
     return await axios.get(`${apiUrl}UserType`);
  };