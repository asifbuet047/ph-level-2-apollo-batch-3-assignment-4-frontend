import React from "react";
import { motion } from "framer-motion";
import { Card } from "antd";

function UpdateProductButton() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
      <Card>
        <p className="text-center">Update product</p>
      </Card>
    </motion.div>
  );
}

export default UpdateProductButton;
