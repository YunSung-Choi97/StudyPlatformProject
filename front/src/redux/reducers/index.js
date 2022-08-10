import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import pageSlice from './page';
import postSlice from './post';
import postsSlice from './posts';
import userSlice from './user';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        page: pageSlice.reducer,
        post: postSlice.reducer,
        posts: postsSlice.reducer,
        user: userSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;