import { createSlice } from '@reduxjs/toolkit'

export const contentsSlice = createSlice({
  name: 'contents',
  initialState: { value: [] },
  reducers: {
    setContents: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setContents } = contentsSlice.actions

export default contentsSlice.reducer