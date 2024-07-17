import React from "react";
import { motion } from "framer-motion";
import { Card } from "antd";

function UpdateProductButton() {
  return (
    <motion.div whileHover={{ scaleX: 1.1 }} whileTap={{ scale: 1.1 }}>
      <Card>
        <p>Update product</p>
      </Card>
    </motion.div>
  );
}

export default UpdateProductButton;
