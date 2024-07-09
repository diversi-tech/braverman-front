import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;

 const apiUrl = process.env.REACT_APP_ToDoApi


export const getcostumerProjec = (id:string) => { 
    return axios.get(`http://localhost:3000/user/${id}`);
}

export const getAllCostumers = () => { 
    return axios.get(`http://localhost:3000/user/`);
}