import { createSlice } from '@reduxjs/toolkit';

import { loadPosts } from '../actions/posts';

const initialState = {
  // posts 불러오기
  posts: null,
  postsLength: null,
  loadPostsLoading: false,
  loadPostsDone: null,
  loadPostsError: null,
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
      state.loadPostsDone = null;
      state.loadPostsError = null;
    })
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.postsLength = action.payload.posts_length;
      state.loadPostsLoading = false;
      state.loadPostsDone = action.payload.log;
    })
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload;
    })
  }
});

export default postsSlice;