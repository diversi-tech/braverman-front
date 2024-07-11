import { SET_ALL_ENUMS } from "./enumsAction";

const initialState = {
    allEnums: [],
  };

  const enumsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_ENUMS:
        return {
          ...state,
          allEnums : action.payload,
        };
        default:
        return state;
    }
  };
  
  export default enumsReducer;
  