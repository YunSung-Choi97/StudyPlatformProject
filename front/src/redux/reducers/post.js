import { createSlice } from '@reduxjs/toolkit';

import { loadPost, startLiking, terminateLiking, newPost } from '../actions/post';

const initialState = {
  // post 불러오기
  post: null,
  comments: null,
  commentsLength: null,
  liking: null,
  loadPostLoading: false,
  loadPostDone: null,
  loadPostError: null,

  // 게시글 좋아요 요청하기
  startLikingLoading: false,
  startLikingDone: null,
  startLikingError: null,

  // 게시글 좋아요 취소 요청하기
  terminateLikingLoading: false,
  terminateLikingDone: null,
  terminateLikingError: null,

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
      state.liking = action.payload.liking;
      state.loadPostLoading = false;
      state.loadPostDone = action.payload.log;
    })
    builder.addCase(loadPost.rejected, (state, action) => {
      state.loadPostLoading = false;
      state.loadPostError = action.payload;
    })
    // 게시글 좋아요 요청하기
    builder.addCase(startLiking.pending, (state) => {
      state.startLikingLoading = true;
      state.startLikingDone = null;
      state.startLikingError = null;
    })
    builder.addCase(startLiking.fulfilled, (state, action) => {
      state.liking = true;
      state.post.post_like_number += 1;
      state.startLikingLoading = false;
      state.startLikingDone = action.payload;
    })
    builder.addCase(startLiking.rejected, (state, action) => {
      state.startLikingLoading = false;
      state.startLikingError = action.payload;
    })
    // 게시글 좋아요 취소 요청하기
    builder.addCase(terminateLiking.pending, (state) => {
      state.terminateLikingLoading = true;
      state.terminateLikingDone = null;
      state.terminateLikingError = null;
    })
    builder.addCase(terminateLiking.fulfilled, (state, action) => {
      state.liking = false;
      state.post.post_like_number -= 1;
      state.terminateLikingLoading = false;
      state.terminateLikingDone = action.payload;
    })
    builder.addCase(terminateLiking.rejected, (state, action) => {
      state.terminateLikingLoading = false;
      state.terminateLikingError = action.payload;
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