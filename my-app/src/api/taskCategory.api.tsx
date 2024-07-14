import axios from 'axios';
import { TaskCategory } from '../model/taskCategory.model';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN

export const getTaskCategories = async () => {
    try {
        const response = await axios.get(`${apiUrl}TaskCategory`);
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task categories:', error);
        return [];
    }
};

export const addCategory = async (taskCategory: TaskCategory) => {
    try {
        const response=await axios.post(`${apiUrl}TaskCategory`,taskCategory);
        return response.data; 
      } catch (error) {
        console.error('Error adding task category:', error);
        throw error;
      }
}

export const updateCategory = async (categoryId:string, taskCategory: TaskCategory) => {
    try {
        const response=await axios.put(`${apiUrl}TaskCategory/${categoryId}`,taskCategory);
        return response.data; 
      } catch (error) {
        console.error('Error update task category:', error);
        throw error;
      }
}
export const deleteCategory = async (categoryId:string) => {
    try {
        const response=await axios.delete(`${apiUrl}TaskCategory/${categoryId}`);
        return response.data; 
      } catch (error) {
        console.error('Error delete task category:', error);
        throw error;
      }
}