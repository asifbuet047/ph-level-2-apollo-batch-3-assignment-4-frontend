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
      state.items.push(action.payload);
    },
    removeFromCart: (state: TCartState, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product.id != action.payload
      );
    },
    clearCart: (state: TCartState) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cart.actions;
export const cartReducer = cart.reducer;
