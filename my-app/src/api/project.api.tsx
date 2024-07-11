import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
const apiUrl = process.env.REACT_APP_BRAVERMAN

export const getCustomerProjec = (customerId: string) => {
    console.log(customerId);

    //return axios.get(`https://localhost:7119/api/Project/GetById/${id}`);
    //צריך לשנות לפונקציה שמחזירה את הפרויקטים לפי id של הcustomer
    return axios.get(`${apiUrl}Project/GetById/667dec3df9361bd95f17db87`);

}

export const updateProject = (projectData: any) => {
    console.log("projectData");
    console.log(projectData);
    return axios.put(`${apiUrl}Project/Update`,projectData);
}

export const getProject = () => {
    return axios.get(`${apiUrl}Project`);
}
export const deleteProject = (projectId: string) => {
    return axios.delete(`${apiUrl}Project/Delete/${projectId}`);
}