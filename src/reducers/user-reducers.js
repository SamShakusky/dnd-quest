import { SIGNIN_USER } from '../actions/types';

const initialState = {
  credentials : {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        credentials : action.payload,
        isAuth      : true,
      };
    default:
      return state;
  }
};
