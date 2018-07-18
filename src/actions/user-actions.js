import axios from 'axios';
import { SIGNIN_USER } from './types';

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
  });
};
