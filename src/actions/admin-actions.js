import axios from 'axios';

import { GET_USERS, GET_LOG } from './types';

import localhost from '../config/localhost';

export const getUsers = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const filter = JSON.stringify({
    username : true,
    email    : true,
    password : true,
    id       : true
  });
  axios.get(`${localhost}/api/Adventurers?filter=${filter}&access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : GET_USERS,
        payload : response.data,
      });
    }).catch(() => {
      dispatch({
        type    : GET_USERS,
        payload : false,
      });
    });
};

export const getCampaigns = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;

  axios.get(`${localhost}/api/Campaigns?access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : GET_USERS,
        payload : response.data,
      });
    }).catch(() => {
      dispatch({
        type    : GET_USERS,
        payload : false,
      });
    });
};

export const getParties = filterTesters => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  
  const filter = filterTesters ?
    JSON.stringify({
      where : {
        tester : true,
      }
    })
    : null;
  
  axios.get(`${localhost}/api/Parties?filter=${filter}&access_token=${accessToken}`)
    .then((response) => {
      const result = response.data.length === 0 ?
        null
        :
        response.data;
      
      dispatch({
        type    : GET_USERS,
        payload : result,
      });
    }).catch(() => {
      dispatch({
        type    : GET_USERS,
        payload : false,
      });
    });
};

export const setTester = (partyId, flag) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;

  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Parties/${partyId}/tester?access_token=${accessToken}`,
    data    : JSON.stringify({ flag }),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then(() => {
    dispatch(getParties());
  });
};

export const setManyTesters = amount => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;

  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Parties/addTesters?access_token=${accessToken}`,
    data    : JSON.stringify({ amount }),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then(() => {
    dispatch(getParties());
  });
};

export const removeTesters = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;

  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Parties/removeTesters?access_token=${accessToken}`,
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then(() => {
    dispatch(getParties());
  });
};

export const createAdventures = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;

  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Parties/createAdventures?access_token=${accessToken}`,
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    const {
      data: {
        adventurers,
        campaigns,
        errors,
      }
    } = response;
    
    const log = [
      adventurers.length,
      campaigns.length,
      errors.length,
    ];
    
    dispatch({
      type    : GET_LOG,
      payload : log,
    });
  });
};
