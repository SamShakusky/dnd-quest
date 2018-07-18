import { combineReducers } from 'redux';
import questReducer from './quest-reducers';
import userReducer from './user-reducers';

export default combineReducers({
  quests : questReducer,
  user   : userReducer,
});
