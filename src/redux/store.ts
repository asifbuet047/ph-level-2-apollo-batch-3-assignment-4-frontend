import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/products/productsApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(productsApi.middleware),
});

export default store;
