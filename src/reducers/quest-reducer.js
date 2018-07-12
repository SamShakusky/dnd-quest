import { CREATE_QUEST, READ_QUESTS, UPDATE_QUEST, DELETE_QUEST } from '../actions/types';

const initialState = {
  items : []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case READ_QUESTS:
      return {
        ...state,
        items : action.payload,
      };
    case CREATE_QUEST:
      return {
        ...state,
        items : [
          ...state.items,
          { ...action.payload }
        ]
      };
    case UPDATE_QUEST:
      return {
        ...state,
        items : action.payload
      };
    case DELETE_QUEST:
      return {
        ...state,
        items : action.payload
      };
    default:
      return state;
  }
};
