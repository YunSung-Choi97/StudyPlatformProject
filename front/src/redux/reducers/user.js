import { createSlice } from '@reduxjs/toolkit';

import { login, logout, signup, loadMyInfo } from '../actions/user';

const initialState = {
  isLoggedIn: false,  // 로그인 상태
  myInfo: null,  // 내 정보

  // 로그인 요청
  loginLoading: false,  // 처리 상태
  loginErrorMessage: null,  // 실패 메시지

  // 로그아웃 요청
  logoutLoading: false,  // 처리 상태
  logoutErrorMessage: null,  // 실패 메시지

  // 회원가입 요청
  signupLoading: false,  // 처리 상태
  signupDone: null,  // 성공 메시지
  signupErrorMessage: null,  // 실패 메시지

  // 내 정보 불러오기 요청
  loadMyInfoLoading: false,  // 처리 상태
  loadMyInfoErrorMessage: null,  // 실패 메시지
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupEnd: (state) => {
      state.signupDone = null;
      state.signupErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.myInfo = action.payload;
      state.loginLoading = false;
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginErrorMessage = action.payload;
    })
    // 로그아웃
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.myInfo = null;
      state.logoutLoading = false;
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutLoading = false;
      state.logoutErrorMessage = action.payload;
    })
    // 회원가입
    builder.addCase(signup.pending, (state) => {
      state.signupLoading = true;
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupLoading = false;
      state.signupDone = action.payload;
    })
    builder.addCase(signup.rejected, (state, action) => {
      state.signupLoading = false;
      state.signupErrorMessage = action.payload;
    })
    // 내 정보 불러오기
    builder.addCase(loadMyInfo.pending, (state) => {
      state.loadMyInfoLoading = true;
    })
    builder.addCase(loadMyInfo.fulfilled, (state, action) => {
      state.loadMyInfoLoading = false;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.myInfo = action.payload.myInfo;
    })
    builder.addCase(loadMyInfo.rejected, (state, action) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoErrorMessage = action.payload;
    })
  }
});

export const { signupEnd } = userSlice.actions;

export default userSlice;