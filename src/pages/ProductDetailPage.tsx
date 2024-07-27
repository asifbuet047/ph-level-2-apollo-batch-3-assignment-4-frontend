import React, { useEffect, useRef, useState } from "react";
import { TProduct } from "../types/AllTypes";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Button, Image } from "antd";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useResize } from "../utils/customHooks";

function ProductDetailPage() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const refForWidth = useRef(null);
  const appState = useAppSelector((state) => state.products.products);
  const product = appState.filter((current) => current._id == productId);

  const onIncreaseQuantity = () => {
    if (quantity < product[0].quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Product stock limited");
    }
  };

  const onDecreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    console.log(
      `Width: ${refForWidth.current.offsetWidth} height: ${refForWidth.current.offsetHeight}`
    );
  });
  return (
    <div ref={refForWidth} className="flex flex-row justify-center">
      <div className="mr-6">
        <Image src={product[0].product_image_url} height={500}></Image>
      </div>
      <div className="flex flex-col justify-start pr-2">
        <h2 className="text-xl mt-2 mb-2">
          Availability:{product[0].quantity} in stock
        </h2>
        <h1 className="text-3xl mt-2 mb-2">{product[0].name}</h1>
        <h3 className="text-2xl mt-2 mb-2">${product[0].price}</h3>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-between items-center flex-grow bg-[#F7F8FA]">
            <MinusSquareOutlined
              style={{ fontSize: "29px", color: "#000000" }}
              onClick={onDecreaseQuantity}
            ></MinusSquareOutlined>
            <p>{quantity}</p>
            <PlusSquareOutlined
              onClick={onIncreaseQuantity}
              style={{ fontSize: "29px", color: "#000000" }}
            ></PlusSquareOutlined>
          </div>
          <Button className="bg-[#AF161B] text-white ml-6">ADD TO CART</Button>
        </div>
        <p className="text-xl mt-2 mb-2">{product[0].description}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
