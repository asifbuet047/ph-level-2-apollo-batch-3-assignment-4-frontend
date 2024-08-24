import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartData, TCartState } from "../../types/AllTypes";

const initialState: TCartState = {
  items: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: TCartState, action: PayloadAction<TCartData>) => {
      return {
        items: [...state.items, action.payload],
      };
    },
    removeFromCart: (state: TCartState, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product.id != action.payload
      );
    },
    updateCart: (state: TCartState, action: PayloadAction<TCartData>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((each) => (each.id = id));
      if (item) {
        item.quantity = quantity + 1;
      }
    },
    clearCart: (state: TCartState) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
  cart.actions;
export const cartReducer = cart.reducer;
