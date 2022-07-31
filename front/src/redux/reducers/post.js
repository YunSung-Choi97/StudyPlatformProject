import { createSlice } from '@reduxjs/toolkit';

import { loadPosts } from '../actions/post';

const initialState = {
  posts: null,

  loadPostsLoading: false,
  loadPostsErrorMessage: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // post 정보들 불러오기
    builder.addCase(loadPosts.pending, (state) => {
      state.loadPostsLoading = true;
    })
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loadPostsLoading = false;
      state.loadPostsErrorMessage = null;
    })
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsErrorMessage = action.payload;
    })
  }
});

export default postSlice;