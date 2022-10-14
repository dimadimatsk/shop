import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortType: 3,
  currentPage: 1,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
