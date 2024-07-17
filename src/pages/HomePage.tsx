import { Button } from "antd";
import {
  useAnimate,
  usePresence,
  motion,
  LayoutGroup,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

import React from "react";

function Child({ data }) {
  return (
    <AnimatePresence>
      <motion.div
        key="box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: "-10" }}
        transition={{ duration: 1 }}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "red",
          marginTop: "10px",
        }}
      >
        Fade Out Box
      </motion.div>
    </AnimatePresence>
  );
}

function HomePage() {
  const [remove, setRemove] = useState(true);
  return (
    <div>
      <Button onClick={() => setRemove(!remove)}>Remove Item</Button>
      {remove ? <Child data={"New line 1"} /> : null}
    </div>
  );
}

export default HomePage;
