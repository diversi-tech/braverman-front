import axios from 'axios';

export const getStatusProject = () => {
    return axios.get(`https://localhost:7119/api/LookUpBase/GetAllLookUpBase?e=0`);

}
export const filterByStatus = (statusKey:string) => {
    return axios.get(`https://localhost:7119/api/Project/GetByStatus/${statusKey}`);
}