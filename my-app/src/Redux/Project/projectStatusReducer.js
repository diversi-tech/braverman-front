import { SET_ALL_STATUS } from './projectStatusAction';

const initialState = {
  allStatusProject: [], // המערך שבו נאחסן את כל הסטטוסים
};

const statusProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_STATUS:
      return {
        ...state,
        allStatusProject: action.payload,
      };
    default:
      return state;
  }
};

export default statusProjectReducer;
