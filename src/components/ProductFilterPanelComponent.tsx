import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TProduct } from "../types/AllTypes";

function ProductFilterPanelComponent({ property, products }) {
  const [data, setData] = useState();
  const allProducts = products as TProduct[];
  let displayData: {
    name: string;
    quantity: number;
  }[] = [];

  switch (property) {
    case "brand":
      displayData = allProducts
        .map((product) => product.brand)
        .filter((name, index, array) => {
          return array.indexOf(name) === index;
        })
        .map((name) => {
          const quantity = allProducts.filter((product) =>
            product.brand.includes(name)
          ).length;
          return {
            name,
            quantity,
          };
        });
      break;
    case "category":
      displayData = allProducts
        .map((product) => product.category)
        .filter((name, index, array) => {
          return array.indexOf(name) === index;
        })
        .map((name) => {
          const quantity = allProducts.filter((product) =>
            product.category.includes(name)
          ).length;
          return {
            name,
            quantity,
          };
        });
      break;

    default:
      break;
  }

  console.log(displayData);

  return (
    <div>
      {displayData &&
        displayData.map((each) => (
          <div className="flex flex-row justify-between m-2">
            <FormControlLabel
              control={<Checkbox />}
              label={each.name}
            ></FormControlLabel>
            <p className=" pl-2 pr-2 border-2 rounded-md text-center">
              {each.quantity}
            </p>
          </div>
        ))}
    </div>
  );
}

ProductFilterPanelComponent.propTypes = {
  property: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductFilterPanelComponent;
