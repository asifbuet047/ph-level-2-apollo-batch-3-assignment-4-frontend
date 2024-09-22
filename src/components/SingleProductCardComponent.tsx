import { TDiscount, TProduct } from "../types/AllTypes";
import { motion } from "framer-motion";
import { Button, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { TbCurrencyTaka } from "react-icons/tb";

function SingleProductCardComponent({
  product,
  discounts,
}: {
  product: TProduct;
  discounts: TDiscount[];
}) {
  const navigation = useNavigate();
  const temp: Partial<TProduct> = { ...product };
  const allDiscounts = discounts as TDiscount[];

  const myDiscount = allDiscounts?.find(
    (discount) => discount.productId === temp._id
  )?.product_discount;

  const gotoProductDetailPage = () => {
    navigation(`/details/${temp._id}`, { state: { discount: myDiscount } });
  };

  return (
    <div
      className="border-2 shadow-md rounded-md flex flex-col justify-between items-center p-2 bg-[#55E4F1] text-black"
      onClick={gotoProductDetailPage}
    >
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 1.05 }}>
        {myDiscount ? (
          <div className="relative">
            <Image
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              src={temp.product_image_url}
              alt={temp.name}
              preview={false}
            ></Image>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col justify-center items-center text-center">
        <motion.h1 animate={{ scale: 1.01 }}>{temp.name}</motion.h1>
        <p className="p-2">{temp.brand}</p>
        {myDiscount ? (
          <div className="flex flex-row justify-start items-center">
            <span className="pt-1 pb-1 font-bold text-xl">
              {temp.price ? temp.price - (temp.price * myDiscount) / 100 : 0}
            </span>
            <TbCurrencyTaka className="inline" />
          </div>
        ) : (
          <div className="flex flex-row justify-start items-center">
            <span className="pt-1 pb-1 font-bold text-xl">{temp.price}</span>
            <TbCurrencyTaka className="inline" />
          </div>
        )}
        {/* eslint-disable @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
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
