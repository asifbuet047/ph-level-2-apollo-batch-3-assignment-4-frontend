import React from "react";
import { motion } from "framer-motion";
import { Card } from "antd";

function DeleteProductButton() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
      <Card>
        <p className="text-center">Delete product</p>
      </Card>
    </motion.div>
  );
}

export default DeleteProductButton;
