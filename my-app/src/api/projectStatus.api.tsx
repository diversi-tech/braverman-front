import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN

export const getStatusProject = () => {
    return axios.get('https://localhost:7119/api/LookUpBase/GetAllLookUpBase?e=3');

}

export const filterByStatus = (statusKey:string) => {
    return axios.get(`https://localhost:7119/api/Project/GetByStatus/${statusKey}`);
}