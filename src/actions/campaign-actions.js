import axios from 'axios';
import { CREATE_CAMPAIGN, READ_CAMPAIGNS, UPDATE_CAMPAIGN, DELETE_CAMPAIGN } from './types';

import localhost from '../config/localhost';

export const createCampaign = campaignData => (dispatch, getState) => {
  const { accessToken, userId } = getState().user.credentials;
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Campaigns?access_token=${accessToken}`,
    data    : JSON.stringify({ ...campaignData, adventurerId : userId }),
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
  axios.get(`${localhost}/api/Adventurers/${userId}/campaigns?access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : READ_CAMPAIGNS,
        payload : response.data,
      });
    });
};

export const updateCampaign = (campaignData, campaigns) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const index = campaigns.findIndex(i => i.id === campaignData.id);
  const campaignList = [...campaigns];
  
  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Campaigns/${campaignData.id}?access_token=${accessToken}`,
    data    : JSON.stringify(campaignData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    campaignList[index] = {
      ...response.data,
      id : campaignData.id,
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
