const initialState = {
  isAuthenticated: false,
  currentUser: {UserEmail:'',UserPassword:'',UserId:'',UserTypeId:'',UserTypeName:'', UserFirstName: '', UserLastName: '' },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: true,

        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
