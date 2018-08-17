import { CREATE_CAMPAIGN, READ_CAMPAIGNS, UPDATE_CAMPAIGN, DELETE_CAMPAIGN, SET_CAMPAIGN } from '../actions/types';

const currentCampaign = JSON.parse(localStorage.getItem('current_campaign'));

const initialState = {
  items : [],
  currentCampaign
};

export default (state = initialState, action) => {
  switch (action.type) {
    case READ_CAMPAIGNS:
      return {
        ...state,
        items : action.payload,
      };
    case CREATE_CAMPAIGN:
      return {
        ...state,
        items : [
          ...state.items,
          { ...action.payload }
        ]
      };
    case UPDATE_CAMPAIGN:
      return {
        ...state,
        items : action.payload
      };
    case DELETE_CAMPAIGN:
      return {
        ...state,
        items : action.payload
      };
    case SET_CAMPAIGN:
      return {
        ...state,
        currentCampaign : action.payload
      };
    default:
      return state;
  }
};
