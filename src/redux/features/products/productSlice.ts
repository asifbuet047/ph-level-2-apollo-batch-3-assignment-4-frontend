import { createSlice } from "@reduxjs/toolkit";
import { TInitialState } from "../../../types/AllTypes";

const initialState: TInitialState = {
  value: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});
