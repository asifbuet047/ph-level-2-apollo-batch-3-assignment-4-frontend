import React from "react";
import { useGetCategoriesQuery } from "../redux/features/products/allApiEndpoints";
import { PropagateLoader } from "react-spinners";
import { Box, Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";

function CategoriesSectionComponent() {
  const { data, isSuccess, isFetching } = useGetCategoriesQuery([], {});
  const allCategories: string[] = data?.data as string[];
  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={1}
      alignItems={"center"}
      direction={"row"}
      columns={allCategories.length}
      className=""
    >
      <Grid item md={allCategories.length} className="">
        <p className="text-6xl text-center p-5 font-bold">Product Categories</p>
      </Grid>
      {isSuccess &&
        allCategories.map((category, index) => (
          <Grid item container md={1} justifyContent={"center"}>
            <motion.p
              whileHover={{ scale: 1.1 }}
              key={index}
              className="text-xl"
            >
              #{category}
            </motion.p>
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
