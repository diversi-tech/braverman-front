
export const setUser = (UserEmail, UserPassword, UserType) => {
  return { type: 'SET_CURRENT_USER', payload: { UserEmail, UserPassword, UserType } };
};