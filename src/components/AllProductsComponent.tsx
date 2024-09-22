import SingleProductCardComponent from "./SingleProductCardComponent";
import { useAppSelector } from "../redux/hooks";
import { TDiscount, TProduct } from "../types/AllTypes";
import { useGetAllDiscountsQuery } from "../redux/api/allApiEndpoints";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import { useState } from "react";

function AllProductsComponent() {
  const products = useAppSelector(
    (state) => state.products.products
  ) as TProduct[];
  let temp: TProduct[] = [];
  const searchField = useAppSelector((state) => state.search.field);
  const { data, isError } = useGetAllDiscountsQuery([], {});
  const [pageNo, setPageNo] = useState<number>(1);
  const discounts = data?.data as TDiscount[];
  const totalPages = Math.floor(products.length / 8) + 1;
  const remainings = products.length % 8;

  if (isError) {
    toast.warn("All discount information is currently unavailable");
  }
  if (totalPages == 1) {
    temp = products;
  } else {
    if (pageNo < totalPages) {
      temp = products.slice((pageNo - 1) * 8, (pageNo - 1) * 8 + 8);
    } else {
      temp = products.slice((pageNo - 1) * 8, (pageNo - 1) * 8 + remainings);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-6 gap-2 m-2">
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
          : temp.map((product, index) => (
              <SingleProductCardComponent
                product={product}
                key={index}
                discounts={discounts}
              />
            ))}
      </div>
      <div className="flex flex-row justify-center">
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            shape="circular"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={(event, page) => setPageNo(page)}
          />
        )}
      </div>
    </div>
  );
}

export default AllProductsComponent;
