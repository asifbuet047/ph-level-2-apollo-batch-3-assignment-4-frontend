import React, { useState } from "react";
import { TDiscount, TProduct } from "../types/AllTypes";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Rating from "react-rating";
import { motion } from "framer-motion";
import { Button, Card, CardContent } from "@mui/material";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";

function FeaturedProductCardComponent({ product, discounts }) {
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
        <Card raised={true} className="w-full h-full">
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <CardContent>
              <motion.div animate={{ scale: isHovered ? 0.8 : 1 }}>
                <div className="relative">
                  <Image
                    src={productDetails.product_image_url}
                    title={productDetails.name}
                  ></Image>
                  <p className="absolute bg-red-300 right-0 top-0 z-10 pl-1 pr-1">
                    {discountedProduct.product_discount}% off
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-row justify-center"
                animate={{ scale: isHovered ? 1.2 : 1 }}
              >
                <Rating
                  readonly
                  initialRating={productDetails.rating}
                  emptySymbol={<StarBorderOutlinedIcon />}
                  fullSymbol={<StarOutlinedIcon />}
                  stop={10}
                  className="pt-2 pb-2 w-56"
                ></Rating>
              </motion.div>
              <motion.div animate={{ y: isHovered ? -15 : 0 }}>
                <p className="pt-2 pb-2 font-bold text-2xl">
                  {productDetails.name}
                </p>
                <p className="pt-2 pb-2">{productDetails.category}</p>
                <p className="pt-2 pb-2 font-bold text-xl">
                  {productDetails.price}
                </p>
              </motion.div>
              <div className="flex flex-row justify-center">
                <Button
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
        <Card raised={true} className="w-full h-full">
          <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <CardContent>
              <motion.div animate={{ scale: isHovered ? 0.8 : 1 }}>
                <Image
                  src={productDetails.product_image_url}
                  title={productDetails.name}
                ></Image>
              </motion.div>
              <motion.div
                className="flex flex-row justify-center"
                animate={{ scale: isHovered ? 1.2 : 1 }}
              >
                <Rating
                  readonly
                  initialRating={productDetails.rating}
                  emptySymbol={<StarBorderOutlinedIcon />}
                  fullSymbol={<StarOutlinedIcon />}
                  stop={10}
                  className="pt-2 pb-2 w-56"
                ></Rating>
              </motion.div>
              <motion.div animate={{ y: isHovered ? -15 : 0 }}>
                <p className="pt-2 pb-2 font-bold text-2xl">
                  {productDetails.name}
                </p>
                <p className="pt-2 pb-2">{productDetails.category}</p>
                <p className="pt-2 pb-2 font-bold text-xl">
                  {productDetails.price}
                </p>
              </motion.div>
              <div className="flex flex-row justify-center">
                <Button
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
