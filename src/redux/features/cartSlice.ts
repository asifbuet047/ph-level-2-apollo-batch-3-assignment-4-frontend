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
    updateCart: (state: TCartState, action: PayloadAction<TCartData>) => {
      const temp = [...state.items];
      const index = temp.findIndex((each) => each.id === action.payload.id);
      temp[index] = action.payload;
      state.items = temp;
    },
    clearCart: (state: TCartState) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
  cart.actions;
export const cartReducer = cart.reducer;
