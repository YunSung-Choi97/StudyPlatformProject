import { createSlice } from '@reduxjs/toolkit';

import { login, logout, signup, test } from '../actions/user';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  loginLoading: false,
  loginErrorMessage: null,
  logoutLoading: false,
  logoutErrorMessage: null,
  signupLoading: false,
  signupDone: null,
  signupErrorMessage: null,
  test: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginTest: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
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
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = null;
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
    // debug
    builder.addCase(test.pending, (state) => {
      state.test = '테스트중';
    })
    builder.addCase(test.fulfilled, (state) => {
      state.test = '테스트 요청성공';
    })
    builder.addCase(test.rejected, (state) => {
      state.test = '테스트 요청실패';
    })
  }
});

export const { setLoginTest } = userSlice.actions;

export default userSlice;