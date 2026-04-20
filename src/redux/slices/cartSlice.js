import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (!existingItem) {
        state.items.push({
          ...product,
          count: 1,
        });
      }
    },

    increaseCount: (state, action) => {
      const id = action.payload;
      const item = state.items.find((product) => product.id === id);

      if (item) {
        item.count += 1;
      }
    },

    decreaseCount: (state, action) => {
      const id = action.payload;
      const item = state.items.find((product) => product.id === id);

      if (item && item.count > 1) {
        item.count -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseCount,
  decreaseCount,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;