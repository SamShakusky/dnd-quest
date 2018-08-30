import axios from 'axios';
import {
  CREATE_CAMPAIGN,
  READ_CAMPAIGNS,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  SET_CAMPAIGN,
} from './types';

import localhost from '../config/localhost';

export const createCampaign = campaignData => (dispatch, getState) => {
  const { accessToken, userId } = getState().user.credentials;
  const data = {
    ownerId : userId,
    members : [userId],
    ...campaignData,
  };
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Campaigns?access_token=${accessToken}`,
    data    : JSON.stringify(data),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    dispatch({
      type    : CREATE_CAMPAIGN,
      payload : response.data,
    });
  });
};

export const readCampaigns = () => (dispatch, getState) => {
  const { accessToken, userId } = getState().user.credentials;
  axios.get(`${localhost}/api/Campaigns/membership?adventurerId=${userId}&access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : READ_CAMPAIGNS,
        payload : response.data.items,
      });
    });
};

export const updateCampaign = (campaignData, campaigns) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const index = campaigns.findIndex(i => i.id === campaignData.id);
  const campaignList = [...campaigns];
  const { membersFull, ...newData } = campaignData;
  const { membersFull: n, ...oldData } = campaignList[index];
  
  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Campaigns/${campaignData.id}?access_token=${accessToken}`,
    data    : JSON.stringify({ ...oldData, ...newData }),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    campaignList[index] = {
      ...response.data,
    };
    
    dispatch({
      type    : UPDATE_CAMPAIGN,
      payload : campaignList,
    });
  });
};

export const deleteCampaign = (campaignId, campaigns) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  let campaignList = [...campaigns];
  
  axios.delete(`${localhost}/api/Campaigns/${campaignId}?access_token=${accessToken}`)
    .then(() => {
      campaignList = campaignList.filter(i => i.id !== campaignId);
      dispatch({
        type    : DELETE_CAMPAIGN,
        payload : campaignList,
      });
    });
};

export const setCampaign = campaignId => (dispatch) => {
  dispatch({
    type    : SET_CAMPAIGN,
    payload : campaignId,
  });
  
  localStorage.setItem('current_campaign', JSON.stringify(campaignId));
};
