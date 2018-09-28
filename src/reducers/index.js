import { combineReducers } from 'redux';
import userReducer from './user-reducers';
import campaignReducer from './campaign-reducers';
import questReducer from './quest-reducers';
import errorReducer from './error-reducers';

export default combineReducers({
  user      : userReducer,
  campaigns : campaignReducer,
  quests    : questReducer,
  error     : errorReducer,
});
