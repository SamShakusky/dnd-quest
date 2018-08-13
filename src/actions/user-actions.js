import axios from 'axios';
import { SIGNIN_USER, SIGNOUT_USER, CHECK_USER, SIGN_ERROR } from './types';

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
        type : CHECK_USER,
      });
    });
};
