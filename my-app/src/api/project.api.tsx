import axios from 'axios';

const serviceURL = `https://localhost:7119/api/`

export const getAllProjectFromServer = async () => {
    let res = await axios.get(`${serviceURL}Project`)
    if (res) {
        console.log("resProject",res);
        return await res.data;
    }
} 

