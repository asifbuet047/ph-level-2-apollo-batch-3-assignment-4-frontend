import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import {
  useGetAllProductsQuery,
  useUpdateproductMutation,
} from "../redux/features/products/productsApi";
import { Card } from "antd";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { TProduct } from "../types/AllTypes";
import NoRouteFoundPage from "./ErrorPages/NoRouteFoundPage";
import {
  parseInputForProductUpdateSubmit,
  validateWithZodSchema,
} from "../utils/DataValidationUtilFunctions";
import { updateSingleProduct } from "../redux/features/products/productsSlice";
import { toast } from "react-toastify";

function UpdateProductPage() {
  const {
    data: products,
    isFetching: isFetchingQuery,
    isSuccess: isSuccessQuery,
  } = useGetAllProductsQuery([]);
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(0);
  const [fetchState, setFetchState] = useState(false);
  const [updateProduct, { data, isError, isSuccess, isLoading, error }] =
    useUpdateproductMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const refForWidth = useRef(null);

  const submit = () => {
    const temp = parseInputForProductUpdateSubmit(getValues());
    if (validateWithZodSchema(temp) == true) {
      console.log("Data valdiated");
      const { __v, product_image_url, ...data } = temp;
      updateProduct(data);
    } else {
      console.log("Not ok");
    }
  };

  useEffect(() => {
    setWidth(refForWidth.current.offsetWidth);
    if (isError) {
      toast.error(error);
    }
  }, [refForWidth, isError, isSuccessQuery]);

  return (
    <div
      ref={refForWidth}
      className="flex flex-col items-center justify-between align-middle w-full border-2"
    >
      {isSuccessQuery ? (
        <>
          {isSuccess ? (
            <Autocomplete
              disabled
              id="search-products"
              className="w-full mt-2 mb-2"
              options={products?.data as TProduct[]}
              renderInput={(params) => (
                <TextField {...params} label="Search Product" />
              )}
              onChange={(event, product) => {
                Object.keys(product).forEach((element) => {
                  setValue(element, product[element]);
                });
              }}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option._id}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <div {...optionProps}>
                    <motion.div key={key} whileHover={{ scaleX: 1.1 }}>
                      {option.name}
                    </motion.div>
                  </div>
                );
              }}
            ></Autocomplete>
          ) : (
            <Autocomplete
              id="search-products"
              className="w-full mt-2 mb-2"
              options={products?.data as TProduct[]}
              renderInput={(params) => (
                <TextField {...params} label="Search Product" />
              )}
              onChange={(event, product) => {
                Object.keys(product).forEach((element) => {
                  setValue(element, product[element]);
                });
              }}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option._id}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <div {...optionProps}>
                    <motion.div key={key} whileHover={{ scaleX: 1.1 }}>
                      {option.name}
                    </motion.div>
                  </div>
                );
              }}
            ></Autocomplete>
          )}
        </>
      ) : (
        <Autocomplete
          disabled
          id="search-products"
          className="w-full mt-2 mb-2"
          options={["no products"]}
          renderInput={(params) => <TextField {...params} label="no product" />}
        ></Autocomplete>
      )}
      <div className="w-full flex flex-col items-center">
        <Card title="Update Product" className="rounded-lg border-2 w-full">
          <div>
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col justify-center align-middle items-center p-5 w-full"
              encType="multipart/form-data"
              ref={refForWidth}
            >
              {isFetchingQuery ? (
                <input
                  type="text"
                  disabled={isFetchingQuery}
                  placeholder="Product name"
                  className="input input-bordered w-full max-w-xs mt-2 mb-2"
                />
              ) : (
                <>
                  {isSuccess ? (
                    <input
                      type="text"
                      disabled
                      value={data.response.data.name}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Product name"
                      defaultValue={products?.data[0].name}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                      {...register("name", { required: true })}
                    />
                  )}
                </>
              )}
              {errors.name && <p>Name is required</p>}

              {isFetchingQuery ? (
                <input
                  type="text"
                  disabled={isFetchingQuery}
                  placeholder="Product description"
                  className="input input-bordered w-full max-w-xs mt-2 mb-2"
                />
              ) : (
                <>
                  {isSuccess ? (
                    <input
                      type="text"
                      disabled
                      value={data.response.data.description}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Product description"
                      defaultValue={products?.data[0].description}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                      {...register("description", { required: true })}
                    />
                  )}
                </>
              )}

              {errors.description && <p>Description is required</p>}

              {isFetchingQuery ? (
                <input
                  type="text"
                  disabled={isFetchingQuery}
                  placeholder="Product category"
                  className="input input-bordered w-full max-w-xs mt-2 mb-2"
                />
              ) : (
                <>
                  {isSuccess ? (
                    <input
                      type="text"
                      disabled
                      value={data.response.data.category}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Product category"
                      defaultValue={products?.data[0].category}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                      {...register("category", { required: true })}
                    />
                  )}
                </>
              )}

              {errors.category && <p>Category is required</p>}

              {isFetchingQuery ? (
                <input
                  type="text"
                  disabled={isFetchingQuery}
                  placeholder="Product brand"
                  className="input input-bordered w-full max-w-xs mt-2 mb-2"
                />
              ) : (
                <>
                  {isSuccess ? (
                    <input
                      type="text"
                      disabled
                      value={data.response.data.brand}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Product brand"
                      defaultValue={products?.data[0].brand}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                      {...register("brand", { required: true })}
                    />
                  )}
                </>
              )}

              {errors.brand && <p>Brand is required</p>}

              {isFetchingQuery ? (
                <input
                  type="number"
                  disabled={isFetchingQuery}
                  placeholder="Product quantity"
                  className="input input-bordered w-full max-w-xs mt-2 mb-2"
                />
              ) : (
                <>
                  {isSuccess ? (
                    <input
                      type="number"
                      disabled
                      value={data.response.data.quantity}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    />
                  ) : (
                    <input
                      type="number"
                      placeholder="Product quantity"
                      defaultValue={products?.data[0].quantity}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                      {...register("quantity", { required: true, min: 1 })}
                    />
                  )}
                </>
              )}

              {errors.quantity && <p>Quantity is required </p>}

              {isFetchingQuery ? (
                <input
                  type="number"
                  disabled={isFetchingQuery}
                  placeholder="Product price"
                  className="input input-bordered w-full max-w-xs mt-2 mb-2"
                />
              ) : (
                <>
                  {isSuccess ? (
                    <input
                      type="number"
                      disabled
                      value={data.response.data.price}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    />
                  ) : (
                    <input
                      type="number"
                      placeholder="Product price"
                      defaultValue={products?.data[0].price}
                      className="input input-bordered w-full max-w-xs mt-2 mb-2"
                      {...register("price", { required: true, min: 0 })}
                    />
                  )}
                </>
              )}

              {errors.price && <p>Price is required</p>}

              {isLoading && (
                <p className="mt-2 mb-2">
                  <BarLoader color="#36d7b7" width={width}></BarLoader>
                </p>
              )}

              {!isSuccess ? (
                <button className="btn mt-2 mb-2" type="submit">
                  Update product
                </button>
              ) : (
                <button disabled className="btn mt-2 mb-2" type="submit">
                  `{data.response.data.name} is updated`
                </button>
              )}
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProductPage;
