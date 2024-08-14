import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  clearFilter,
  updateFilter,
} from "../redux/features/products/filterSlice";
import {
  removeAllProducts,
  storeAllProducts,
  storeSingleProduct,
  updateProducts,
} from "../redux/features/products/productsSlice";
import { TFilterData, TProduct } from "../types/AllTypes";

function ProductFilterPanel({ products }) {
  const allProducts: TProduct[] = products as TProduct[];
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filters.filters);
  let activeFilters: TFilterData[] = [];

  const brandPanelData = allProducts
    .map((product) => product.brand)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((name) => {
      const quantity = allProducts.filter((product) =>
        product.brand.includes(name)
      ).length;
      return {
        filter_name: "brand",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: name,
      };
    });

  const categoryPanelData = allProducts
    .map((product) => product.category)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((name) => {
      const quantity = allProducts.filter((product) =>
        product.category.includes(name)
      ).length;
      return {
        filter_name: "category",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: name,
      };
    });

  useEffect(() => {
    activeFilters = filterState.filter((each) => each.filter_checked);
    if (activeFilters.length == 0) {
      dispatch(storeAllProducts(allProducts));
    } else {
      dispatch(removeAllProducts());
      activeFilters.map((each) => {
        switch (each.filter_name) {
          case "brand":
            dispatch(
              updateProducts(
                allProducts.filter((product) => {
                  if (product.brand == each.filter_value) {
                    return true;
                  } else {
                    return false;
                  }
                })
              )
            );
            break;
          case "category":
            dispatch(
              updateProducts(
                allProducts.filter((product) => {
                  if (product.category == each.filter_value) {
                    return true;
                  } else {
                    return false;
                  }
                })
              )
            );
            break;

          default:
            break;
        }
      });
    }
  });

  return (
    <motion.div className="flex flex-col justify-start border-2 border-red-600">
      <div className="flex flex-row justify-around items-center bg-[#72BF44]">
        <Typography className="text-white" variant="h5" fontSize={20}>
          Filter By
        </Typography>
        <Typography
          onClick={() => {
            dispatch(clearFilter());
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
          <div>
            {brandPanelData.map((each, index) => (
              <div key={index} className="flex flex-row justify-between m-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        each.filter_checked = event.target.checked;
                        dispatch(updateFilter(each));
                      }}
                    />
                  }
                  label={each.filter_value}
                ></FormControlLabel>
                <p className="pl-2 pr-2 border-2 rounded-md text-center">
                  {each.filter_quantity}
                </p>
              </div>
            ))}
          </div>
        </Accordion>
        <Divider />
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
            Category
          </AccordionSummary>
          <div>
            {categoryPanelData.map((each, index) => (
              <div key={index} className="flex flex-row justify-between m-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => {
                        each.filter_checked = event.target.checked;
                        dispatch(updateFilter(each));
                      }}
                    />
                  }
                  label={each.filter_value}
                ></FormControlLabel>
                <p className="pl-2 pr-2 border-2 rounded-md text-center">
                  {each.filter_quantity}
                </p>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </motion.div>
  );
}

export default ProductFilterPanel;
