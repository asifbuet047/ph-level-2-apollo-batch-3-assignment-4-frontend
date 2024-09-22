import { useState } from "react";
import { TDiscount, TProduct } from "../types/AllTypes";
import Rating from "react-rating";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "@mui/material";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

function FeaturedProductCardComponent({
  product,
  discounts,
}: {
  product: TProduct;
  discounts: TDiscount[];
}) {
  const productDetails: TProduct = product as TProduct;
  const allDiscounts = discounts as TDiscount[];
  const discountedProduct = allDiscounts.find(
    (name) => name.product_name === productDetails.name
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  if (discountedProduct) {
    return (
      <div>
        <Card raised={true} sx={{ backgroundColor: "#55E4F1" }}>
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <CardContent>
              <motion.div animate={{ scale: isHovered ? 0.8 : 1 }}>
                <div className="relative">
                  <Image
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    src={productDetails.product_image_url}
                    title={productDetails.name}
                  ></Image>
                  <p className="absolute bg-red-500 right-0 top-0 z-10 pl-1 pr-1">
                    {discountedProduct.product_discount}% off
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-row justify-center"
                animate={{ scale: isHovered ? 1.06 : 1 }}
              >
                {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Rating
                  readonly
                  initialRating={productDetails.rating}
                  emptySymbol={<FaRegStar className="w-3 h-3" />}
                  fullSymbol={<FaStar className="w-3 h-3" />}
                  stop={10}
                ></Rating>
              </motion.div>
              <motion.div
                animate={{ y: isHovered ? -15 : 0 }}
                className="flex flex-col justify-evenly"
              >
                <p className="pt-1 pb-1 font-bold text-2xl">
                  {productDetails.name}
                </p>
                <p className="pt-1 pb-1">{productDetails.category}</p>
                <div className="flex flex-row justify-start items-center">
                  <span className="pt-1 pb-1 font-bold text-xl">
                    {productDetails.price}
                  </span>
                  <TbCurrencyTaka className="inline" />
                </div>
              </motion.div>
              <div className="flex flex-row justify-center">
                <Button
                  sx={{ color: "#000000" }}
                  variant="outlined"
                  onClick={() =>
                    navigate(`/details/${productDetails._id}`, {
                      state: { discount: discountedProduct.product_discount },
                    })
                  }
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </div>
    );
  } else {
    return (
      <div>
        <Card raised={true} sx={{ backgroundColor: "#55E4F1" }}>
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <CardContent>
              <motion.div animate={{ scale: isHovered ? 0.8 : 1 }}>
                <Image
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  src={productDetails.product_image_url}
                  title={productDetails.name}
                ></Image>
              </motion.div>
              <motion.div
                className="flex flex-row justify-center"
                animate={{ scale: isHovered ? 1.1 : 1 }}
              >
                {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Rating
                  readonly
                  initialRating={productDetails.rating}
                  emptySymbol={<FaRegStar className="w-3 h-3" />}
                  fullSymbol={<FaStar className="w-3 h-3" />}
                  stop={10}
                ></Rating>
              </motion.div>
              <motion.div animate={{ y: isHovered ? -15 : 0 }}>
                <p className="pt-1 pb-1 font-bold text-2xl">
                  {productDetails.name}
                </p>
                <p className="pt-1 pb-1">{productDetails.category}</p>
                <div className="flex flex-row justify-start items-center">
                  <span className="pt-1 pb-1 font-bold text-xl">
                    {productDetails.price}
                  </span>
                  <TbCurrencyTaka className="inline" />
                </div>
              </motion.div>
              <div className="flex flex-row justify-center">
                <Button
                  sx={{ color: "#000000" }}
                  variant="outlined"
                  onClick={() => navigate(`/details/${productDetails._id}`)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </div>
    );
  }
}

export default FeaturedProductCardComponent;
