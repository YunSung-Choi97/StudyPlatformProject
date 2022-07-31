import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import userSlice from './user';
import pageSlice from './page';
import postSlice from './post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user: userSlice.reducer,
        page: pageSlice.reducer,
        post: postSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;