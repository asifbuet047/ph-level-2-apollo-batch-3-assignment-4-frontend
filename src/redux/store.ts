import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./features/products/productsApi";
import { productsReducer } from "./features/products/productsSlice";
import { filterReducer } from "./features/products/filterSlice";
import { searchReducer } from "./features/products/searchSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    search: searchReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(productsApi.middleware),
});

export default store;
