import { UPDATE_LIST } from '../actions/types';

const initialState = {
  items : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return {
        ...state,
        items : action.payload,
      };
    default:
      return state;
  }
};
