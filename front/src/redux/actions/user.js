import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios 기본 설정
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

export const login = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/login', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('user/logout', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/logout', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk('user/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/signup', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get('/user/loadMyInfo');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});