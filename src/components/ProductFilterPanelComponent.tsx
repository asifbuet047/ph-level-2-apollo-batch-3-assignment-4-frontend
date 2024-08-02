import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { TFilterData, TProduct } from "../types/AllTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { storeFilter } from "../redux/features/products/filterSlice";

function ProductFilterPanelComponent({ property, products }) {
  const filterState = useAppSelector((state) => state.filters.filters);
  const filterDispatch = useAppDispatch();
  console.log(filterState);
  const allProducts = products as TProduct[];
  let displayData: TFilterData[] = [];

  useEffect(() => {
    console.log(filterState);
  }, [filterState]);

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

  return (
    <div>
      {displayData &&
        displayData.map((each, index) => (
          <div key={index} className="flex flex-row justify-between m-2">
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
