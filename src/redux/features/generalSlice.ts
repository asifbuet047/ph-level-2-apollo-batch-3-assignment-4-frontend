import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGeneralState } from "../../types/AllTypes";

const initialState: TGeneralState = {
  general: {
    internet: true,
    checkoutButton: true,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    updateInternetState: (
      state: TGeneralState,
      action: PayloadAction<boolean>
    ) => {
      state.general.internet = action.payload;
    },
    updateCheckoutButtonState: (
      state: TGeneralState,
      action: PayloadAction<boolean>
    ) => {
      state.general.checkoutButton = action.payload;
    },
  },
});

export const { updateInternetState, updateCheckoutButtonState } =
  generalSlice.actions;

export const generalReducer = generalSlice.reducer;
