import { combineReducers } from 'redux';
import questReducer from './quest-reducers';

export default combineReducers({
  quests : questReducer,
});
