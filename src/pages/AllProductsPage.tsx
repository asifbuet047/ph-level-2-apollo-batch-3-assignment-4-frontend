import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";
import { useAppDispatch } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/products/productsSlice";
import { TProduct } from "../types/AllTypes";
import { InputAdornment, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ProductFilterPanel from "../components/ProductFilterPanel";
import AllProducts from "../components/AllProducts";
import { updateSearch } from "../redux/features/products/searchSlice";

function AllProductsPage() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { data, isFetching, isSuccess } = useGetAllProductsQuery([], {});

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(storeAllProducts(data.data as TProduct[]));
    }
  }, [isSuccess, data]);

  const onSearchCloseIconClick = () => {
    setSearch("");
    dispatch(updateSearch(""));
  };

  return (
    <div className="flex flex-col items-center border-2 border-red-800 p-4">
      <div className="flex flex-row justify-between rounded-md border-2 w-full mt-2 mb-2">
        <div className="flex flex-row justify-start items-center p-2">
          <Typography className="text-2xl font-bold">
            All Sporty Goods
          </Typography>
          {isSuccess && (
            <Typography className="text-xl text-slate-400">
              ({data.data.length.toString()} products found)
            </Typography>
          )}
        </div>
        <div className="flex flex-row justify-start items-center p-2">
          <TextField
            label="Search Product"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <div onClick={onSearchCloseIconClick}>
                    <CloseRoundedIcon />
                  </div>
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              dispatch(updateSearch(search));
            }}
          ></TextField>
        </div>
      </div>
      <div className="flex flex-row justify-around">
        {isSuccess && (
          <>
            <ProductFilterPanel products={data.data}></ProductFilterPanel>{" "}
            <AllProducts></AllProducts>
          </>
        )}
      </div>
      <div>{isFetching && <BarLoader></BarLoader>}</div>
    </div>
  );
}

export default AllProductsPage;
