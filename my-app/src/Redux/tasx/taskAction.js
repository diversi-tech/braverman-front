export const SET_ALL_TASK = 'SET_ALL_TASK';
export const ADD_TASK = 'ADD_TASK';

export const setAllTask = (task) => ({
  type: SET_ALL_TASK,
  payload: task,
});

export const addNewTask = (newTask) => ({
  type: 'ADD_TASK',
  payload: newTask,
});