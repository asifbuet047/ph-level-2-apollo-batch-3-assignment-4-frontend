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
import { useForm, useWatch } from "react-hook-form";
import { TProduct } from "../types/AllTypes";
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
      const { __v, product_image_url, ...data } = temp;
      updateProduct(data);
    }
  };

  useEffect(() => {
    setWidth(refForWidth.current.offsetWidth);
    if (isError) {
      toast.error(error);
    }
  }, [refForWidth, isError, isSuccessQuery]);

  return (
    <div className="flex flex-col items-center justify-between align-middle w-full">
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
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <Card title="Update Product" className="w-full" ref={refForWidth}>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-center align-middle items-center p-5"
            encType="multipart/form-data"
            ref={refForWidth}
          >
            {isFetchingQuery ? (
              <TextField
                type="text"
                variant="outlined"
                label="Product name"
                disabled={isFetchingQuery}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <>
                {isSuccess ? (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product name"
                    disabled
                    value={data.response.data.name}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    error={errors.name ? true : false}
                    variant="outlined"
                    label="Product name"
                    fullWidth
                    disabled={isLoading}
                    type="text"
                    defaultValue={products?.data[0].name}
                    sx={{ marginBottom: 2 }}
                    {...register("name", { required: true, minLength: 4 })}
                  />
                )}
              </>
            )}
            {errors.name && <p>Name is required</p>}

            {isFetchingQuery ? (
              <TextField
                variant="outlined"
                type="text"
                disabled={isFetchingQuery}
                label="Product description"
                className="mt-2 mb-2"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <>
                {isSuccess ? (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product description"
                    disabled
                    className="mt-2 mb-2"
                    value={data.response.data.description}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product description"
                    defaultValue={products?.data[0].description}
                    className="mt-2 mb-2"
                    error={errors.description ? true : false}
                    fullWidth
                    disabled={isLoading}
                    sx={{ marginBottom: 2 }}
                    {...register("description", { required: true })}
                  />
                )}
              </>
            )}

            {errors.description && <p>Description is required</p>}

            {isFetchingQuery ? (
              <TextField
                variant="outlined"
                type="text"
                label="Product category"
                className="mt-2 mb-2"
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isFetchingQuery}
              />
            ) : (
              <>
                {isSuccess ? (
                  <TextField
                    variant="outlined"
                    type="text"
                    disabled
                    label="Product category"
                    className="mt-2 mb-2"
                    value={data.response.data.category}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product category"
                    defaultValue={products?.data[0].category}
                    className="mt-2 mb-2"
                    error={errors.category ? true : false}
                    fullWidth
                    disabled={isLoading}
                    sx={{ marginBottom: 2 }}
                    {...register("category", { required: true })}
                  />
                )}
              </>
            )}

            {errors.category && <p>Category is required</p>}

            {isFetchingQuery ? (
              <TextField
                variant="outlined"
                type="text"
                label="Product brand"
                className="mt-2 mb-2"
                disabled={isFetchingQuery}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <>
                {isSuccess ? (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product brand"
                    disabled
                    value={data.response.data.brand}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product brand"
                    defaultValue={products?.data[0].brand}
                    className="mt-2 mb-2"
                    error={errors.brand ? true : false}
                    fullWidth
                    disabled={isLoading}
                    sx={{ marginBottom: 2 }}
                    {...register("brand", { required: true })}
                  />
                )}
              </>
            )}

            {errors.brand && <p>Brand is required</p>}

            {isFetchingQuery ? (
              <TextField
                variant="outlined"
                type="number"
                disabled={isFetchingQuery}
                label="Product quantity"
                className="mt-2 mb-2"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <>
                {isSuccess ? (
                  <TextField
                    variant="outlined"
                    type="number"
                    disabled
                    label="Product quantity"
                    value={data.response.data.quantity}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Product quantity"
                    defaultValue={products?.data[0].quantity}
                    className="mt-2 mb-2"
                    error={errors.quantity ? true : false}
                    fullWidth
                    disabled={isLoading}
                    sx={{ marginBottom: 2 }}
                    {...register("quantity", { required: true, min: 1 })}
                  />
                )}
              </>
            )}

            {errors.quantity && <p>Quantity is required </p>}

            {isFetchingQuery ? (
              <TextField
                variant="outlined"
                type="number"
                disabled={isFetchingQuery}
                label="Product price"
                className="mt-2 mb-2"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <>
                {isSuccess ? (
                  <TextField
                    variant="outlined"
                    type="number"
                    disabled
                    label="Product price"
                    value={data.response.data.price}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Product price"
                    defaultValue={products?.data[0].price}
                    className="mt-2 mb-2"
                    error={errors.price ? true : false}
                    fullWidth
                    disabled={isLoading}
                    sx={{ marginBottom: 2 }}
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
        </Card>
      </div>
    </div>
  );
}

export default UpdateProductPage;
