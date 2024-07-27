import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TInitialState, TProduct } from "../../../types/AllTypes";

const initialState: TInitialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeAllProducts: (state, action: PayloadAction<TProduct[]>) => {
      console.log(state.products);
      state.products = action.payload;
    },
    storeSingleProduct: (state, action: PayloadAction<TProduct>) => {
      state.products.push(action.payload);
    },
    removeSingleProduct: (state, action: PayloadAction<TProduct>) => {
      state.products = state.products.filter(
        (product) => product.name != action.payload.name
      );
    },
  },
});

export const { storeAllProducts, storeSingleProduct, removeSingleProduct } =
  productsSlice.actions;

export const productsReducer = productsSlice.reducer;
