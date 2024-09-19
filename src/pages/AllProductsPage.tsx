import { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/productsSlice";
import { TFilterData, TProduct } from "../types/AllTypes";
import { InputAdornment, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ProductFilterPanelComponent from "../components/ProductFilterPanelComponent";
import AllProductsComponent from "../components/AllProductsComponent";
import { updateSearch } from "../redux/features/searchSlice";
import SortSelectComponent from "../components/SortSelectComponent";
import { useGetAllProductsQuery } from "../redux/api/allApiEndpoints";

function AllProductsPage() {
  const [width, setWidth] = useState(0);
  const refForWidth = useRef(null);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { data, isFetching, isSuccess } = useGetAllProductsQuery([], {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });
  const allProducts: TProduct[] = data?.data as TProduct[];

  useEffect(() => {
    setWidth(refForWidth.current.offsetWidth);
    if (isSuccess) {
      dispatch(storeAllProducts(data.data as TProduct[]));
    }
  }, []);

  const onSearchCloseIconClick = () => {
    setSearch("");
    dispatch(updateSearch(""));
  };

  return (
    <div className="flex flex-col items-center p-4" ref={refForWidth}>
      <div className="flex flex-row justify-between rounded-md w-full border-2 mt-2 mb-2">
        <div className="flex flex-row justify-start items-center p-2 w-1/2">
          <Typography className="text-2xl font-bold">
            All Sporty Goods
          </Typography>
          {isSuccess && (
            <Typography className="text-xl text-slate-400">
              ({data.data.length.toString()} products found)
            </Typography>
          )}
        </div>
        <div className="flex flex-row justify-between items-center p-2 w-1/2">
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
      <div>{isFetching && <BarLoader width={width}></BarLoader>}</div>
      <div className="flex flex-row justify-around">
        {isSuccess && (
          <>
            <ProductFilterPanelComponent
              products={allProducts}
            ></ProductFilterPanelComponent>
            <AllProductsComponent></AllProductsComponent>
          </>
        )}
      </div>
    </div>
  );
}

export default AllProductsPage;
