import { SET_ALL_LEADS } from './leadsAction';

const initialState = {
    allLeads: [],
  };

  const leadsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_LEADS:
        return {
          ...state,
          allLeads: action.payload,
        };
        case 'DELETE_LEAD':
            return {
              ...state,
              allLeads: state.leads.filter(lead => lead.id !== action.payload),
            };
        case 'UPDATE_LEAD':
            return {
              ...state,
              allLeads: state.allLeads.map((lead) =>
                    lead.id === action.payload.id ? action.payload : lead
                  ),
                };
        case 'ADD_LEAD':
            return {
               ...state,
               allLeads: [...state.allLeads, action.payload],
                };
            
      default:
        return state;
    }
  };
  
  export default leadsReducer;
  