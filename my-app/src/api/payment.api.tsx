import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN
export const getPaymentToProject = async (projectId:any) => {
    try {
        const response = await axios.get(`${apiUrl}Project/GetPaymentToProject/${projectId}`);
        console.log(response)
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task paynent:', error);
        return [];
    }
};
export const changeStatusPaymentTaskByTaskId = async (projectId:string,TaskId:string) => {
    try {
         await fetch(`${apiUrl}Project/changeStatusPaymentTaskByTaskId/${projectId},${TaskId}`, {
            method: 'POST',
          });
         return true
    } catch (error) {
        console.error('Error fetching task paynent:', error);
        return false
    }
};






