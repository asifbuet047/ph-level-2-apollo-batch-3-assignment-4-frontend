import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";
import SingleProductCard from "../components/SingleProductCard";

function AllProductsPage() {
  const {
    data: products,
    isFetching,
    isSuccess,
  } = useGetAllProductsQuery(undefined);
  return (
    <div className="grid grid-cols-4 gap-2">
      {isSuccess &&
        products.data.map((product, index) => (
          <SingleProductCard product={product} key={index}></SingleProductCard>
        ))}
      {isFetching && <BarLoader></BarLoader>}
    </div>
  );
}

export default AllProductsPage;
