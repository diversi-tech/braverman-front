import { SET_ALL_USER_TYPE } from './userTypeAction';

const initialState = {
    allUserType: [],
  };
  const UserTypeReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_USER_TYPE:
        return {
          ...state,
          allUserType: action.payload,
        };
        default:
            return state;
    }
}
    export default UserTypeReducer;
