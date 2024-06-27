import axios from 'axios';

export const getTypes = async () => {
    
    try {
      const response = await axios.get('https://localhost:7119/api/UserType/getAll');
      return [...response.data];
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; 
    }
  };