import React from "react";
import { motion } from "framer-motion";
import { Card } from "antd";

function AddProductButton() {
  return (
    <motion.div whileHover={{ scaleX: 1.1 }} whileTap={{ scale: 1.1 }}>
      <Card>
        <p>Add product</p>
      </Card>
    </motion.div>
  );
}

export default AddProductButton;
