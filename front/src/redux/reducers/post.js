import { createSlice } from '@reduxjs/toolkit';

import { loadPost, newPost } from '../actions/post';

const initialState = {
  // post 불러오기
  post: null,
  comments: null,
  commentsLength: null,
  loadPostLoading: false,
  loadPostDone: null,
  loadPostError: null,

  // 새로운 게시글 작성하기
  newPostLoading: false,
  newPostDone: null,
  newPostError: null,
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
      state.loadPostDone = null;
      state.loadPostError = null;
    })
    builder.addCase(loadPost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.comments = action.payload.comments;
      state.commentsLength = action.payload.commentsLength;
      state.loadPostLoading = false;
      state.loadPostDone = action.payload.log;
    })
    builder.addCase(loadPost.rejected, (state, action) => {
      state.loadPostLoading = false;
      state.loadPostError = action.payload;
    })
    // 새로운 게시글 작성하기
    builder.addCase(newPost.pending, (state) => {
      state.newPostLoading = true;
      state.newPostDone = null;
      state.newPostError = null;
    })
    builder.addCase(newPost.fulfilled, (state, action) => {
      state.newPostLoading = false;
      state.newPostDone = action.payload;
    })
    builder.addCase(newPost.rejected, (state, action) => {
      state.newPostLoading = false;
      state.newPostError = action.payload;
    })
  }
});

export default postSlice;