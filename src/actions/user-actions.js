import axios from 'axios';
import { SIGNIN_USER, SIGNOUT_USER, CHECK_USER } from './types';

import localhost from '../config/localhost';

export const signIn = userData => (dispatch) => {
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Users/login`,
    data    : JSON.stringify(userData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
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
  });
};

export const signUp = userData => (dispatch) => {
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Users`,
    data    : JSON.stringify(userData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then(() => {
    dispatch(signIn(userData));
  });
};

export const signOut = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const requestOptions = {
    method : 'POST',
    url    : `${localhost}/api/Users/logout?access_token=${accessToken}`,
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
  axios.get(`${localhost}/api/Users/${userId}?access_token=${accessToken}`)
    .then(() => {
      dispatch({
        type : CHECK_USER,
      });
    });
};
