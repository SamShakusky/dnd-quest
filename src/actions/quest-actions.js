import axios from 'axios';
import { CREATE_QUEST, READ_QUESTS, UPDATE_QUEST, DELETE_QUEST } from './types';

import localhost from '../config/localhost';

export const createQuest = questData => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/Campaigns/${currentCampaign}/quests?access_token=${accessToken}`,
    data    : JSON.stringify(questData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    dispatch({
      type    : CREATE_QUEST,
      payload : response.data,
    });
  });
};

export const readQuests = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  axios.get(`${localhost}/api/Campaigns/${currentCampaign}/quests?access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : READ_QUESTS,
        payload : response.data,
      });
    });
    // const ass = JSON.stringify({ "where": { "state": "CA" } });
    // axios.get(`/api/Quests/change-stream?_format=event-stream&options=${ass}&access_token=${accessToken}`)
    // .then((response) => {
    //   console.log('bbb',response);
    // });
};

export const updateQuest = (questData, quests) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  const index = quests.findIndex(i => i.id === questData.id);
  const questList = [...quests];
  
  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Campaigns/${currentCampaign}/quests/${questData.id}?access_token=${accessToken}`,
    data    : JSON.stringify(questData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    questList[index] = {
      ...response.data,
      id : questData.id,
    };
    
    dispatch({
      type    : UPDATE_QUEST,
      payload : questList,
    });
  });
};

export const deleteQuest = (questId, quests) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  let questList = [...quests];
  
  axios.delete(`${localhost}/api/Campaigns/${currentCampaign}/quests/${questId}?access_token=${accessToken}`)
    .then(() => {
      questList = questList.filter(i => i.id !== questId);
      dispatch({
        type    : DELETE_QUEST,
        payload : questList,
      });
    });
};

export const doneQuest = (questId, newStatus) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  const questList = getState().quests.items;
  const newList = [...questList];
  const index = questList.findIndex(i => i.id === questId);
  
  const questData = { done : newStatus };
  
  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/Campaigns/${currentCampaign}/quests/${questId}?access_token=${accessToken}`,
    data    : JSON.stringify(questData),
    headers : { 'Content-Type' : 'application/json' }
  };
  
  axios.request(requestOptions).then((response) => {
    newList[index].done = response.data.done;
    
    dispatch({
      type    : UPDATE_QUEST,
      payload : newList,
    });
  });
};
