import { motion } from "framer-motion";
import { Card } from "antd";

function DeleteProductButtonComponent() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
      <Card>
        <p className="text-center font-bold text-xl">Delete product</p>
      </Card>
    </motion.div>
  );
}

export default DeleteProductButtonComponent;
