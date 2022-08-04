import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  category: null,
  section: null,
  status: null,
  search: null,
  page: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.name = action.payload.name ? action.payload.name : null;
      state.category = action.payload.category ? action.payload.category : null;
      state.section = action.payload.section ? action.payload.section : null;
      state.status = action.payload.status ? action.payload.status : null;
      state.search = action.payload.search ? action.payload.search : null;
      state.page = action.payload.page ? action.payload.page : null;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice;