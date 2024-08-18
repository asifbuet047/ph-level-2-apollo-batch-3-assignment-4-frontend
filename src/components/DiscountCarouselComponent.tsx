import { Carousel } from "antd";
import { useGetAllDiscountsQuery } from "../redux/features/products/allApiEndpoints";
import { TDiscount } from "../types/AllTypes";
import DiscountComponent from "./DiscountComponent";
import { PropagateLoader } from "react-spinners";
import { Box, Stack } from "@mui/material";

function DiscountCarouselComponent() {
  const { data, isSuccess, isFetching } = useGetAllDiscountsQuery([], {});
  const discounts: TDiscount[] = data?.data;
  return (
    <Box>
      {isSuccess && (
        <Carousel
          autoplay={true}
          autoplaySpeed={5000}
          arrows={true}
          adaptiveHeight={true}
        >
          {discounts.map((discount) => {
            return <DiscountComponent discount={discount}></DiscountComponent>;
          })}
        </Carousel>
      )}
      {isFetching && (
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"stretch"}
        >
          <PropagateLoader color="#CBA32A" />
        </Stack>
      )}
    </Box>
  );
}

export default DiscountCarouselComponent;
