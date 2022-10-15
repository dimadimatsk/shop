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
    resetFilters(state) {
      state.categoryId = 0;
      state.sortType = 3;
      state.currentPage = 1;
      state.searchValue = '';
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setSearchValue,
  setFilters,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
