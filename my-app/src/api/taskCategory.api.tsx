import axios from 'axios';
import { TaskCategory } from '../model/taskCategory.model';

let arr = [{ id: "1", description: "qqq" }, { id: "2", description: "www" }]

export const getTaskCategories = async () => {
    try {
        // const response = await axios.get('https://localhost:7119/api/TaskCategory/getAll');
        // return [...response.data];
        return arr;
    } catch (error) {
        console.error('Error fetching task categories:', error);
        return [];
    }
};



export const addCategory = async (taskCategory: string) => {

    console.log(taskCategory);
    arr.push({ id: "3", description: taskCategory })
    return { id: "1", description: taskCategory }
    // try {
    //     const response=await axios.post(`https://localhost:7119/api/TaskCategory/addTaskCategory`,taskCategory);
    //     return response.data; 
    //   } catch (error) {
    //     console.error('Error adding task category:', error);
    //     throw error;
    //   }
}