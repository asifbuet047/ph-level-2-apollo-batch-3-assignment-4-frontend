import SingleProductCardComponent from "./SingleProductCardComponent";
import { useAppSelector } from "../redux/hooks";

function AllProductsComponent() {
  const products = useAppSelector((state) => state.products.products);
  const searchField = useAppSelector((state) => state.search.field);

  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 gap-2 m-2">
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
