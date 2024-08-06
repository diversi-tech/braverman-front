import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN


export const sendEmail = (title :string, body:string) => {
    return axios.post(`${apiUrl}Email/sendEmail/$${title}/$${body}`);    
}