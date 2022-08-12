import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

export const loadPost = createAsyncThunk('post/loadPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/load-post', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const startLiking = createAsyncThunk('post/startLiking', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/start-liking', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const terminateLiking = createAsyncThunk('post/terminateLiking', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/terminate-liking', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addPost = createAsyncThunk('post/addPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/add-post', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/delete-post', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addComment = createAsyncThunk('post/addComment', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/add-comment', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteComment = createAsyncThunk('post/deleteComment', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/delete-comment', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});