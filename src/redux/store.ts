import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./features/productsSlice";
import { filterReducer } from "./features/filterSlice";
import { searchReducer } from "./features/searchSlice";
import { allApiEndPoints } from "./api/allApiEndpoints";
import { generalReducer } from "./features/generalSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./features/cartSlice";

const persistConfiguratio = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const allReducers = combineReducers({
  products: productsReducer,
  filters: filterReducer,
  search: searchReducer,
  general: generalReducer,
  [allApiEndPoints.reducerPath]: allApiEndPoints.reducer,
  cart: cartReducer, //Persisted
});
const persistedReducer = persistReducer(persistConfiguratio, allReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares({ serializableCheck: false }).concat(
      allApiEndPoints.middleware
    ),
});

const persistor = persistStore(store);

export const ReduxStore = { store, persistor };
