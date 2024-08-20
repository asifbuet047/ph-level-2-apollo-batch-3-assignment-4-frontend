import React from "react";
import { useGetCategoriesQuery } from "../redux/features/products/allApiEndpoints";
import { PropagateLoader } from "react-spinners";
import { Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";

function CategoriesSectionComponent() {
  const { data, isSuccess, isFetching } = useGetCategoriesQuery([], {});
  const allCategories: string[] = data?.data as string[];
  console.log(allCategories);
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
