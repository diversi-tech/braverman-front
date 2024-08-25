import axios from 'axios';
import { Timer } from '../model/Timer.model';
const apiUrl = process.env.REACT_APP_BRAVERMAN;


export const getAllTimers = () => {
  return axios.get(`${apiUrl}Timer`);
}


const formatDateToLocalString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


export const addTimer = (timer: Timer) => {
  console.log("api");
  console.log(timer);
  const timerToUpdate = {
    ...timer,
    startTime: formatDateToLocalString(timer.startTime),
    endTime: timer.endTime ? formatDateToLocalString(timer.endTime) : undefined,
  }

  console.log(timerToUpdate);

  return axios.post(`${apiUrl}Timer/Add`, timerToUpdate);
}


export const getTheAmountOfTimeForAllProjects = async (): Promise<string> => {
  const response = await axios.get(`${apiUrl}Timer/GetTheAmountOfTimeForAllProjects`);
  return response.data;
}

export const getTimersGroupedByUserAndProjectAsync = () => {
  const response = axios.get(`${apiUrl}Timer/GetTimersGroupedByUserAndProjectAsync`);
  return response;
}
