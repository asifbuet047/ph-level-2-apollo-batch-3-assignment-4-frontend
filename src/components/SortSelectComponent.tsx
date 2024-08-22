import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { TProduct } from "../types/AllTypes";
import { useAppDispatch } from "../redux/hooks";
import {
  removeAllProducts,
  updateProducts,
} from "../redux/features/products/productsSlice";

function SortSelectComponent({ products }) {
  const allProducts: TProduct[] = products as TProduct[];
  const [sort, setSort] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSortHandle = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    dispatch(removeAllProducts());
    if (event.target.value == "10") {
      dispatch(updateProducts([...allProducts].sort()));
    }
    if (event.target.value == "11") {
      dispatch(
        updateProducts([...allProducts].sort((a, b) => a.price - b.price))
      );
    }
    if (event.target.value == "12") {
      dispatch(
        updateProducts([...allProducts].sort((a, b) => b.price - a.price))
      );
    }
  };

  return (
    <div className="w-full">
      <FormControl fullWidth>
        <InputLabel id="sortId">Sort</InputLabel>
        <Select
          labelId="sortId"
          value={sort}
          label="Sort"
          onChange={onSortHandle}
        >
          <MenuItem value={10}>By Brand</MenuItem>
          <MenuItem value={11}>Low to High (Price)</MenuItem>
          <MenuItem value={12}>High to Low (Price)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortSelectComponent;
