import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
// const apiUrl = process.env.REACT_APP_BRAVERMAN
const apiUrl ="https://localhost:7119/";


export const getcostumerProjec = (id:string) => { 
    return axios.get(`${apiUrl}user/${id}`);
}

export const getAllCostumers = () => { 
    return axios.get(`${apiUrl}user/`);
}