import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartData, TCartState } from "../../types/AllTypes";

const initialState: TCartState = {
  cart: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: TCartState, action: PayloadAction<TCartData>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state: TCartState, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((product) => product.id != action.payload);
    },
    clearCart: (state: TCartState) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cart.actions;
export const cartReducer = cart.reducer;
