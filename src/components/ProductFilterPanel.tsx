import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ProductFilterPanelComponent from "./ProductFilterPanelComponent";
import { clearFilter } from "../redux/features/products/filterSlice";

function ProductFilterPanel() {
  const allProducts = useAppSelector((state) => state.products.products);
  const filterDispatch = useAppDispatch();

  useEffect(() => {}, [allProducts]);

  return (
    <motion.div className="flex flex-col justify-start">
      <div className="flex flex-row justify-around items-center bg-[#72BF44]">
        <Typography className="text-white" variant="h5" fontSize={20}>
          Filter By
        </Typography>
        <Typography
          onClick={() => {
            filterDispatch(clearFilter());
          }}
          className="text-white"
          variant="h6"
          fontSize={15}
        >
          Reset
        </Typography>
      </div>
      <Divider />
      <div>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
            Brand
          </AccordionSummary>
          <ProductFilterPanelComponent
            property="brand"
            products={allProducts}
          ></ProductFilterPanelComponent>
        </Accordion>
        <Divider />
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
            Category
          </AccordionSummary>
          <ProductFilterPanelComponent
            property="category"
            products={allProducts}
          ></ProductFilterPanelComponent>
        </Accordion>
      </div>
    </motion.div>
  );
}

export default ProductFilterPanel;
