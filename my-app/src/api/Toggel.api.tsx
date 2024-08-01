 import axios from 'axios';



// const CLOCKIFY_API_BASE_URL = 'https://api.clockify.me/api/v1';
// const TOGGL_API_TOKEN = '5f76806fc322e978ff8fd17a34e6d40f';
// import axios from 'axios';





// export const startWorkTimer = async (description: string) => {
//   const response = await axios.post('https://api.track.toggl.com/api/v8/time_entries/start', {
//       time_entry: {
//           description,
//           start: new Date().toISOString(),
//           created_with: 'Breverman'
//       }
//   }, {
//       auth: {
//           username: TOGGL_API_TOKEN,
//           password: 'api_token'
//       }
//   });
//   return response.data;
// };
// const CLOCKIFY_API_BASE_URL = 'https://api.clockify.me/api/v1';
// const CLOCKIFY_API_KEY = 'ZTEyZTY4NGMtZTQ2Yi00ZGQ5LTg1MjMtM2UzYjk0ZWMyODEw';
// const WORKSPACE_ID = 'YOUR_WORKSPACE_ID';

// const clockifyAxios = axios.create({
//   baseURL: CLOCKIFY_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Api-Key': CLOCKIFY_API_KEY
//   }
// });

// export const startTimer = async (description: string, projectId?: string, taskId?: string) => {
//   try {
//     const response = await clockifyAxios.post(`/workspaces/${WORKSPACE_ID}/time-entries`, {
//       start: new Date().toISOString(),
//       description,
//       projectId,
//       taskId,
//       billable: true
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error starting timer:', error);
//     throw error;
//   }
// };

// export const stopTimer = async (timeEntryId: string) => {
//   try {
//     const response = await clockifyAxios.patch(`/workspaces/${WORKSPACE_ID}/time-entries/${timeEntryId}`, {
//       end: new Date().toISOString()
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error stopping timer:', error);
//     throw error;
//   }
// };

// export const getTotalHours = async () => {
//   try {
//     const response = await clockifyAxios.get(`/workspaces/${WORKSPACE_ID}/user/YOUR_USER_ID/time-entries`);
//     return response.data;
//   } catch (error) {
//     console.error('Error getting total hours:', error);
//     throw error;
//   }
// };

// // הגדרת פרטי האימות עבור axios
// const clockifyAxios = axios.create({
//   baseURL: CLOCKIFY_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Api-Key': CLOCKIFY_API_KEY
//   }
// });

// // פונקציה להתחלת טיימר
// export const startTimer = async (description: string, projectId?: string, taskId?: string) => {
//   try {
//     const response = await clockifyAxios.post('/workspaces/YOUR_WORKSPACE_ID/time-entries', {
//       start: new Date().toISOString(),
//       description,
//       projectId,
//       taskId,
//       billable: true
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error starting timer:', error);
//     throw error;
//   }
// };

// // פונקציה לעצירת טיימר
// export const stopTimer = async (timeEntryId: string) => {
//   try {
//     const response = await clockifyAxios.patch(`/workspaces/YOUR_WORKSPACE_ID/time-entries/${timeEntryId}`, {
//       end: new Date().toISOString()
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error stopping timer:', error);
//     throw error;
//   }
// };

// // פונקציה לחישוב סך כל השעות
// export const getTotalHours = async () => {
//   try {
//     const response = await clockifyAxios.get('/workspaces/YOUR_WORKSPACE_ID/user/YOUR_USER_ID/time-entries');
//     return response.data;
//   } catch (error) {
//     console.error('Error getting total hours:', error);
//     throw error;
//   }
// };

// // import { Timer } from '../model/Timer.model';
// // const TOGGL_API_TOKEN = '81e1be3183dd0889052b9165895bcd98'
// // const TOGGL_API_BASE_URL = 'https://api.track.toggl.com/api/v8';


// // const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy

// // // הגדרת פרטי האימות עבור axios
// // const togglAxios = axios.create({
// //   baseURL: `${CORS_PROXY}${TOGGL_API_BASE_URL}`,
// //   auth: {
// //     username: TOGGL_API_TOKEN,
// //     password: 'api_token'
// //   },
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // });

// // // פונקציה להתחלת טיימר
// // // export const startTimer = async (description: string, projectId?: string, taskId?: string) => {
// // //   try {
// // //     const response = await togglAxios.post('/time_entries/start', {
// // //       time_entry: {
// // //         description,
// // //         pid: projectId,
// // //         tid: taskId,
// // //         created_with: 'api'
// // //       }
// // //     });
// // //     return response.data;
// // //   } catch (error) {
// // //     console.error('Error starting timer:', error);
// // //     throw error;
// // //   }
// // // };

// // export const startTimer = async (description:string) => {
// //   try {
// //     debugger
// //     const response = await fetch(`${TOGGL_API_BASE_URL}/time_entries/start`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': 'Basic ' + btoa(`${TOGGL_API_TOKEN}:api_token`)
// //       },
// //       body: JSON.stringify({
// //         time_entry: {
// //           description,
// //           pid: 123,
// //           tid: 123,
// //           created_with: 'api'
// //         }
// //       })
// //     });

