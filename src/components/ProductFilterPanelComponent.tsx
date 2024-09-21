import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { clearFilter, updateFilter } from "../redux/features/filterSlice";
import {
  removeAllProducts,
  storeAllProducts,
  updateProducts,
} from "../redux/features/productsSlice";
import { TFilterData, TProduct } from "../types/AllTypes";
import Rating from "react-rating";

function ProductFilterPanelComponent({ products }) {
  const temp: TProduct[] = products as TProduct[];
  const allProducts = [...temp].sort((a, b) => b.price - a.price);
  const dispatch = useAppDispatch();
  const [priceRange, setPriceRange] = useState<number[]>([
    0,
    allProducts[0].price,
  ]);
  const filterState = useAppSelector((state) => state.filters.filters);
  const activeFilters: TFilterData[] = filterState.filter(
    (each) => each.filter_checked
  );
  const [open, setOpen] = useState<boolean>(true);

  const brandPanelData = allProducts
    .map((product) => product.brand)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((brand_name) => {
      const quantity = allProducts.filter((product) =>
        product.brand.includes(brand_name)
      ).length;
      return {
        filter_name: "brand",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: brand_name,
      };
    });

  const categoryPanelData = allProducts
    .map((product) => product.category)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((category_name) => {
      const quantity = allProducts.filter((product) =>
        product.category.includes(category_name)
      ).length;
      return {
        filter_name: "category",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: category_name,
      };
    });

  const ratingPanelData = allProducts
    .map((product) => product.rating)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((rating_value) => {
      const quantity = allProducts.filter(
        (product) => product.rating == rating_value
      ).length;
      return {
        filter_name: "rating",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: rating_value,
      };
    })
    .sort((a, b) => b.filter_value - a.filter_value);

  if (activeFilters.length == 0) {
    if (priceRange[0] === 0 && priceRange[1] === allProducts[0].price) {
      dispatch(storeAllProducts(allProducts));
    }
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
        case "rating":
          dispatch(
            updateProducts(
              allProducts.filter((product) => {
                if (product.rating == Number(each.filter_value)) {
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

  const handlePriceSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - 10), priceRange[1]]);
      dispatch(removeAllProducts());
      dispatch(
        updateProducts(
          allProducts.filter((product) => {
            if (product.price >= priceRange[0]) {
              if (product.price <= priceRange[1]) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        )
      );
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + 10)]);
      dispatch(removeAllProducts());
      dispatch(
        updateProducts(
          allProducts.filter((product) => {
            if (product.price >= priceRange[0]) {
              if (product.price <= priceRange[1]) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        )
      );
    }
  };

  return (
    <div className="flex flex-col justify-start rounded-md m-2">
      <div className="flex flex-row justify-around items-center bg-[#72BF44] rounded-md py-1">
        <Typography className="text-black" variant="h5" fontSize={20}>
          Filter By
        </Typography>
        <Typography
          onClick={() => {
            dispatch(clearFilter());
          }}
          className="text-black"
          variant="h5"
          fontSize={20}
        >
          <button>Reset</button>
        </Typography>
      </div>
      <Divider />
      <div>
        <div>
          <div className="p-2 flex flex-row gap-1">
            <div className="w-1/2">
              <input
                type="text"
                value={priceRange[0]}
                className="border-2 border-black rounded-md text-center"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={priceRange[1]}
                className="border-2 border-black rounded-md text-center"
              />
            </div>
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              size="medium"
              max={allProducts[0].price}
              onChange={handlePriceSlider}
              valueLabelDisplay="auto"
              disableSwap
              color="primary"
            ></Slider>
          </div>
        </div>

        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              Brand
            </AccordionSummary>
            <div>
              {brandPanelData.map((each, index) => (
                <div key={index} className="flex flex-row justify-between m-2">
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "brand"
                  ) >= 0 ? (
                    <>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={(event) => {
                                each.filter_checked = event.target.checked;
                                dispatch(updateFilter(each));
                              }}
                            />
                          }
                          label={each.filter_value}
                        />
                      ) : (
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
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                    </>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>

        <Divider />
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              Category
            </AccordionSummary>
            <div>
              {categoryPanelData.map((each, index) => (
                <div key={index} className="flex flex-row justify-between m-2">
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "category"
                  ) >= 0 ? (
                    <>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={(event) => {
                                each.filter_checked = event.target.checked;
                                dispatch(updateFilter(each));
                              }}
                            />
                          }
                          label={each.filter_value}
                        ></FormControlLabel>
                      ) : (
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
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                    </>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>

        <Divider />
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              Rating
            </AccordionSummary>
            <div className="">
              {ratingPanelData.map((each, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between m-2 border-2 border-red-500"
                >
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "rating"
                  ) >= 0 ? (
                    <div>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <div>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={true}
                                onChange={(event) => {
                                  each.filter_checked = event.target.checked;
                                  dispatch(updateFilter(each));
                                }}
                              />
                            }
                            label={each.filter_value}
                          />
                          <Rating
                            readonly
                            initialRating={each.filter_value}
                            emptySymbol={
                              <StarBorderOutlinedIcon
                                sx={{ width: "15px", height: "15px" }}
                              />
                            }
                            fullSymbol={
                              <StarOutlinedIcon
                                sx={{ width: "15px", height: "15px" }}
                              />
                            }
                            stop={each.filter_value}
                            className="pt-2 pb-2"
                          />
                        </div>
                      ) : (
                        <div className="border-2 border-red-500">
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
                          />
                          <Rating
                            readonly
                            initialRating={each.filter_value}
                            emptySymbol={
                              <StarBorderOutlinedIcon
                                sx={{ width: "15px", height: "15px" }}
                              />
                            }
                            fullSymbol={
                              <StarOutlinedIcon
                                sx={{ width: "15px", height: "15px" }}
                              />
                            }
                            stop={each.filter_value}
                            className="pt-2 pb-2 w-56"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-red-500 w-full">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                      <Rating
                        readonly
                        initialRating={each.filter_value}
                        emptySymbol={
                          <StarBorderOutlinedIcon
                            sx={{ width: "15px", height: "15px" }}
                          />
                        }
                        fullSymbol={
                          <StarOutlinedIcon
                            sx={{ width: "15px", height: "15px" }}
                          />
                        }
                        stop={each.filter_value}
                        className="pt-2 pb-2 w-56"
                      />
                    </div>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterPanelComponent;
