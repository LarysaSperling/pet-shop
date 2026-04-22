import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cartItems";

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Load error:", e);
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Save error:", e);
  }
};

const initialState = {
  items: loadFromStorage(), 
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

      saveToStorage(state.items);
    },

    increaseCount: (state, action) => {
      const id = action.payload;
      const item = state.items.find((product) => product.id === id);

      if (item) {
        item.count += 1;
      }

      saveToStorage(state.items);
    },

    decreaseCount: (state, action) => {
      const id = action.payload;
      const item = state.items.find((product) => product.id === id);

      if (item && item.count > 1) {
        item.count -= 1;
      }

      saveToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      saveToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      saveToStorage(state.items);
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