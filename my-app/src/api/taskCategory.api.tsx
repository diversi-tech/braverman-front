import axios from 'axios';

export const getTaskCategories = async () => {
    try {
        const response = await axios.get('https://localhost:7119/api/TaskCategory/getAll');
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task categories:', error);
        return [];
    }
};



export const addCategory = async (taskCategory: string) => {


    try {
        const response=await axios.post(`https://localhost:7119/api/TaskCategory/addTaskCategory`,taskCategory);
        return response.data; 
      } catch (error) {
        console.error('Error adding task category:', error);
        throw error;
      }
}