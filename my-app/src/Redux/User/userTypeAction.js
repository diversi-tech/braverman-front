export const SET_ALL_USER_TYPE = 'SET_ALL_USER_TYPE';

export const setAllUserType = (users) => ({
    type: SET_ALL_USER_TYPE,
    payload: users,
  });