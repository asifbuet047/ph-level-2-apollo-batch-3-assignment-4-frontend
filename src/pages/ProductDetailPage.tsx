import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image } from "antd";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { BarLoader } from "react-spinners";
import { useGetProductQuery } from "../redux/api/allApiEndpoints";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/features/cartSlice";

function ProductDetailPage() {
  const { productId } = useParams();
  const id = productId as string;
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const refForWidth = useRef(null);
  const {
    data: product,
    isSuccess,
    isFetching,
  } = useGetProductQuery(productId);

  const onIncreaseQuantity = () => {
    if (quantity < product?.data.quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Product stock limited");
    }
  };

  const onDecreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div>
      {isSuccess && (
        <div ref={refForWidth} className="flex flex-row justify-center">
          <div className="mr-6">
            <Image src={product.data.product_image_url} height={500}></Image>
          </div>
          <div className="flex flex-col justify-start pr-2">
            <h2 className="text-xl mt-2 mb-2">
              Availability:{product.data.quantity} in stock
            </h2>
            <h1 className="text-3xl mt-2 mb-2">{product.data.name}</h1>
            <h3 className="text-2xl mt-2 mb-2">${product.data.price}</h3>
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
              <Button
                className="bg-[#AF161B] text-white ml-6"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id,
                      name: product.data.name,
                      price: product.data.price,
                      quantity,
                    })
                  )
                }
              >
                ADD TO CART
              </Button>
            </div>
            <p className="text-xl mt-2 mb-2">{product.data.description}</p>
          </div>
        </div>
      )}

      <div>{isFetching && <BarLoader></BarLoader>}</div>
    </div>
  );
}

export default ProductDetailPage;
