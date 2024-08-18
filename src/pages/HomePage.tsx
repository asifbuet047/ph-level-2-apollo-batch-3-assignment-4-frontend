import { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useGetAllDiscountsQuery } from "../redux/features/products/allApiEndpoints";
import { TDiscount } from "../types/AllTypes";
import DiscountComponent from "../components/DiscountComponent";

function HomePage() {
  const { data, isSuccess, isFetching } = useGetAllDiscountsQuery([], {});
  const discounts: TDiscount[] = data?.data;

  return (
    <div>
      {isSuccess && (
        <Carousel autoplay={true} autoplaySpeed={5000} arrows={true}>
          {discounts.map((discount) => {
            return <DiscountComponent discount={discount}></DiscountComponent>;
          })}
        </Carousel>
      )}
    </div>
  );
}

export default HomePage;
