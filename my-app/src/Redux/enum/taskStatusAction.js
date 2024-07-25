export const SET_ALL_TASK_STATUS = 'SET_ALL_TASK_STATUS';

export const setAllTaskStatus = (taskStatus) => ({
  type: SET_ALL_TASK_STATUS,
  payload: taskStatus,
});