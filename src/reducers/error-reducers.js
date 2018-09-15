import { ERROR_HANDLER } from '../actions/types';

const initialState = {
  error : ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_HANDLER:
      return {
        error : action.payload,
      };
    default:
      return state;
  }
};
