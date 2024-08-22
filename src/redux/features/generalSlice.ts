import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGeneralState } from "../../types/AllTypes";

const initialState: TGeneralState = {
  general: {
    internet: true,
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
  },
});

export const { updateInternetState } = generalSlice.actions;

export const generalReducer = generalSlice.reducer;
