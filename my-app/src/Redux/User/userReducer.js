import { User } from "../../model/user.model";

const initialState = {
  isAuthenticated: false,
  currentUser: {} ,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: true,

        currentUser: action.payload,
      };
      case 'UPDATE_CURRENT_USER':
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
