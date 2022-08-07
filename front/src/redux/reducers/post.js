import { createSlice } from '@reduxjs/toolkit';

import { loadPost, loadPosts, newPost } from '../actions/post';

const initialState = {
  // post 불러오기
  post: null,
  loadPostLoading: false,
  loadPostErrorMessage: null,

  // posts 불러오기
  posts: null,
  posts_length: null,
  loadPostsLoading: false,
  loadPostsErrorMessage: null,

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
      state.post = action.payload;
      state.loadPostLoading = false;
      state.loadPostErrorMessage = null;
    })
    builder.addCase(loadPost.rejected, (state, action) => {
      state.loadPostLoading = false;
      state.loadPostErrorMessage = action.payload;
    })
    // posts 불러오기
    builder.addCase(loadPosts.pending, (state) => {
      state.loadPostsLoading = true;
    })
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.posts_length = action.payload.posts_length;
      state.loadPostsLoading = false;
      state.loadPostsErrorMessage = null;
    })
    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsErrorMessage = action.payload;
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