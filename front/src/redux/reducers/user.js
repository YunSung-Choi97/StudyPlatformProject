import { createSlice } from '@reduxjs/toolkit';

import { loadMyInfo, login, logout, signup } from '../actions/user';

const initialState = {
  isLoggedIn: false,  // 로그인 상태
  myInfo: null,  // 내 정보

  // 내 정보 불러오기
  loadMyInfoLoading: false,
  loadMyInfoDone: null,
  loadMyInfoError: null,

  // 로그인
  loginLoading: false,
  loginDone: null,
  loginError: null,

  // 로그아웃
  logoutLoading: false,
  logoutDone: null,
  logoutError: null,

  // 회원가입
  signupLoading: false,
  signupDone: null,
  signupError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 내 정보 불러오기
    builder.addCase(loadMyInfo.pending, (state) => {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = null;
      state.loadMyInfoError = null;
    })
    builder.addCase(loadMyInfo.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.myInfo = action.payload.myInfo;
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = action.payload.log;
    })
    builder.addCase(loadMyInfo.rejected, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.myInfo = action.payload.myInfo;
      state.loadMyInfoLoading = false;
      state.loadMyInfoError = action.payload.log;
    })
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = null;
      state.loginError = null;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.myInfo = action.payload.myInfo;
      state.loginLoading = false;
      state.loginDone = action.payload.log;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    })
    // 로그아웃
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
      state.logoutDone = null;
      state.logoutError = null;
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.myInfo = null;
      state.logoutLoading = false;
      state.logoutDone = action.payload;
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    })
    // 회원가입
    builder.addCase(signup.pending, (state) => {
      state.signupLoading = true;
      state.signupDone = null;
      state.signupError = null;
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupLoading = false;
      state.signupDone = action.payload;
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload;
    })
  }
});

export default userSlice;