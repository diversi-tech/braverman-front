import axios from 'axios';
import { Lead } from '../model/leads.model';
import { Project } from '../model/project.model';
import { Notes } from '../model/notes.model';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
// const apiUrl = process.env.REACT_APP_BRAVERMAN;
 const apiUrl = 'https://localhost:7119/api/';


const convertDateStringToDateTime = (dateString: string | Date): string => {
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
  return axios.get(`${apiUrl}Leads`);
}

//addLead
export const addLead = (lead: Lead) => {
  return axios.post(`${apiUrl}Leads`, lead);
}

//Conversion to customer
export const convertToCustomer = (id: string) => {
  return axios.put(`${apiUrl}Leads/changeToCostumer/${id}`);
}

//update change
export const updateLeadChanges = async (lead: Lead, id: string) => {
  const leadToUpdate = {
    ...lead,
    lastContacted: convertDateStringToDateTime(lead.lastContacted as unknown as string),
    createdDate: convertDateStringToDateTime(lead.createdDate as unknown as string),
  };
  debugger
  console.log(leadToUpdate);
  return await axios.put(`https://localhost:7119/api/Leads/${id}`, leadToUpdate);
  // return await axios.put(`${apiUrl}Leads/${id}`, leadToUpdate);
}

//filterStatus
export const filterByStatus = async (status: string) => {
  return await axios.get(`${apiUrl}Leads/FilterByStatus/?status=${encodeURIComponent(status)}`);
}

//convertToProject
export const convertToProject = async (project: Project) => {
  debugger
  const projectToConvert = {
    ...project,
    createdAt: new Date(project.createdAt).toISOString(),
    updatedAt: new Date(project.updatedAt).toISOString(),
    endDate: new Date(project.endDate).toISOString(),

  };
  console.log('Sending project data to server:', projectToConvert);
  try {
    return await axios.post(`${apiUrl}Project/Add`, projectToConvert);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Server responded with an error:', error.response?.data);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
}
export const addNewNote = async (note: Notes) => {
  const projectToConvert = {
    ...note,
    timestamp: new Date(note.timestamp).toISOString(),
  };
  try {
    debugger
    return await axios.post(`${apiUrl}Note`, projectToConvert);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Server responded with an error:', error.response?.data);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
}
