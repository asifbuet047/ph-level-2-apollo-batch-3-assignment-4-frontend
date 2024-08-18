import { Carousel } from "antd";
import { useGetAllDiscountsQuery } from "../redux/features/products/allApiEndpoints";
import { TDiscount } from "../types/AllTypes";
import DiscountComponent from "./DiscountComponent";
import { PropagateLoader } from "react-spinners";
import { Box, Stack } from "@mui/material";

function DiscountCarouselComponent() {
  const { data, isSuccess, isFetching } = useGetAllDiscountsQuery([], {});
  const discounts: TDiscount[] = data?.data as TDiscount[];
  return (
    <Box>
      {isSuccess && (
        <div className="overflow-clip h-auto">
          <Carousel
            autoplay={true}
            autoplaySpeed={5000}
            arrows={true}
            adaptiveHeight={true}
            className="border-4 border-indigo-900"
          >
            {discounts.map((discount) => {
              return (
                <DiscountComponent discount={discount}></DiscountComponent>
              );
            })}
          </Carousel>
        </div>
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
