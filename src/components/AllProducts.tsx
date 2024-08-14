import SingleProductCard from "./SingleProductCard";
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";

function AllProducts() {
  const products = useAppSelector((state) => state.products.products);
  const searchField = useAppSelector((state) => state.search.field);

  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-2 gap-2">
      {searchField.length > 0
        ? products
            .filter((product) => product.name.includes(searchField))
            .map((product, index) => (
              <SingleProductCard
                product={product}
                key={index}
              ></SingleProductCard>
            ))
        : products.map((product, index) => (
            <SingleProductCard product={product} key={index} />
          ))}
    </div>
  );
}

export default AllProducts;
