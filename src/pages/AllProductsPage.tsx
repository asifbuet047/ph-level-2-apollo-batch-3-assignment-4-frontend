import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";

function AllProductsPage() {
  const { data, isFetching, isSuccess } = useGetAllProductsQuery(undefined);
  return (<div>
    {
       
    }
  </div>);
}

export default AllProductsPage;
