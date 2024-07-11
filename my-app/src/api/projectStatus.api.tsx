import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN

export const getStatusProject = () => {
    return axios.get(`${apiUrl}LookUpBase/GetAllLookUpBase?e=0`);

}
export const filterByStatus = (statusKey:string) => {
    return axios.get(`${apiUrl}Project/GetByStatus/${statusKey}`);
}