import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";
import SingleProductCard from "../components/SingleProductCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { storeAllProducts } from "../redux/features/products/productsSlice";
import { date } from "zod";
import { TProduct } from "../types/AllTypes";

function AllProductsPage() {
  const appState = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();
  const {
    data: products,
    isFetching,
    isSuccess,
  } = useGetAllProductsQuery(undefined);

  const saveIntoLocalState = () => {};

  useEffect(() => {
    console.log(products.data);
    dispatch(storeAllProducts(products.data));
  }, [products]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
      {isSuccess &&
        products.data.map((product, index) => (
          <SingleProductCard product={product} key={index}></SingleProductCard>
        ))}
      {isFetching && <BarLoader></BarLoader>}
    </div>
  );
}

export default AllProductsPage;