// //     if (!response.ok) {
// //       throw new Error(`Error starting timer: ${response.statusText}`);
// //     }

// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error('Error:', error);
// //     throw error;
// //   }
// // };
// // // פונקציה לעצירת טיימר
// // export const stopTimer = async (timeEntryId: number) => {
// //   try {
// //     const response = await togglAxios.put(`/time_entries/${timeEntryId}/stop`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error stopping timer:', error);
// //     throw error;
// //   }
// // };

// // // פונקציה לחישוב סך כל השעות
// // export const getTotalHours = async (userId: string) => {
// //   try {
// //     const response = await togglAxios.get('/time_entries', {
// //       params: {
// //         user_agent: userId
// //       }
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error getting total hours:', error);
// //     throw error;
// //   }
// // };
// // // const togglAxios = axios.create({
// // //   baseURL: TOGGL_API_BASE_URL,
// // //   auth: {
// // //     username: TOGGL_API_TOKEN,
// // //     password: 'api_token'
// // //   },
// // //   headers: {
// // //     'Content-Type': 'application/json'
// // //   }
// // // });

// // // // פונקציה להתחלת טיימר
// // // export const startTimer = async (description: string, projectId?: string, taskId?: string) => {
// // //   try {
// // //     const response = await togglAxios.post('/time_entries/start', {
// // //       time_entry: {
// // //         description,
// // //         pid: projectId,
// // //         tid: taskId,
// // //         created_with: 'api'
// // //       }
// // //     });
// // //     return response.data;
// // //   } catch (error) {
// // //     console.error('Error starting timer:', error);
// // //     throw error;
// // //   }
// // // };

// // // פונקציה לעצירת טיימר
// // export const stopTimer = async (timeEntryId: number) => {
// //   try {
// //     const response = await togglAxios.put(`/time_entries/${timeEntryId}/stop`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error stopping timer:', error);
// //     throw error;
// //   }
// // };

// // // פונקציה לחישוב סך כל השעות
// // export const getTotalHours = async (userId: string) => {
// //   try {
// //     const response = await togglAxios.get('/time_entries', {
// //       params: {
// //         user_agent: userId
// //       }
// //     });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error getting total hours:', error);
// //     throw error;
// //   }
// // };


// // src/api/toggl.ts

// // const TOGGL_WORKSPACE_ID = 'הכניסי_כאן_את_ה-Workspace_ID_שלך';

// // export const togglAxios = axios.create({  
// //   baseURL: 'https://api.track.toggl.com/api/v8',
// //   auth: {
// //     username: TOGGL_API_TOKEN,
// //     password: 'api_token',
// //   },
// // });

// // axios.defaults.auth = {
// //   username: TOGGL_API_TOKEN,
// //   password: 'api_token'
// // };
// // export const startTimer = async (description: string, projectId?: string, taskId?: string) => {
// //   const response = await axios.post(`${TOGGL_API_BASE_URL}/time_entries/start`, {
// //     time_entry: {
// //       description,
// //       pid: projectId,
// //       tid: taskId,
// //       created_with: 'api'
// //     }
// //   });
// //   return response.data;
// // };

// // // פונקציה לעצירת טיימר
// // export const stopTimer = async (timeEntryId: number) => {
// //   const response = await axios.put(`${TOGGL_API_BASE_URL}/time_entries/${timeEntryId}/stop`);
// //   return response.data;
// // };

// // export const getTotalHours = async (userId: string) => {
// //   const response = await axios.get(`${TOGGL_API_BASE_URL}/time_entries`, {
// //     params: {
// //       user_agent: userId
// //     }
// //   });
// //   return response.data;
// // };


// // export const getTimeEntries = async (): Promise<Timer[]> => {
// //   const response = await togglAxios.get('/time_entries');
// //   return response.data.data;
// // };

// // const api = axios.create({
// //   baseURL: 'https://api.track.toggl.com/api/v8',
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Authorization': `Basic ${btoa('YOUR_API_TOKEN:api_token')}`
// //   }
// // });

// // export const startTimeEntry = async (description: string, projectId?: string, taskId?: string) => {
// //   const response = await api.post('/time_entries/start', {
// //     time_entry: {
// //       description,
// //       pid: projectId,
// //       tid: taskId,
// //       created_with: 'YOUR_APP_NAME'
// //     }
// //   });
// //   return response.data;
// // };

// // export const stopTimeEntry = async (timeEntryId: number) => {
// //   const response = await api.put(`/time_entries/${timeEntryId}/stop`);
// //   return response.data;
// // };

// // export const getTimeEntries = async (startDate: string, endDate: string) => {
// //   const response = await api.get('/time_entries', {
// //     params: {
// //       start_date: startDate,
// //       end_date: endDate
// //     }
// //   });
// //   return response.data;
// // };
