import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { TFilterData, TProduct } from "../types/AllTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { updateFilter } from "../redux/features/products/filterSlice";
import { storeAllProducts } from "../redux/features/products/productsSlice";

function ProductFilterPanelComponent({ property, products }) {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);

  let displayData: TFilterData[] = [];

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
            filter_name: property,
            filter_checked: false,
            filter_quantity: quantity,
            filter_value: name,
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
            filter_name: property,
            filter_checked: false,
            filter_quantity: quantity,
            filter_value: name,
          };
        });
      break;

    default:
      break;
  }

  return (
    <div>
      {displayData.map((each, index) => (
        <div key={index} className="flex flex-row justify-between m-2">
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => {
                  if (event.target.checked) {
                    dispatch(
                      storeAllProducts(
                        allProducts.filter((product) => {
                          if (product.brand == each.filter_value) {
                            return true;
                          } else {
                            return false;
                          }
                        })
                      )
                    );
                  } else {
                    dispatch(storeAllProducts(products));
                  }
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
  );
}

ProductFilterPanelComponent.propTypes = {
  property: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductFilterPanelComponent;
