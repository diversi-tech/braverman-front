import axios from 'axios';
const apiUrl = process.env.REACT_APP_BRAVERMAN;

export const GetTimersByMonthAsync = (date: any) => {
    const [year, month] = date.split('-').map(Number);
    const newDate = new Date(year, month, 1)
    const formatDate = newDate.toISOString();
    const response = axios.get(`${apiUrl}WorkMonth/GetTimersByMonthAsync/${formatDate}`);
    return response;
}

export const GetByMonthAsync = (date: any) => {
    const [year, month] = date.split('-').map(Number);
    const newDate = new Date(year, month, 1)
    const formatDate = newDate.toISOString();
    const response = axios.get(`${apiUrl}WorkMonth/GetByMonthAsync/${formatDate}`);
    return response;
}