import { PropagateLoader } from "react-spinners";
import FeaturedProductCardComponent from "./FeaturedProductCardComponent";
import { TProduct } from "../types/AllTypes";
import { useGetLatestProductsQuery } from "../redux/api/allApiEndpoints";
import { Alert } from "@mui/material";

function FeaturedProductsSectionComponent() {
  const { data, isSuccess, isFetching, isError } = useGetLatestProductsQuery(
    [],
    {}
  );
  const featuredProducts: TProduct[] = data?.data as TProduct[];
  return (
    <div className="mt-2 mb-2">
      <div>
        <p className="text-6xl text-center p-5 font-bold">Featured products</p>
      </div>
      {isSuccess &&
        featuredProducts.map((product) => (
          <div>
            <FeaturedProductCardComponent product={product} />
          </div>
        ))}
      {isFetching && (
        <div className="flex flex-row justify-center items-center">
          <PropagateLoader color="#CBA32A" />
        </div>
      )}
      {isError && (
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
