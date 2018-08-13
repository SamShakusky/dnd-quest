import { combineReducers } from 'redux';
import userReducer from './user-reducers';
import campaignReducer from './campaign-reducers';
import questReducer from './quest-reducers';

export default combineReducers({
  user      : userReducer,
  campaigns : campaignReducer,
  quests    : questReducer,
});
