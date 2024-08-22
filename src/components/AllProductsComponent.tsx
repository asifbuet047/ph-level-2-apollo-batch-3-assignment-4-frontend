import SingleProductCardComponent from "./SingleProductCardComponent";
import { useAppSelector } from "../redux/hooks";
import { TProduct } from "../types/AllTypes";

function AllProductsComponent() {
  const products = useAppSelector(
    (state) => state.products.products
  ) as TProduct[];
  const searchField = useAppSelector((state) => state.search.field);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 gap-2 m-2">
      {searchField.length > 0
        ? products
            .filter((product) => product.name.includes(searchField))
            .map((product, index) => (
              <SingleProductCardComponent
                product={product}
                key={index}
              ></SingleProductCardComponent>
            ))
        : products.map((product, index) => (
            <SingleProductCardComponent product={product} key={index} />
          ))}
    </div>
  );
}

export default AllProductsComponent;
