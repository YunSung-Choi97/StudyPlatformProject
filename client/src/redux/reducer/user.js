import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: { isLogin: undefined, userInfo: undefined },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  },
})

export const { setLogin, setLogout, setUserInfo } = userSlice.actions

export default userSlice.reducer