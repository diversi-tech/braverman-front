export const SET_ALL_USERS = 'SET_ALL_USERS';


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
