import axios from 'axios';
import { Task } from '../model/task.model';

const apiUrl = process.env.REACT_APP_BRAVERMAN
export const getAllTaskFromServer = async () => {
    debugger
    let res = await axios.get(`${apiUrl}Tasks`)
    if (res) {
        console.log("resTask", res);
        return await res.data;
    }
}
export const getTaskById = async (taskId: string) => {

    try {
        let response = await axios.get(`${apiUrl}Tasks/GetById/${taskId}`);

        return response.data;
    }
    catch (error) {
        console.error('Error fetching task :', error);
        return error;
    }

}
export const UpDateTask = async (t: Task) => {
    debugger
    let res = await axios.put(`${apiUrl}Tasks/Update`,
        t
    )
    if (res) {
        console.log(res.data);
        return await res.data;
    }
}

export const addTask = async (newTask: Task) => {
    debugger
    let res = await axios.post(`${apiUrl}Tasks/Add`,
        newTask
    )
    if (res) {
        console.log(res);
        return await res.data;
    }
}

export const getTaskStatusChanges = async (taskId: string) => {
    try {
        
        let res = await axios.get(`${apiUrl}Tasks/GetTaskStatusChanges/${taskId}`)

        return res.data;
    }
    catch (error) {
        console.error('Error fetching logs of this task', error);
        return null;
    }

}
