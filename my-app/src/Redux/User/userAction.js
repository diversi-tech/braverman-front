export const SET_ALL_USERS = 'SET_ALL_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export const setAllUsers = (users) => ({
  type: SET_ALL_USERS,
  payload: users,
});

export const updateUser = (updateUser) => ({
  type: 'UPDATE_USER',
  payload: updateUser,
});

export const addUser = (newUser) => ({
  type: 'ADD_USER',
  payload: newUser,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const updateCurrentUser = (updateUser) => ({
  type: 'UPDATE_CURRENT_USER',
  payload: updateUser,
});

