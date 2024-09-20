import { Carousel } from "antd";
import { TDiscount } from "../types/AllTypes";
import DiscountComponent from "./DiscountComponent";
import { PropagateLoader } from "react-spinners";
import { useGetAllDiscountsQuery } from "../redux/api/allApiEndpoints";
import Lottie from "react-lottie";
import no_internet from "../../public/no_internet.json";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { updateInternetState } from "../redux/features/generalSlice";

function DiscountCarouselSectionComponent() {
  const { data, isSuccess, isFetching, isError } = useGetAllDiscountsQuery([], {
    pollingInterval: 10000,
  });
  const refWidth = useRef(null);
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState<number>(0);
  const discounts: TDiscount[] = data?.data as TDiscount[];

  if (isError) {
    dispatch(updateInternetState(false));
  }

  useEffect(() => {
    if (refWidth.current) {
      setWidth(refWidth.current.offsetWidth);
    }
  }, []);
  return (
    <div ref={refWidth} className="mt-2 mb-2">
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
                <DiscountComponent
                  discount={discount}
                  key={index}
                ></DiscountComponent>
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
      {isError && (
        <div>
          <Lottie
            options={{
              animationData: no_internet,
              loop: true,
            }}
            width={width / 2}
            height={width / 3}
          ></Lottie>
        </div>
      )}
    </div>
  );
}

export default DiscountCarouselSectionComponent;
