import axios from 'axios';
import { Lead } from '../model/leads.model';


const convertDateStringToDateTime = (dateString: string | Date): string => {
  debugger
    if (dateString instanceof Date) {
      return dateString.toISOString();
    }
  
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
  
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    return date.toISOString();
  };
  
//getAll
export const getAllLeads = () => {
    debugger
     return axios.get(`https://localhost:7119/api/Leads/GetOpenLeads`);
}

//addLead
export const  addLead=(lead:Lead)=>{
    debugger
    return axios.post('https://localhost:7119/api/Leads',lead)
}

//Conversion to customer
export const convertToCustomer=(id:string)=>{
    debugger
    return axios.put(`https://localhost:7119/api/Leads/changeToCostumer/${id}`)
}

//update change
export const updateLeadChanges = async (lead: Lead, id: string) => {
    debugger;
      const leadToUpdate = {
    ...lead,
    lastContacted: convertDateStringToDateTime(lead.lastContacted as unknown as string),
    createdDate: new Date(lead.createdDate).toISOString(),
  };
  console.log(leadToUpdate);
  return await axios.put(`https://localhost:7119/api/Leads/${id}`, leadToUpdate);
}  

//filterStatus
export const filterByStatus = async (status: string) => {
    debugger
    return await axios.get(`https://localhost:7119/api/Leads/FilterByStatus/?status=${encodeURIComponent(status)}`);
  }