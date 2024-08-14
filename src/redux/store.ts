import { configureStore } from "@reduxjs/toolkit";
import { allApiEndPoints } from "./features/products/allApiEndpoints";
import { productsReducer } from "./features/products/productsSlice";
import { filterReducer } from "./features/products/filterSlice";
import { searchReducer } from "./features/products/searchSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    search: searchReducer,
    [allApiEndPoints.reducerPath]: allApiEndPoints.reducer,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(allApiEndPoints.middleware),
});

export default store;
