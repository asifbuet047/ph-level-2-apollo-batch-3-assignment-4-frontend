import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFilterData, TFilterState } from "../../../types/AllTypes";

const initialState: TFilterState = {
  filters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    storeFilter: (state, action: PayloadAction<TFilterData>) => {
      state.filters.push(action.payload);
    },
    clearFilter: (state) => {
      state.filters = [];
    },
  },
});

export const { storeFilter, clearFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
