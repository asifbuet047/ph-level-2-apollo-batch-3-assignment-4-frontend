import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFilterData, TFilterState } from "../../../types/AllTypes";

const initialState: TFilterState = {
  filters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<TFilterData>) => {
      const index = state.filters.findIndex(
        (each) =>
          each.filter_name == action.payload.filter_name &&
          each.filter_value == action.payload.filter_value
      );
      if (index >= 0) {
        state.filters[index].filter_checked = action.payload.filter_checked;
      } else {
        state.filters.push(action.payload);
      }
    },
    clearFilter: (state) => {
      state.filters = [];
    },
    storeFilter: (state, action: PayloadAction<TFilterData[]>) => {
      state.filters = action.payload;
    },
  },
});

export const { updateFilter, clearFilter, storeFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
