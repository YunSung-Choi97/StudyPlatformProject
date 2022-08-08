import { createSlice } from '@reduxjs/toolkit';

import { loadPosts } from '../actions/posts';

const initialState = {
  // posts 불러오기
  posts: null,
  postsLength: null,
  loadPostsLoading: false,
  loadPostsErrorMessage: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // posts 불러오기
    builder.addCase(loadPosts.pending, (state) => {
      state.loadPostsLoading = true;
    })
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.postsLength = action.payload.posts_length;
      state.loadPostsLoading = false;
      state.loadPostsErrorMessage = null;
    })
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.posts = null;
      state.postsLength = null;
      state.loadPostsLoading = false;
      state.loadPostsErrorMessage = action.payload;
    })
  }
});

export default postsSlice;