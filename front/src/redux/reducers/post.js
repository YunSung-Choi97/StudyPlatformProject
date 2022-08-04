import { createSlice } from '@reduxjs/toolkit';

import { loadPosts, newPost } from '../actions/post';

const initialState = {
  // posts 불러오기
  posts: null,
  loadPostsLoading: false,
  loadPostsErrorMessage: null,

  // 새로운 글 작성하기
  newPostLoading: false,
  newPostDone: null,
  newPostErrorMessage: null,
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
    // 새로운 게시글 추가하기
    builder.addCase(newPost.pending, (state) => {
      state.newPostLoading = true;
    })
    builder.addCase(newPost.fulfilled, (state, action) => {
      state.newPostLoading = false;
      state.newPostDone = action.payload;
      state.newPostErrorMessage = null;
    })
    builder.addCase(newPost.rejected, (state, action) => {
      state.newPostLoading = false;
      state.newPostDone = null;
      state.newPostErrorMessage = action.payload;
    })
  }
});

export default postSlice;