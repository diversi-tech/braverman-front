import { SET_ALL_TASK } from "./taskAction";

const initialState = {
  allTask: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TASK:
      return {
        ...state,
        allTask: action.payload,
      };
    case 'ADD_TASK':
      
      return {
        ...state,
        allTask: [...state.allTask, action.payload],
         };
    default:
      return state;
  }
};

export default taskReducer;