import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";
import SingleProductCard from "../components/SingleProductCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/products/productsSlice";
import { date } from "zod";
import { TProduct } from "../types/AllTypes";

function AllProductsPage() {
  const dispatch = useAppDispatch();
  const { data, isFetching, isSuccess } = useGetAllProductsQuery([],{

  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(storeAllProducts(data.data as TProduct[]));
    }
  }, [isSuccess]); // use useEffect hook with isSuccess dependency to ensure whenever rtk query is completed then all data will stored in local state and ensure re render

  return (
    <div className="flex flex-col items-center">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
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
