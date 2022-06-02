import { createSlice } from '@reduxjs/toolkit'

export const statusSlice = createSlice({
  name: 'status',
  initialState: { value: '전체' },
  reducers: {
    setStatus: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setStatus } = statusSlice.actions

export default statusSlice.reducer