import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/products/productsSlice";
import { TProduct } from "../types/AllTypes";
import { InputAdornment, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ProductFilterPanelComponent from "../components/ProductFilterPanelComponent";
import AllProductsComponent from "../components/AllProductsComponent";
import { updateSearch } from "../redux/features/products/searchSlice";
import SortSelectComponent from "../components/SortSelectComponent";
import { useGetAllProductsQuery } from "../redux/api/allApiEndpoints";

function AllProductsPage() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { data, isFetching, isSuccess } = useGetAllProductsQuery([], {});
  const allProducts: TProduct[] = data?.data as TProduct[];
  const filterState = useAppSelector((state) => state.filters.filters);
  console.log("PArent rendered");

  useEffect(() => {
    if (isSuccess && data) {
      if (filterState.length == 0) {
        dispatch(storeAllProducts(data.data as TProduct[]));
      }
    }
  }, [isSuccess]);

  const onSearchCloseIconClick = () => {
    setSearch("");
    dispatch(updateSearch(""));
  };

  return (
    <div className="flex flex-col items-center p-4">
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
          <SortSelectComponent products={allProducts} />
          <TextField
            className="w-full"
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
            <ProductFilterPanelComponent
              products={allProducts}
            ></ProductFilterPanelComponent>{" "}
            <AllProductsComponent></AllProductsComponent>
          </>
        )}
      </div>
      <div>{isFetching && <BarLoader></BarLoader>}</div>
    </div>
  );
}

export default AllProductsPage;
