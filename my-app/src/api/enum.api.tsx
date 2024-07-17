import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BRAVERMAN;
// const apiUrl = process.env.REACT_APP_BRAVERMAN
const apiUrl = 'https://localhost:7119/api/';

export const getAllEnumFromServer = async (int : Number) => {
    let res = await axios.get(`${apiUrl}LookUpBase/GetAllLookUpBase?e=${int}`)
    if (res) {
        console.log(res);
        return await res.data;
    }
}