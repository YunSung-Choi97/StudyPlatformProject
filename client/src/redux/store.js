import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './reducer/field';
import statusReducer from './reducer/status';
import contentsReducer from './reducer/contents';
import searchReducer from './reducer/search';
import userReducer from './reducer/user';

export default configureStore({
  reducer: {
    field: fieldReducer,
    status: statusReducer,
    contents: contentsReducer,
    search: searchReducer,
    user: userReducer,
  },
})