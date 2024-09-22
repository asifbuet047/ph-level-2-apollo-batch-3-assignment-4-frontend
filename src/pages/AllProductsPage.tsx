import { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/productsSlice";
import { TFilterData, TProduct } from "../types/AllTypes";
import { InputAdornment, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ProductFilterPanelComponent from "../components/ProductFilterPanelComponent";
import AllProductsComponent from "../components/AllProductsComponent";
import { clearSearch, updateSearch } from "../redux/features/searchSlice";
import SortSelectComponent from "../components/SortSelectComponent";
import { useGetAllProductsQuery } from "../redux/api/allApiEndpoints";
import no_internet from "../../public/no_internet.json";
import Lottie from "react-lottie";

function AllProductsPage() {
  const [width, setWidth] = useState(0);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, -1]);
  const refForWidth = useRef(null);
  const dispatch = useAppDispatch();
  const { data, isFetching, isSuccess, isError } = useGetAllProductsQuery([], {
    pollingInterval: 30000,
  });
  const allProducts: TProduct[] = data?.data as TProduct[];
  const filterState = useAppSelector(
    (state) => state.filters.filters
  ) as TFilterData[];
  const activeFilters: TFilterData[] = filterState.filter(
    (each) => each.filter_checked
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setWidth(refForWidth.current.offsetWidth);
  }, []);

  if (isSuccess) {
    if (activeFilters.length === 0) {
      if (priceRange[1] === -1) {
        dispatch(storeAllProducts(allProducts));
      }
    }
  }

  const handlePriceSlider = (values: [number, number]) => {
    setPriceRange(values);
  };
  const onSearchCloseIconClick = () => {
    setSearch("");
    dispatch(clearSearch());
  };

  return (
    <div
      className="flex flex-col justify-start items-center p-4 bg-[#C0F5FA]"
      ref={refForWidth}
    >
      <div className="flex flex-col md:flex-row justify-between rounded-md w-full border-4 mt-2 mb-2">
        <div className="flex flex-row justify-start items-center p-2 w-full md:w-1/2">
          <Typography className="text-2xl font-bold">
            All Sporty Goods
          </Typography>
          {isSuccess ? (
            <Typography className="text-xl text-slate-400">
              ({data.data.length.toString()} products found)
            </Typography>
          ) : (
            <Typography className="text-xl text-slate-400">
              (0 products found)
            </Typography>
          )}
        </div>
        <div className="flex flex-row justify-evenly py-2 w-full md:w-1/2">
          <div className="w-1/2 mx-1">
            <SortSelectComponent products={allProducts} />
          </div>
          <div className="w-1/2 mx-1">
            <TextField
              disabled={isError}
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
      </div>
      <div>{isFetching && <BarLoader width={width}></BarLoader>}</div>
      <div className="flex flex-row justify-around">
        {isSuccess && (
          <div className="flex flex-col md:flex-row">
            <div>
              <ProductFilterPanelComponent
                products={allProducts}
                onSendData={handlePriceSlider}
              ></ProductFilterPanelComponent>
            </div>
            <div>
              <AllProductsComponent></AllProductsComponent>
            </div>
          </div>
        )}
        {isError && (
          <div>
            <Lottie
              options={{
                animationData: no_internet,
                loop: true,
              }}
              width={width / 2}
              height={width / 3}
            ></Lottie>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProductsPage;
