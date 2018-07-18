import { SIGNIN_USER, SIGNOUT_USER } from '../actions/types';

const userCredentials = JSON.parse(localStorage.getItem('user_credentials'));
const initToken = userCredentials && userCredentials.accessToken;
const initId = userCredentials && userCredentials.userId;

const initialState = {
  credentials : initToken && initId ? {
    accessToken : initToken,
    userId      : initId,
  } : {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        credentials : action.payload,
        isAuth      : true,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        credentials : null,
        isAuth      : false,
      };
    default:
      return state;
  }
};
