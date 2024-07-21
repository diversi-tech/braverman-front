import { SET_ALL_USERS } from './userAction';

const initialState = {
    allUser: [],
  };

  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_USERS:
        return {
          ...state,
          allUser: action.payload,
        };
        case 'UPDATE_USER':
            return {
              ...state,
              allUser: state.allUser.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                  ),
                };
        case 'ADD_USER':
            return {
               ...state,
               allUser: [...state.allUser, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default UserReducer;
  