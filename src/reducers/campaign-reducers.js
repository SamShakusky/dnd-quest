import { CREATE_CAMPAIGN, READ_CAMPAIGNS, UPDATE_CAMPAIGN, DELETE_CAMPAIGN } from '../actions/types';

const initialState = {
  items : []
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
    default:
      return state;
  }
};
