import axios from 'axios';
import { Task } from '../model/task.model';

const serviceURL = `https://localhost:7119/api/`

export const getAllTaskFromServer = async () => {
    let res = await axios.get(`${serviceURL}Tasks`)
    if (res) {
        console.log("resTask",res);
        return await res.data;
    }
} 

export const UpDateTask = async (t : Task) => {
    debugger
    let res = await axios.put(`${serviceURL}Tasks/Update`,
        t
    )
    if (res) {
        console.log(res.data);
        return await res.data;
    }
}

export const addTask = async (newTask : Task) => {
    debugger
    let res = await axios.post(`${serviceURL}Tasks/Add`,
        newTask
    )
    if (res) {
        console.log(res);
        return await res.data;
    }
}
