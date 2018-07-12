import { combineReducers } from 'redux';
import questReducer from './quest-reducer';

export default combineReducers({
  quests : questReducer,
});
