import { SET_ALL_PROJECT } from './projectAction';

const initialState = {
    allProject: [],
  };

  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_PROJECT:
        return {
          ...state,
          allProject: action.payload,
        };
        default:
        return state;
    }
  };

  export default projectReducer;