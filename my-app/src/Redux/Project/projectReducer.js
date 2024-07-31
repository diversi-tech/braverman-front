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
    case 'DELETE_PROJECT':
      return {
        ...state,
        allProject: state.allProject.filter(p => p.id !== action.payload),
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        allProject: state.allProject.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        allProject: [...state.allProject, action.payload],
      };
    default:
      return state;
  }
};

export default projectReducer;