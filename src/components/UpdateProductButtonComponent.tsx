import { motion } from "framer-motion";
import { Card } from "antd";

function UpdateProductButtonComponent() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.05 }}>
      <Card>
        <p className="text-center font-bold text-xl">Update product</p>
      </Card>
    </motion.div>
  );
}

export default UpdateProductButtonComponent;
