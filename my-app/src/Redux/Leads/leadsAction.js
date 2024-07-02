export const SET_ALL_LEADS = 'SET_ALL_LEADS';

export const setAllLeads = (leads) => ({
  type: SET_ALL_LEADS,
  payload: leads,
});

export const deleteLead = (leadId) => ({
    type: 'DELETE_LEAD',
    payload: leadId,
  });

  export const updateLead = (updatedLead) => ({
      type: 'UPDATE_LEAD',
      payload: updatedLead,
  });

  export const addLead2 = (newLead) => ({
      type: 'ADD_LEAD',
      payload: newLead,
  });