import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('item/fetchItemStatus', async (params) => {
  const { categoryQuery, sortByQuery, sortOrderQuery, currentPage, searchQuery } = params;
  const { data } = await axios.get(
    `https://63441194b9ab4243cade8143.mockapi.io/items?${categoryQuery}&sortBy=${sortByQuery}&order=${sortOrderQuery}&${
      searchQuery ? '' : `page=${currentPage}`
    }&limit=8${searchQuery}`,
  );

  return data;
});

const initialState = {
  items: [],
  totalCount: 20,
  status: 'loading',
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading';
      state.items = [];
      state.totalCount = 20;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = 'error';
      state.items = [];
      state.totalCount = 20;
    });
  },
});

export const { setItems } = itemSlice.actions;
export default itemSlice.reducer;
