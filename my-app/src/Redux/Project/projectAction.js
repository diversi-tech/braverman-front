export const SET_ALL_PROJECT = 'SET_ALL_PROJECT';

export const setAllProject = (project) => ({
  type: SET_ALL_PROJECT,
  payload: project,
});


export const deleteProjectReducer = (projectId) => ({
  type: 'DELETE_PROJECT',
  payload: projectId,
});

export const updateProjectReducer = (updatedProject) => ({
    type: 'UPDATE_PROJECT',
    payload: updatedProject,
});

export const addProject = (newProject) => ({
    type: 'ADD_PROJECT',
    payload: newProject,
});