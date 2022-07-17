import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
  section: null,
  status: null,
  search: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.category = action.payload.category;
      state.section = action.payload.section;
      state.status = action.payload.status;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setPage, setCategory, setSection, setStatus, setSearch } = pageSlice.actions;

export default pageSlice;