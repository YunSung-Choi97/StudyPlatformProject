import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: { value: '', searchText: '' },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload
    }
  },
})

export const { setSearch, setSearchText } = searchSlice.actions

export default searchSlice.reducer