import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/products/productsApi";
import { productsReducer } from "./features/products/productsSlice";
import { filterReducer } from "./features/products/filterSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(productsApi.middleware),
});

export default store;
