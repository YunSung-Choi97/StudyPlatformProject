import { createSlice } from '@reduxjs/toolkit';

import { loadPost, newPost } from '../actions/post';

const initialState = {
  // post 불러오기
  post: null,
  comments: null,
  commentsLength: null,
  loadPostLoading: false,
  loadPostErrorMessage: null,

  // 새로운 게시글 작성하기
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
    // post 불러오기
    builder.addCase(loadPost.pending, (state) => {
      state.loadPostLoading = true;
    })
    builder.addCase(loadPost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.comments = action.payload.comments;
      state.commentsLength = action.payload.commentsLength;
      state.loadPostLoading = false;
      state.loadPostErrorMessage = null;
    })
    builder.addCase(loadPost.rejected, (state, action) => {
      state.post = null;
      state.comments = null;
      state.loadPostLoading = false;
      state.loadPostErrorMessage = action.payload;
    })
    // 새로운 게시글 작성하기
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