import { motion } from "framer-motion";
import { Card } from "antd";

function AddProductButtonComponent() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.06 }}>
      <Card>
        <p className="text-center font-bold text-xl">Add product</p>
      </Card>
    </motion.div>
  );
}

export default AddProductButtonComponent;
