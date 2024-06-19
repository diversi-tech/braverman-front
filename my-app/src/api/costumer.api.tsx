import axios from 'axios';




export const getcostumerProjec = (id:string) => { 
    return axios.get(`http://localhost:3000/user/${id}`);
}

export const getAllCostumers = () => { 
    return axios.get(`http://localhost:3000/user/`);
}