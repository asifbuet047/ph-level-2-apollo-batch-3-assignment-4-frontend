import React from "react";
import { PropagateLoader } from "react-spinners";
import FeaturedProductCardComponent from "./FeaturedProductCardComponent";
import { useGetLatestProductsQuery } from "../redux/features/products/allApiEndpoints";
import { Grid, Stack } from "@mui/material";
import { TProduct } from "../types/AllTypes";

function FeaturedProducts() {
  const { data, isSuccess, isFetching } = useGetLatestProductsQuery([], {});
  const featuredProducts: TProduct[] = data?.data as TProduct[];
  return (
    <Grid
      container
      spacing={2}
      rowGap={1}
      justifyContent={"space-between"}
      direction={"row"}
      columns={10}
    >
      <Grid md={10} className="">
        <p className="text-6xl text-center p-5 font-bold">Featured products</p>
      </Grid>
      {isSuccess &&
        featuredProducts.map((product) => (
          <Grid item md={2} className="">
            <FeaturedProductCardComponent product={product} />
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

export default FeaturedProducts;
