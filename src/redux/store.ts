import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/products/productsApi";
import { productsReducer } from "./features/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(productsApi.middleware),
});

export default store;
