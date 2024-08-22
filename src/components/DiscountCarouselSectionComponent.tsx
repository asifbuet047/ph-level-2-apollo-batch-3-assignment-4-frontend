import { Carousel } from "antd";
import { TDiscount } from "../types/AllTypes";
import DiscountSectionComponent from "./DiscountSectionComponent";
import { PropagateLoader } from "react-spinners";
import { useGetAllDiscountsQuery } from "../redux/api/allApiEndpoints";

function DiscountCarouselSectionComponent() {
  const { data, isSuccess, isFetching, isError } = useGetAllDiscountsQuery(
    [],
    {}
  );
  const discounts: TDiscount[] = data?.data as TDiscount[];
  return (
    <div>
      {isSuccess && (
        <div className="overflow-clip">
          <Carousel
            autoplay={true}
            autoplaySpeed={5000}
            arrows={true}
            adaptiveHeight={true}
          >
            {discounts.map((discount, index) => {
              return (
                <DiscountSectionComponent
                  discount={discount}
                  key={index}
                ></DiscountSectionComponent>
              );
            })}
          </Carousel>
        </div>
      )}
      {isFetching && (
        <div className="flex flex-row justify-center items-center">
          <PropagateLoader color="#CBA32A" />
        </div>
      )}
      {isError && <div>Error</div>}
    </div>
  );
}

export default DiscountCarouselSectionComponent;
