import axios from 'axios';
const serviceURL = `https://localhost:7119/`
export const getAllEnumFromServer = async (int : Number) => {
    let res = await axios.get(`${serviceURL}api/LookUpBase/GetAllLookUpBase?e=${int}`)
    if (res) {
        debugger
        console.log(res);
        return await res.data;
    }
}