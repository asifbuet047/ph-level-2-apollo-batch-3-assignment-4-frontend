import React from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { TProduct } from "../types/AllTypes";

import { motion } from "framer-motion";

function SingleProductCard({ product }) {
  const temp: Partial<TProduct> = { ...product };
  console.log(temp);
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.3 }}
      className="card bg-base-100 w-96 shadow-xl"
    >
      <figure className="px-10 pt-10">
        <img
          src={temp.product_image_url}
          alt={temp.name}
          className="rounded-xl w-32 h-32"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{temp.name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleProductCard;
