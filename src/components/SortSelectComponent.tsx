import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import  { useState } from "react";
import { TProduct } from "../types/AllTypes";
import { useAppDispatch } from "../redux/hooks";
import {
  removeAllProducts,
  updateProducts,
} from "../redux/features/productsSlice";

function SortSelectComponent({ products }: { products: TProduct[] }) {
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

  if (allProducts?.length > 0) {
    return (
      <div>
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
  } else {
    return (
      <div>
        <FormControl disabled fullWidth>
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
}

export default SortSelectComponent;
