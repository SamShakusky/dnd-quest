import { GET_USERS } from '../actions/types';

const initialState = {
  tableData : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        tableData : action.payload,
      };
    default:
      return state;
  }
};
