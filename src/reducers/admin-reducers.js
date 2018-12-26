import { GET_USERS, GET_LOG } from '../actions/types';

const initialState = {
  tableData : null,
  log       : [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        tableData : action.payload,
      };
    case GET_LOG:
      return {
        ...state,
        log : action.payload,
      };
    default:
      return state;
  }
};
