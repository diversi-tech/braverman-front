import { SET_ALL_TASK_STATUS } from "./taskStatusAction";

const initialState = {
    allTaskStatus: [],
  };

  const tekStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_TASK_STATUS:
        return {
          ...state,
          allTaskStatus : action.payload,
        };
        default:
        return state;
    }
  };

  export default tekStatusReducer;