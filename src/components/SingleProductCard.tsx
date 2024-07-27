import { TProduct } from "../types/AllTypes";

import { motion } from "framer-motion";
import { Button, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SingleProductCard({ product }) {
  const navigation = useNavigate();
  const temp: Partial<TProduct> = { ...product };

  const gotoProductDetailPage = () => {
    navigation(`/details/${temp._id}`);
  };

  return (
    <div
      className="border-2 shadow-md rounded-md flex flex-col justify-between items-center p-2"
      onClick={gotoProductDetailPage}
    >
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 1.05 }}>
        <Image
          src={temp.product_image_url}
          alt={temp.name}
          preview={false}
          className="w-full h-full"
        ></Image>
      </motion.div>

      <div className="items-center text-center">
        <motion.h1>{temp.name}</motion.h1>
        <p className="p-2">{temp.brand}</p>
        <p className="p-2">{temp.price}</p>
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

export default SingleProductCard;
