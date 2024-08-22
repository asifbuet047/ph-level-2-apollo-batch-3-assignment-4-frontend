import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/products/productsSlice";
import { filterReducer } from "./features/products/filterSlice";
import { searchReducer } from "./features/products/searchSlice";
import { allApiEndPoints } from "./api/allApiEndpoints";
import { generalReducer } from "./features/generalSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filterReducer,
    search: searchReducer,
    general: generalReducer,
    [allApiEndPoints.reducerPath]: allApiEndPoints.reducer,
  },
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(allApiEndPoints.middleware),
});

export default store;
