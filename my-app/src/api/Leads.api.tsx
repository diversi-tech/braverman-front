import axios from 'axios';
import { Lead } from '../model/Lead.model';

//getAll
export const getAllLeads = () => {
    debugger
     return axios.get(`https://localhost:7119/api/Leads`);
}

//addLead
export const  addLead=(lead:Lead)=>{
    debugger
    return axios.post('https://localhost:7119/api/Leads',lead)
}