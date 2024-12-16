//cartslices
import { createSlice, payLoadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload.item._id
      );

      // Kiểm tra xem giá trị quantity có hợp lệ không
      const quantityToAdd = Number(action.payload.quantity) || 1; // Nếu quantity không hợp lệ, mặc định là 1

      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + quantityToAdd;
      } else {
        state.items.push({ ...action.payload.item, quantity: quantityToAdd });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice;
