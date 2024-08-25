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
      if (state.items.find((cart) => cart.id === action.payload.id)) {
        const index = state.items.findIndex(
          (cart) => cart.id === action.payload.id
        );
        state.items[index].quantity =
          state.items[index].quantity + action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state: TCartState, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (product) => product.id != action.payload
      );
    },
    increaseQuantity: (state: TCartState, action: PayloadAction<string>) => {
      const current = state.items.find((each) => each.id === action.payload);
      if (current) {
        const { quantity: currentQuantity } = current;
        current.quantity = currentQuantity + 1;
      }
    },
    decreaseQuantity: (state: TCartState, action: PayloadAction<string>) => {
      const current = state.items.find((each) => each.id === action.payload);
      if (current) {
        const { quantity: currentQuantity } = current;
        current.quantity = currentQuantity - 1;
      }
    },
    clearCart: (state: TCartState) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cart.actions;
export const cartReducer = cart.reducer;
