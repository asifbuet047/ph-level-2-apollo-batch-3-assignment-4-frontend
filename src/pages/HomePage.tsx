import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { date } from "zod";
import { BarLoader } from "react-spinners";

const { Meta } = Card;

function HomePage() {
  const {
    data: products,
    isFetching,
    isSuccess,
  } = useGetAllProductsQuery(undefined);
  console.log(products);
  return (
    <div className="h-screen">
      <header className="h-1/3">Header</header>
      <body className="border-red-500 border-2">
        {isSuccess &&
          products.data.map((product) => (
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>Rating: {product.rating}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        {isFetching && <BarLoader></BarLoader>}
      </body>
      <footer>Footer</footer>
    </div>
  );
}

export default HomePage;
