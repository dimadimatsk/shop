import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.countCart++;
      } else {
        state.items.push({ ...action.payload, countCart: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.countCart + sum, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.countCart, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.countCart--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.countCart + sum, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.countCart, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.countCart + sum, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.countCart, 0);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { plusItem, minusItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
