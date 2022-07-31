import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

export const loadPosts = createAsyncThunk('post/loadPosts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post/load-posts', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});