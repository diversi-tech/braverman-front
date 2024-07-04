import axios from 'axios';
import { TaskCategory } from '../model/taskCategory.model';

export const getTaskCategories = async () => {
    try {
        const response = await axios.get('https://localhost:7119/api/TaskCategory');
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task categories:', error);
        return [];
    }
};

export const addCategory = async (taskCategory: TaskCategory) => {
    try {
        const response=await axios.post(`https://localhost:7119/api/TaskCategory`,taskCategory);
        return response.data; 
      } catch (error) {
        console.error('Error adding task category:', error);
        throw error;
      }
}

export const updateCategory = async (categoryId:string, taskCategory: TaskCategory) => {
    try {
        const response=await axios.put(`https://localhost:7119/api/TaskCategory/${categoryId}`,taskCategory);
        return response.data; 
      } catch (error) {
        console.error('Error update task category:', error);
        throw error;
      }
}
export const deleteCategory = async (categoryId:string) => {
    try {
        const response=await axios.delete(`https://localhost:7119/api/TaskCategory/${categoryId}`);
        return response.data; 
      } catch (error) {
        console.error('Error delete task category:', error);
        throw error;
      }
}