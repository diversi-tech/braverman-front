import { SET_ALL_STATUS } from './statusLeadAction';

const initialState = {
    allStatusLead: [],
  };

  const statusLeadReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_STATUS:
        return {
          ...state,
          allStatusLead: action.payload,
        };
      default:
        return state;
    }
}
  export default statusLeadReducer;
  