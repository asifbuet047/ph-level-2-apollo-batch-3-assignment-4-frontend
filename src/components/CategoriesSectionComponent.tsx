import React from "react";
import { useGetCategoriesQuery } from "../redux/features/products/allApiEndpoints";
import { PropagateLoader } from "react-spinners";
import { Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { updateFilter } from "../redux/features/products/filterSlice";
import { TFilterData } from "../types/AllTypes";

function CategoriesSectionComponent() {
  const { data, isSuccess, isFetching } = useGetCategoriesQuery([], {});
  const allCategories: string[] = data?.data as string[];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let filterData: TFilterData = {
    filter_name: "category",
    filter_value: "",
    filter_quantity: 0,
    filter_checked: true,
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={1}
      alignItems={"center"}
      direction={"row"}
      columns={allCategories ? allCategories.length : 12}
      className=""
    >
      <Grid item md={allCategories ? allCategories.length : 12} className="">
        <p className="text-6xl text-center p-5 font-bold">Product Categories</p>
      </Grid>
      {isSuccess &&
        allCategories.map((category, index) => (
          <Grid item container md={1} justifyContent={"center"}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              key={index}
              className="text-xl"
              onClick={() => {
                filterData.filter_value = category;
                dispatch(updateFilter(filterData));
                navigate("/products");
              }}
            >
              #{category}
            </motion.button>
          </Grid>
        ))}
      {isFetching && (
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"stretch"}
        >
          <PropagateLoader color="#CBA32A" />
        </Stack>
      )}
    </Grid>
  );
}

export default CategoriesSectionComponent;
