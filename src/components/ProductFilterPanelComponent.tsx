import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { TFilterData, TProduct } from "../types/AllTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { updateFilter } from "../redux/features/products/filterSlice";

function ProductFilterPanelComponent({ property, products }) {
  const filterState = useAppSelector((state) => state.filters.filters);
  const filterDispatch = useAppDispatch();
  const [localState, setLocalState] = useState<
    {
      name: string;
      value: boolean;
    }[]
  >([]);

  const allProducts = products as TProduct[];
  let displayData: TFilterData[] = [];

  useEffect(() => {
    console.log(localState);
    const temp = [...localState];
  }, [localState]);

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
    <div className="border-2 border-red-200">
      {displayData &&
        displayData.map((each, index) => (
          <div key={index} className="flex flex-row justify-between m-2">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => {
                    each.filter_checked = event.target.checked;
                    setLocalState([
                      ...localState,
                      {
                        name: each.filter_value,
                        value: each.filter_checked,
                      },
                    ]);
                    filterDispatch(updateFilter(each as TFilterData));
                  }}
                />
              }
              label={each.filter_value}
            ></FormControlLabel>
            <p className=" pl-2 pr-2 border-2 rounded-md text-center">
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
