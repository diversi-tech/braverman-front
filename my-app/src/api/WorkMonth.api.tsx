import axios from 'axios';
const apiUrl = 'https://localhost:7119/api/WorkMonth'

export const GetTimersByMonthAsync = (date: any) => {
    const [year, month] = date.split('-').map(Number);
    const newDate = new Date(year, month, 1)
    const formatDate = newDate.toISOString();
    const response = axios.get(`${apiUrl}/GetTimersByMonthAsync/${formatDate}`);
    return response;
}