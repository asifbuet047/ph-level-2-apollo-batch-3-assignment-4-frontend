import { Button } from "antd";
import {
  useAnimate,
  usePresence,
  motion,
  LayoutGroup,
  AnimatePresence,
  animate,
} from "framer-motion";
import { useEffect, useState } from "react";

import React from "react";

function Child({ data }) {
  return (
    <motion.div>
      <motion.svg
        width="100"
        height="100"
        key="box"
        strokeWidth={"30px"}
        initial={{ strokeWidth: 2 }}
        whileHover={{ rotate: 30 }}
        exit={{
          width: 0,
          height: 0,
          backgroundColor: "#000000",
          transition: { duration: 0.5 },
        }}
        transition={{ duration: 1, damping: 25 }}
      >
        <line x1="10" y1="20" x2="90" y2="20" stroke="black" stroke-width="2" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="black" stroke-width="2" />
        <line x1="10" y1="80" x2="90" y2="80" stroke="black" stroke-width="2" />
      </motion.svg>
    </motion.div>
  );
}

function HomePage() {
  const [state, setState] = useState(true);
  return (
    <div>
      <Button onClick={() => setState(false)}>Animate Item</Button>
      <AnimatePresence>
        {state && <Child data={"New line 1"} />}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
