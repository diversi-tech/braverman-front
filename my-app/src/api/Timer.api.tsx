import axios from 'axios';
import { Timer } from '../model/Timer.model';
 const apiUrl = process.env.REACT_APP_BRAVERMAN;


export const getAllTimers = () => {
  return axios.get(apiUrl);
}

export const addTimer = (timer: Timer) => {
  const timerToUpdate = {
    ...timer,
    startTime: timer.startTime.toISOString(),
    endTime: timer.endTime?.toISOString()
  }
  return axios.post(`${apiUrl}Timer/Add`, timerToUpdate);
}

export const getTheAmountOfTimeForAllProjects = async (): Promise<string> => {
  const response = await axios.get(`${apiUrl}Timer/GetTheAmountOfTimeForAllProjects`);
  return response.data;
}

export const getTimersGroupedByUserAndProjectAsync =  () => {
  const response =  axios.get(`${apiUrl}Timer/GetTimersGroupedByUserAndProjectAsync`);
  return response;
}
