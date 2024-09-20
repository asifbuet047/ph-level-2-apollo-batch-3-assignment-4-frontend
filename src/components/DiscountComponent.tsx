import { TDiscount } from "../types/AllTypes";
import { Button } from "antd";
import { motion } from "framer-motion";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import Percentage from "../assets/Percentage";

function DiscountComponent({ discount }) {
  const discountInfo = discount as TDiscount;
  const titles: string[] = discountInfo.title.split(" ");
  const navigate = useNavigate();

  const onBuyNowButtonClick = () => {
    navigate(`/details/${discountInfo.productId}`, {
      state: { discount: discountInfo.product_discount },
    });
  };

  return (
    <div className="bg-[url('sales_2.jpg')] bg-cover bg-center flex flex-col md:flex-row justify-between pt-2 pb-2 pl-2 pr-2 md:pl-4 md:pr-4 sm:rounded-sm md:rounded-md lg:rounded-lg">
      <div className="flex flex-col justify-evenly">
        <div className="mt-2 mb-2">
          <p className="text-4xl font-bold">{discountInfo.product_name}</p>
        </div>
        <motion.div
          animate={{ scale: 1.09 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className="p-4 inline-block mt-2 mb-2"
        >
          <div className="flex flex-row">
            <p className="text-5xl">{discountInfo.product_discount}</p>
            <Percentage />
            <p className="text-3xl ml-4 ">discount</p>
          </div>
        </motion.div>

        <div className="mt-2 mb-2 xs:hidden md:flex">
          <Button
            size="large"
            type="dashed"
            iconPosition="start"
            icon={<ShoppingCartOutlinedIcon />}
            className="w-1/2 font-bold"
            onClick={onBuyNowButtonClick}
          >
            Buy now
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {titles.map((each) => (
          <div>
            <p className="text-5xl font-extrabold pr-2">{each}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 mb-2 md:hidden">
        <Button
          size="large"
          type="dashed"
          iconPosition="start"
          icon={<ShoppingCartOutlinedIcon />}
          className="w-1/2 font-bold"
          onClick={onBuyNowButtonClick}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
}

export default DiscountComponent;
