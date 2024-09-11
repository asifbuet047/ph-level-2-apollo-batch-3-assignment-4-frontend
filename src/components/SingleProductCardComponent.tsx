import { TDiscount, TProduct } from "../types/AllTypes";
import { motion } from "framer-motion";
import { Button, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

function SingleProductCardComponent({ product, discounts }) {
  const navigation = useNavigate();
  const temp: Partial<TProduct> = { ...product };
  const allDiscounts = discounts as TDiscount[];

  const myDiscount = allDiscounts.find(
    (discount) => discount.productId === temp._id
  )?.product_discount;

  const gotoProductDetailPage = () => {
    navigation(`/details/${temp._id}`);
  };

  return (
    <div
      className="border-2 shadow-md rounded-md flex flex-col justify-between items-center p-2"
      onClick={gotoProductDetailPage}
    >
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 1.05 }}>
        {myDiscount ? (
          <div className="relative">
            <Image
              src={temp.product_image_url}
              alt={temp.name}
              preview={false}
            ></Image>
            <p className="absolute bg-red-300 right-0 top-0 z-10 pl-1 pr-1">
              {myDiscount}% off
            </p>
          </div>
        ) : (
          <div>
            <Image
              src={temp.product_image_url}
              alt={temp.name}
              preview={false}
            ></Image>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col justify-center items-center text-center">
        <motion.h1>{temp.name}</motion.h1>
        <p className="p-2">{temp.brand}</p>
        {myDiscount ? (
          <p className="p-2 font-bold">
            {temp.price - (temp.price * myDiscount) / 100}
          </p>
        ) : (
          <p className="p-2">{temp.price}</p>
        )}

        <Rating
          readonly
          initialRating={product.rating}
          emptySymbol={
            <StarBorderOutlinedIcon sx={{ width: "15px", height: "15px" }} />
          }
          fullSymbol={
            <StarOutlinedIcon sx={{ width: "15px", height: "15px" }} />
          }
          stop={10}
          className="pt-2 pb-2 w-56"
        ></Rating>
        <Button
          icon={<ShoppingCartOutlined />}
          iconPosition="start"
          type="default"
        >
          <p>ADD TO CART</p>
        </Button>
      </div>
    </div>
  );
}

export default SingleProductCardComponent;
