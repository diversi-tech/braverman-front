import { SET_ALL_TASKCATEGORY} from "./taskCategoryAction";

const initialState = {
  allTaskCategory: [],
};

const taskCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TASKCATEGORY:
      return {
        ...state,
        allTaskCategory: action.payload,
      };

    default:
      return state;
  }
};

export default taskCategoryReducer;