import axios from 'axios';

export const getPaymentToProject = async (projectId:any) => {
    try {
        const response = await axios.get(`https://localhost:7119/api/Project/GetPaymentToProject/${projectId}`);
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task paynent:', error);
        return [];
    }
};