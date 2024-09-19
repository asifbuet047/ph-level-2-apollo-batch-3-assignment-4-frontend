import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialState, TProduct } from "../../types/AllTypes";

const initialState: TInitialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeAllProducts: (state, action: PayloadAction<TProduct[]>) => {
      state.products = action.payload;
    },
    storeSingleProduct: (state, action: PayloadAction<TProduct>) => {
      state.products.push(action.payload);
    },
    updateProducts: (state, action: PayloadAction<TProduct[]>) => {
      state.products.push(...action.payload);
    },
    updateSingleProduct: (state, action: PayloadAction<TProduct>) => {
      const index = state.products.findIndex(
        (value) => value._id == action.payload._id
      );
      if (index >= 0) {
        state.products[index] = action.payload;
      }
    },
    removeSingleProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id != action.payload
      );
    },
    removeAllProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  storeAllProducts,
  storeSingleProduct,
  removeSingleProduct,
  updateSingleProduct,
  updateProducts,
  removeAllProducts,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
