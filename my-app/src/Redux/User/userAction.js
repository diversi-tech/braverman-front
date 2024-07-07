import { User } from "../../model/user.model";

export const setUser = (user) => {
  debugger
  return { type: 'SET_CURRENT_USER', payload: {user } };
};

export const updateUser = (user ) => {
  debugger
  return { type: 'UPDATE_CURRENT_USER', payload: {user } };
};