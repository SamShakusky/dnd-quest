import axios from 'axios';
import randomId from '../utils/random-id';
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  CHECK_USER,
  SIGN_ERROR,
  GET_USER,
  PASS_CHANGED,
} from './types';
import { emitError } from './error-actions';

import localhost from '../config/localhost';

export const signIn = userData => (dispatch) => {
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Adventurers/login`,
    data    : JSON.stringify(userData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions)
    .then((response) => {
      const { id, userId } = response.data;
      
      const userCredentials = {
        accessToken  : id,
        tokenCreated : Date.now(),
        userId
      };
      
      dispatch({
        type    : SIGNIN_USER,
        payload : userCredentials,
      });
      
      localStorage.setItem('user_credentials', JSON.stringify(userCredentials));
      localStorage.setItem('has_account', true);
    })
    .catch((error) => {
      dispatch({
        type    : SIGN_ERROR,
        payload : error.response
      });
    });
};

export const signUp = userData => (dispatch) => {
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Adventurers`,
    data    : JSON.stringify(userData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions)
    .then(() => {
      dispatch(signIn(userData));
    })
    .catch((error) => {
      dispatch({
        type    : SIGN_ERROR,
        payload : error.response
      });
    });
};

export const createParty = emails => (dispatch) => {
  const party = {
    id : randomId('p'),
    emails
  };
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Parties`,
    data    : JSON.stringify(party),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions)
    .then(() => {
      localStorage.setItem('submitted', true);
    })
    .catch(() => {
      dispatch(emitError('Something went wrong. Please try again'));
    });
};

export const signOut = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const requestOptions = {
    method : 'POST',
    url    : `${localhost}/api/Adventurers/logout?access_token=${accessToken}`,
  };
  
  axios.request(requestOptions).then(() => {
    dispatch({
      type : SIGNOUT_USER,
    });
    
    localStorage.removeItem('user_credentials');
  });
};

export const checkUser = () => (dispatch, getState) => {
  const { accessToken, userId } = getState().user.credentials;
  axios.get(`${localhost}/api/Adventurers/${userId}?access_token=${accessToken}`)
    .then(() => {
      dispatch({
        type    : CHECK_USER,
        payload : true,
      });
    }).catch(() => {
      dispatch({
        type    : CHECK_USER,
        payload : false,
      });
    });
};

export const getUser = userId => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  axios.get(`${localhost}/api/Adventurers/${userId}?access_token=${accessToken}`)
    .then((response) => {
      const { id, username } = response.data;
      dispatch({
        type    : GET_USER,
        payload : {
          userId : id,
          username
        }
      });
    });
};

export const setPassword = data => (dispatch) => {
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Adventurers/reset-password?access_token=${data.token}`,
    data    : JSON.stringify({ newPassword : data.pass }),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then(() => {
    dispatch({
      type : PASS_CHANGED,
    });
  }).catch((error) => {
    dispatch({
      type    : SIGN_ERROR,
      payload : error.response
    });
  });
};

export const sendTokens = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Adventurers/setTempTokens?access_token=${accessToken}`,
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).catch((error) => {
    console.warn(error); // eslint-disable-line no-console
  });
};
