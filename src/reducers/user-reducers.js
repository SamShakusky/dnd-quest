import { SIGNIN_USER, SIGNOUT_USER, CHECK_USER, SIGN_ERROR, GET_USER } from '../actions/types';

const userCredentials = JSON.parse(localStorage.getItem('user_credentials'));
const initToken = userCredentials && userCredentials.accessToken;
const initId = userCredentials && userCredentials.userId;

const initialState = {
  credentials : initToken && initId ? {
    accessToken : initToken,
    userId      : initId,
  } : {},
  isAuth : !!(initToken && initId),
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
    case CHECK_USER:
      return {
        ...state,
        isAuth : action.payload
      };
    case SIGN_ERROR:
      return {
        ...state,
        error : action.payload
      };
    case GET_USER:
      return {
        ...state,
        userData : action.payload
      };
    default:
      return state;
  }
};
