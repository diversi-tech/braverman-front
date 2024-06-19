// userReducer.js
import { SET_USER} from './actions';

const initialState = {
  role: null,
  isAuthenticated: false,
  user: null,
  
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
      };
  
    default:
      return state;
  }
};

export default userReducer;
