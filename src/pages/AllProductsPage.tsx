import React, { useEffect, useRef, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";
import SingleProductCard from "../components/SingleProductCard";
import { useAppDispatch } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/products/productsSlice";
import { TProduct } from "../types/AllTypes";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function AllProductsPage() {
  const dispatch = useAppDispatch();
  const { control, register, setValue } = useForm();
  const searchWatch = useWatch({ control, name: "search" });
  const { data, isFetching, isSuccess } = useGetAllProductsQuery([], {});

  useEffect(() => {
    if (isSuccess) {
      dispatch(storeAllProducts(data.data as TProduct[]));
    }
    console.log(searchWatch);
  }, [isSuccess, searchWatch]); // use useEffect hook with isSuccess dependency to ensure whenever rtk query is completed then all data will stored in local state and ensure re render

  const onSearchCloseIconClick = () => {
    setValue("search", "");
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
            {...register("search")}
          ></TextField>
        </div>
      </div>
      <div className="grid lg:grid-cols-8 md:grid-cols-2 gap-2">
        {isSuccess &&
          data.data.map((product, index) => (
            <SingleProductCard
              product={product}
              key={index}
            ></SingleProductCard>
          ))}
      </div>
      <div>{isFetching && <BarLoader></BarLoader>}</div>
    </div>
  );
}

export default AllProductsPage;
