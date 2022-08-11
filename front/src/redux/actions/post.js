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

export const newPost = createAsyncThunk('post/newPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/new-post', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});