import axios from 'axios';
import randomId from '../utils/random-id';
import { UPDATE_LIST } from './types';

import localhost from '../config/localhost';

export const createQuest = questData => (dispatch, getState) => {
  const { items } = getState().quests;
  const id = randomId('q');
  const data = { ...questData, id };
  dispatch({
    type    : UPDATE_LIST,
    payload : [...items, { ...data }],
  });
  
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Campaigns/${currentCampaign}/quests?access_token=${accessToken}`,
    data    : JSON.stringify(data),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).catch((error) => {
    dispatch({
      type    : UPDATE_LIST,
      payload : items,
    });
  });
};

export const readQuests = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  axios.get(`${localhost}/api/Campaigns/${currentCampaign}/quests?access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : UPDATE_LIST,
        payload : response.data,
      });
    });
};

export const updateQuest = questData => (dispatch, getState) => {
  const { items } = getState().quests;
  const index = items.findIndex(i => i.id === questData.id);
  const questList = [...items];
  
  questList[index] = {
    ...questData,
  };
  
  dispatch({
    type    : UPDATE_LIST,
    payload : questList,
  });
  
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  
  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Campaigns/${currentCampaign}/quests/${questData.id}?access_token=${accessToken}`,
    data    : JSON.stringify(questData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).catch((error) => {
    dispatch({
      type    : UPDATE_LIST,
      payload : items,
    });
  });
};

export const deleteQuest = questId => (dispatch, getState) => {
  const { items } = getState().quests;
  let questList = [...items];
  
  questList = questList.filter(i => i.id !== questId);
  dispatch({
    type    : UPDATE_LIST,
    payload : questList,
  });
  
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  
  axios.delete(`${localhost}/api/Campaigns/${currentCampaign}/quests/${questId}?access_token=${accessToken}`)
    .catch(() => {
      dispatch({
        type    : UPDATE_LIST,
        payload : items,
      });
    });
};
