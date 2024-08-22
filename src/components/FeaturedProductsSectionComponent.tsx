import { PropagateLoader } from "react-spinners";
import FeaturedProductCardComponent from "./FeaturedProductCardComponent";
import { TProduct } from "../types/AllTypes";
import { useGetLatestProductsQuery } from "../redux/api/allApiEndpoints";

function FeaturedProductsSectionComponent() {
  const { data, isSuccess, isFetching, isError } = useGetLatestProductsQuery(
    [],
    {}
  );
  const featuredProducts: TProduct[] = data?.data as TProduct[];
  console.log(isSuccess, isFetching, isError);
  return (
    <div>
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
    </div>
  );
}

export default FeaturedProductsSectionComponent;
