import axios from 'axios';
const Url =    'https://localhost:7119/api/Project/'


export const getAllProjects = async () => {
    try {
        const response = await axios.get(Url);
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task categories:', error);
        return [];
    }
};


