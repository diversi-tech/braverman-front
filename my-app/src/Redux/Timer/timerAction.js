// import { startTimeEntry, stopTimeEntry } from '../../api/togglApi';

// export const START_TIMER = 'START_TIMER';
// export const STOP_TIMER = 'STOP_TIMER';

// export const startTimer = (timer) => ({
//   type: START_TIMER,
//   payload: timer,
// });


// export const stopTimer = (timer) =>({
//   type: STOP_TIMER,
//   payload: timer,
// });

// export const startTimera = (userId, projectId) => async (dispatch) => {
//   try {
//     const data = await startTimeEntry(userId, projectId);
//     dispatch({ type: START_TIMER, payload: data });
//   } catch (error) {
//     console.error('Error in startTimer action:', error);
//   }
// };

// export const stopTimers = (timeEntryId) => async (dispatch) => {
//   try {
//     const data = await stopTimeEntry(timeEntryId);
//     dispatch({ type: STOP_TIMER, payload: data });
//   } catch (error) {
//     console.error('Error in stopTimer action:', error);
//   }
// };