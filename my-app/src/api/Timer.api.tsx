import axios from 'axios';
import { Timer } from '../model/Timer.model';
const apiUrl = 'https://localhost:7119/api/Timer'


export const getAllTimers = () => {
  return axios.get(apiUrl);
}

export const addTimer = (timer: Timer) => {
  const timerToUpdate = {
    ...timer,
    startTime: timer.startTime.toISOString(),
    endTime: timer.endTime?.toISOString()
  }
  return axios.post(`${apiUrl}/Add`, timerToUpdate);
}

export const getTheAmountOfTimeForAllProjects = async (): Promise<string> => {
  const response = await axios.get(`${apiUrl}/GetTheAmountOfTimeForAllProjects`);
  return response.data;
}

export const getTimersGroupedByUserAndProjectAsync =  () => {
  const response =  axios.get(`${apiUrl}/GetTimersGroupedByUserAndProjectAsync`);
  return response;
}
