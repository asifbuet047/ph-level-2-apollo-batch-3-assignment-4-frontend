import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import { useUpdateproductMutation } from "../redux/features/products/productsApi";
import { Card } from "antd";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { TProduct } from "../types/AllTypes";
import SingleProductCard from "../components/SingleProductCard";
import NoRouteFoundPage from "./ErrorPages/NoRouteFoundPage";
import {
  parseInputForProductUpdateSubmit,
  validateWithZodSchema,
} from "../utils/DataValidationUtilFunctions";

function UpdateProductPage() {
  const products = useAppSelector((state) => state.products.products);
  const [width, setWidth] = useState(0);
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
    console.log(data);
  }, [refForWidth, data]);

  return (
    <div
      ref={refForWidth}
      className="flex flex-col items-center justify-between align-middle w-full border-2"
    >
      <Autocomplete
        id="search-products"
        className="w-full mt-2 mb-2"
        options={products}
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
      <div className="w-full flex flex-col items-center">
        <Card title="Update Product" className="rounded-lg border-2 w-full">
          <div>
            {products.length > 0 ? (
              <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col justify-center align-middle items-center p-5 w-full"
                encType="multipart/form-data"
                ref={refForWidth}
              >
                {!isSuccess ? (
                  <input
                    type="text"
                    defaultValue={products[0].name}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("name", { required: true })}
                  />
                ) : (
                  <input
                    type="text"
                    disabled
                    value={data.response.data.name}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("name", { required: true })}
                  />
                )}
                {errors.name && <p>Name is required</p>}

                {!isSuccess ? (
                  <input
                    defaultValue={products[0].description}
                    type="text"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("description", {
                      required: true,
                    })}
                  />
                ) : (
                  <input
                    disabled
                    value={data.response.data.description}
                    type="text"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("description", {
                      required: true,
                    })}
                  />
                )}

                {errors.description && <p>Description is required</p>}

                {!isSuccess ? (
                  <input
                    defaultValue={products[0].category}
                    type="text"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("category", { required: true })}
                  />
                ) : (
                  <input
                    disabled
                    value={data.response.data.category}
                    type="text"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("category", { required: true })}
                  />
                )}

                {errors.category && <p>Category is required</p>}

                {!isSuccess ? (
                  <input
                    type="text"
                    defaultValue={products[0].brand}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("brand", { required: true })}
                  />
                ) : (
                  <input
                    type="text"
                    disabled
                    value={data.response.data.brand}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("brand", { required: true })}
                  />
                )}

                {errors.brand && <p>Brand is required</p>}

                {!isSuccess ? (
                  <input
                    defaultValue={products[0].quantity.toString()}
                    type="number"
                    placeholder="Product quantity"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("quantity", { required: true, min: 0 })}
                  />
                ) : (
                  <input
                    disabled
                    value={data.response.data.quantity}
                    type="number"
                    placeholder="Product quantity"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("quantity", { required: true, min: 0 })}
                  />
                )}

                {errors.quantity && <p>Quantity is required </p>}

                {!isSuccess ? (
                  <input
                    type="number"
                    defaultValue={products[0].price.toString()}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("price", { required: true, min: 0 })}
                  />
                ) : (
                  <input
                    type="number"
                    disabled
                    value={data.response.data.price}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("price", { required: true, min: 0 })}
                  />
                )}

                {errors.price && <p>Price is required</p>}

                {isLoading && (
                  <p className="mt-2 mb-2">
                    <BarLoader color="#36d7b7" width={width}></BarLoader>
                  </p>
                )}
                {isError && <p>{JSON.stringify(error)}</p>}

                <button className="btn mt-2 mb-2" type="submit">
                  Update product
                </button>
              </form>
            ) : (
              <NoRouteFoundPage></NoRouteFoundPage>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProductPage;
