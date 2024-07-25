import axios from 'axios';
import { Timer } from '../model/Timer.model';
const apiUrl ='https://localhost:7119/api/Timer'


const convertDateStringToDateTime = (dateString: string | Date): string => {
    if (dateString instanceof Date) {
      return dateString.toISOString();
    }

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
  
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  
    return date.toISOString();
}

export const getAllTimers = () => {
    return axios.get(apiUrl);
  }
  
  
  //addLead
  export const addTimer = (timer: Timer) => {
    debugger
    console.log("dfffdvdfd");
    
    console.log("bf",timer);
    const timerToUpdate = {
        ...timer,
        startTime:timer.startTime.toISOString(),
        endTime: timer.endTime?.toISOString()
    }
    
    console.log("fdbb", timerToUpdate);
    
    return axios.post(`${apiUrl}/Add`, timerToUpdate);
  }