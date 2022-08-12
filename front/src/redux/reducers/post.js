import { createSlice } from '@reduxjs/toolkit';

import { loadPost, startLiking, terminateLiking, addPost, deletePost, addComment, deleteComment } from '../actions/post';

const initialState = {
  // 게시글 불러오기
  post: null,
  comments: null,
  commentsLength: null,
  liking: null,
  loadPostLoading: false,
  loadPostDone: null,
  loadPostError: null,

  // 게시글 좋아요
  startLikingLoading: false,
  startLikingDone: null,
  startLikingError: null,
  // 게시글 좋아요 취소
  terminateLikingLoading: false,
  terminateLikingDone: null,
  terminateLikingError: null,

  // 게시글 작성하기
  addPostLoading: false,
  addPostDone: null,
  addPostError: null,
  // 게시글 삭제하기
  deletePostLoading: false,
  deletePostDone: null,
  deletePostError: null,

  // 댓글 작성하기
  addCommentLoading: false,
  addCommentDone: null,
  addCommentError: null,
  // 댓글 삭제하기
  deleteCommentLoading: false,
  deleteCommentDone: null,
  deleteCommentError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 게시글 불러오기
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
    // 게시글 작성하기
    builder.addCase(addPost.pending, (state) => {
      state.addPostLoading = true;
      state.addPostDone = null;
      state.addPostError = null;
    })
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.addPostLoading = false;
      state.addPostDone = action.payload;
    })
    builder.addCase(addPost.rejected, (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.payload;
    })
    // 게시글 삭제하기
    builder.addCase(deletePost.pending, (state) => {
      state.deletePostLoading = true;
      state.deletePostDone = null;
      state.deletePostError = null;
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.deletePostLoading = false;
      state.deletePostDone = action.payload;
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      state.deletePostLoading = false;
      state.deletePostError = action.payload;
    })
    // 댓글 작성하기
    builder.addCase(addComment.pending, (state) => {
      state.addCommentLoading = true;
      state.addCommentDone = null;
      state.addCommentError = null;
    })
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.commentsLength = action.payload.commentsLength;
      state.addCommentLoading = false;
      state.addCommentDone = action.payload.log;
    })
    builder.addCase(addComment.rejected, (state, action) => {
      state.addCommentLoading = false;
      state.addCommentError = action.payload;
    })
    // 댓글 삭제하기
    builder.addCase(deleteComment.pending, (state) => {
      state.deleteCommentLoading = true;
      state.deleteCommentDone = null;
      state.deleteCommentError = null;
    })
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.commentsLength = action.payload.commentsLength;
      state.deleteCommentLoading = false;
      state.deleteCommentDone = action.payload;
    })
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.deleteCommentLoading = false;
      state.deleteCommentError = action.payload;
    })
  }
});

export default postSlice;