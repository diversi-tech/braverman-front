
export const setUser = (UserEmail, UserPassword, UserId,UserTypeId,UserTypeName,UserFirstName,UserLastName) => {
  debugger
  return { type: 'SET_CURRENT_USER', payload: {UserEmail, UserPassword,UserId,UserTypeId,UserTypeName,UserFirstName,UserLastName,UserPassword, UserEmail  } };
};