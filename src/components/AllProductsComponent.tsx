import SingleProductCardComponent from "./SingleProductCardComponent";
import { useAppSelector } from "../redux/hooks";
import { TDiscount, TProduct } from "../types/AllTypes";
import { useGetAllDiscountsQuery } from "../redux/api/allApiEndpoints";

function AllProductsComponent() {
  const products = useAppSelector(
    (state) => state.products.products
  ) as TProduct[];
  const searchField = useAppSelector((state) => state.search.field);
  const { data, isSuccess, isFetching, isError } = useGetAllDiscountsQuery([], {
    pollingInterval: 10000,
  });
  const discounts = data?.data as TDiscount[];

  return (
    <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5 gap-2 m-2">
      {searchField.length > 0
        ? products
            .filter((product) =>
              product.name.match(new RegExp(searchField, "i"))
            )
            .map((product, index) => (
              <SingleProductCardComponent
                product={product}
                discounts={discounts}
                key={index}
              ></SingleProductCardComponent>
            ))
        : products.map((product, index) => (
            <SingleProductCardComponent
              product={product}
              key={index}
              discounts={discounts}
            />
          ))}
    </div>
  );
}

export default AllProductsComponent;
