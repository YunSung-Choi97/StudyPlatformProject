import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import userReducer from './user';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user: userReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;