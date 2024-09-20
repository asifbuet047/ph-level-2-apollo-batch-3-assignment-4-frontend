import { PropagateLoader } from "react-spinners";
import FeaturedProductCardComponent from "./FeaturedProductCardComponent";
import { TDiscount, TProduct } from "../types/AllTypes";
import {
  useGetAllDiscountsQuery,
  useGetLatestProductsQuery,
} from "../redux/api/allApiEndpoints";
import { Alert } from "@mui/material";

function FeaturedProductsSectionComponent() {
  const { data, isSuccess, isFetching, isError } = useGetLatestProductsQuery(
    [],
    {}
  );
  const {
    data: discountData,
    isSuccess: isDiscountSuccess,
    isFetching: isDiscountFetching,
    isError: isDiscountError,
  } = useGetAllDiscountsQuery([], {
    pollingInterval: 10000,
  });
  const featuredProducts: TProduct[] = data?.data as TProduct[];
  const discounts: TDiscount[] = discountData?.data as TDiscount[];
  return (
    <div className="mt-2 mb-2">
      <div>
        <p className="text-6xl text-center p-5 font-bold">Featured products</p>
      </div>
      {isSuccess && isDiscountSuccess && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6 pl-2 pr-2">
          {featuredProducts.map((product) => (
            <FeaturedProductCardComponent
              product={product}
              discounts={discounts}
            />
          ))}
        </div>
      )}
      {isFetching && isDiscountFetching && (
        <div className="flex flex-row justify-center items-center">
          <PropagateLoader color="#CBA32A" />
        </div>
      )}
      {isError && isDiscountError && (
        <div className="flex flex-row justify-center">
          <Alert variant="outlined" severity="error" className="w-1/2">
            No Internet Connection
          </Alert>
        </div>
      )}
    </div>
  );
}

export default FeaturedProductsSectionComponent;
