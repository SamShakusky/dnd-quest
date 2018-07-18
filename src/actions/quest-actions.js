import axios from 'axios';
import { CREATE_QUEST, READ_QUESTS, UPDATE_QUEST, DELETE_QUEST } from './types';

import localhost from '../config/localhost';

export const createQuest = questData => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const requestOptions = {
    method  : 'POST',
    url     : `${localhost}/api/quests?access_token=${accessToken}`,
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
  axios.get(`${localhost}/api/quests?access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : READ_QUESTS,
        payload : response.data,
      });
    });
};

export const updateQuest = (questData, quests) => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const index = quests.findIndex(i => i.id === questData.id);
  const questList = [...quests];
  
  const requestOptions = {
    method  : 'PUT',
    url     : `${localhost}/api/quests/${questData.id}?access_token=${accessToken}`,
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
  let questList = [...quests];
  
  axios.delete(`${localhost}/api/quests/${questId}?access_token=${accessToken}`)
    .then(() => {
      questList = questList.filter(i => i.id !== questId);
      dispatch({
        type    : DELETE_QUEST,
        payload : questList,
      });
    });
};
