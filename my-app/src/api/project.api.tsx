import axios from 'axios';
const Url =    'https://localhost:7119/api/Project/'


export const getAllProjects = async () => {
    try {
        const response = await axios.get(Url);
        return [...response.data];
    } catch (error) {
        console.error('Error fetching task categories:', error);
        return [];
    }
};


export const getCustomerProjec = (customerId: string) => {
    console.log(customerId);

    //return axios.get(`https://localhost:7119/api/Project/GetById/${id}`);
    //צריך לשנות לפונקציה שמחזירה את הפרויקטים לפי id של הcustomer
    return axios.get(`https://localhost:7119/api/Project/GetById/667dec3df9361bd95f17db87`);

}

export const updateProject = (projectData: any) => {
    console.log("projectData");
    console.log(projectData);
    return axios.put(`https://localhost:7119/api/Project/Update`,projectData);
}

export const getProject = () => {
    return axios.get(`https://localhost:7119/api/Project`);
}
export const deleteProject = (projectId: string) => {
    return axios.delete(`https://localhost:7119/api/Project/Delete/${projectId}`);
}
