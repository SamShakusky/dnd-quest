import axios from 'axios';
import randomId from '../utils/random-id';
import { UPDATE_LIST } from './types';
import { emitError } from './error-actions';

// import localhost from '../config/localhost';

export const createQuest = (questData, withRequest = true) => (dispatch, getState) => {
  const { items } = getState().quests;
  const id = randomId('q');
  const data = { ...questData, id : questData.id ? questData.id : id };
  dispatch({
    type    : UPDATE_LIST,
    payload : [...items, { ...data }],
  });
  
  if (withRequest) {
    const { accessToken } = getState().user.credentials;
    const { currentCampaign } = getState().campaigns;
    const requestOptions = {
      method  : 'POST',
      url     : `/api/Campaigns/${currentCampaign}/quests?access_token=${accessToken}`,
      data    : JSON.stringify(data),
      headers : { 'Content-Type' : 'application/json' }
    };
    
    axios.request(requestOptions).catch((err) => {
      const { error } = err.response.data;
      let errMessage = 'Hmm, that quest somehow wasn\'t created. Please, try again.';
      if (error.statusCode === 507) errMessage = error.message;
      
      dispatch({
        type    : UPDATE_LIST,
        payload : items,
      });
      dispatch(emitError(errMessage));
    });
  }
};

export const readQuests = () => (dispatch, getState) => {
  const { accessToken } = getState().user.credentials;
  const { currentCampaign } = getState().campaigns;
  axios.get(`/api/Campaigns/${currentCampaign}/quests?access_token=${accessToken}`)
    .then((response) => {
      dispatch({
        type    : UPDATE_LIST,
        payload : response.data,
      });
    });
};

export const updateQuest = (questData, withRequest = true) => (dispatch, getState) => {
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
  
  if (withRequest) {
    const { accessToken } = getState().user.credentials;
    const { currentCampaign } = getState().campaigns;
    
    const requestOptions = {
      method  : 'PUT',
      url     : `/api/Campaigns/${currentCampaign}/quests/${questData.id}?access_token=${accessToken}`,
      data    : JSON.stringify(questData),
      headers : { 'Content-Type' : 'application/json' }
    };
    
    axios.request(requestOptions).catch(() => {
      dispatch({
        type    : UPDATE_LIST,
        payload : items,
      });
      dispatch(emitError('Hmm, that quest somehow wasn\'t edited. Please, try again.'));
    });
  }
};

export const deleteQuest = (questId, withRequest = true) => (dispatch, getState) => {
  const { items } = getState().quests;
  let questList = [...items];
  
  questList = questList.filter(i => i.id !== questId);
  dispatch({
    type    : UPDATE_LIST,
    payload : questList,
  });
  
  if (withRequest) {
    const { accessToken } = getState().user.credentials;
    const { currentCampaign } = getState().campaigns;
    
    axios.delete(`/api/Campaigns/${currentCampaign}/quests/${questId}?access_token=${accessToken}`)
      .catch(() => {
        dispatch({
          type    : UPDATE_LIST,
          payload : items,
        });
        dispatch(emitError('Hmm, that quest somehow wasn\'t deleted. Please, try again.'));
      });
  }
};

export const subscribe = source => (dispatch, getState) => {
  const { userId } = getState().user.credentials;
  source.addEventListener('data', (msg) => {
    const data = JSON.parse(msg.data);
    if (userId === data.dispatcher) return false;
    
    const action = {
      create : createQuest(data.data, false),
      update : updateQuest(data.data, false),
      remove : deleteQuest(data.data.id, false),
    };
    
    return dispatch(action[data.type]);
  });
};

export const unsubscribe = source => () => {
  source.close();
};
