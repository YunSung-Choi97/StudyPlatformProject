import { createSlice } from '@reduxjs/toolkit'

export const fieldSlice = createSlice({
  name: 'field',
  initialState: { value: '전체' },
  reducers: {
    setField: (state, action) => {
      state.value = action.payload
    },
    setFieldIdx: (state, action) => {
      if (action.payload === 0) { state.value = '전체' }
      else if (action.payload === 1) { state.value = '어학' }
      else if (action.payload === 2) { state.value = '취업' }
      else if (action.payload === 3) { state.value = '고시/공무원' }
      else if (action.payload === 4) { state.value = '취미/교양' }
      else if (action.payload === 5) { state.value = '프로그래밍' }
      else if (action.payload === 6) { state.value = '자율' }
      else if (action.payload === 7) { state.value = '기타' }
    }
  },
})

export const { setField, setFieldIdx } = fieldSlice.actions

export default fieldSlice.reducer