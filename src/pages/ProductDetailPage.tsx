import { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Image } from "antd";
import { MinusSquareOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/features/cartSlice";
import { TCartData, TProduct } from "../types/AllTypes";
import { updateCheckoutButtonState } from "../redux/features/generalSlice";
import { TbCurrencyTaka } from "react-icons/tb";

function ProductDetailPage() {
  const { productId } = useParams();
  const state = useLocation();
  const id = productId as string;
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const refForWidth = useRef(null);
  const allProducts = useAppSelector(
    (state) => state.products.products
  ) as TProduct[];
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];

  const currentProduct = allProducts.find(
    (product) => product._id === productId
  ) as TProduct;

  const currentCart = cart.find((cart) => cart.id == productId) as TCartData;

  const onIncreaseQuantity = () => {
    if (quantity < currentProduct.quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Product stock limited");
    }
  };

  const onDecreaseQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Minimum 1 quantity");
    }
  };

  return (
    <div>
      {
        <div
          ref={refForWidth}
          className="flex flex-col md:flex-row justify-center px-2 bg-[#C0F5FA]"
        >
          <div className="">
            <Image src={currentProduct.product_image_url} height={500}></Image>
          </div>
          <div className="flex flex-col justify-start pr-2">
            <h2 className="text-xl mt-2 mb-2">
              Availability:{" "}
              <span className="font-bold">{currentProduct.quantity}</span> in
              stock
            </h2>
            <h1 className="text-3xl mt-2 mb-2 font-bold">
              {currentProduct.name}
            </h1>
            {state.state?.discount ? (
              <div className="flex flex-row  justify-start">
                <h3 className="text-2xl mt-2 mb-2">
                  Now{" "}
                  <span className="font-bold">{state.state?.discount}% </span>
                  discount current price
                </h3>
                <div className="flex flex-row justify-center items-center">
                  <span className="font-bold">
                    {currentProduct.price -
                      (currentProduct.price * state.state?.discount) / 100}
                  </span>
                  <TbCurrencyTaka />
                </div>
              </div>
            ) : (
              <h3 className="text-2xl mt-2 mb-2">${currentProduct.price}</h3>
            )}
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
              {state.state?.discount ? (
                <Button
                  className="bg-[#AF161B] text-white ml-6"
                  onClick={() => {
                    if (
                      currentCart.quantity + quantity <=
                      currentProduct.quantity
                    ) {
                      dispatch(
                        addToCart({
                          id,
                          name: currentProduct.name,
                          price:
                            currentProduct.price -
                            (currentProduct.price * state.state.discount) / 100,
                          quantity,
                        })
                      );
                      dispatch(updateCheckoutButtonState(true));
                      toast.success(
                        `${currentProduct.name} is successfully added into cart`
                      );
                    } else {
                      toast.warn(
                        `${currentProduct.name} is already added in Your cart and this additional added quantity exceed stock`
                      );
                    }
                  }}
                >
                  ADD TO CART
                </Button>
              ) : (
                <Button
                  className="bg-[#AF161B] text-white ml-6"
                  onClick={() => {
                    if (
                      currentCart.quantity + quantity <=
                      currentProduct.quantity
                    ) {
                      dispatch(
                        addToCart({
                          id,
                          name: currentProduct.name,
                          price: currentProduct.price,
                          quantity,
                        })
                      );
                      dispatch(updateCheckoutButtonState(true));
                      toast.success(
                        `${currentProduct.name} is successfully added into cart`
                      );
                    } else {
                      toast.warn(
                        `${currentProduct.name} is already added in Your cart and this additional added quantity exceed stock`
                      );
                    }
                  }}
                >
                  ADD TO CART
                </Button>
              )}
            </div>
            <p className="text-xl mt-2 mb-2">{currentProduct.description}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default ProductDetailPage;
