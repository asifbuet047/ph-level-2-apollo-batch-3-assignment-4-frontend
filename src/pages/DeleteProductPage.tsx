import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { motion } from "framer-motion";
import { Card } from "antd";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { TProduct } from "../types/AllTypes";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../redux/api/allApiEndpoints";
import { useAppDispatch } from "../redux/hooks";
import { removeSingleProduct } from "../redux/features/productsSlice";

function DeleteProductPage() {
  const {
    data: products,
    isFetching: isFetchingQuery,
    isSuccess: isSuccessQuery,
  } = useGetAllProductsQuery([]);
  const [width, setWidth] = useState(0);
  const [deleteProduct, { data, isError, isSuccess, isLoading, error }] =
    useDeleteProductMutation();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();

  const refForWidth = useRef(null);

  const submit = () => {
    deleteProduct(getValues()._id);
  };

  if (isError) {
    toast.error("Error happens while deleting Product");
  }

  if (isSuccess) {
    dispatch(removeSingleProduct(getValues()._id));
    toast.success(`${getValues} is successfully deleted`);
  }

  useEffect(() => {
    setWidth(refForWidth.current.offsetWidth);
  }, [refForWidth]);

  return (
    <div className="flex flex-col items-center justify-between align-middle w-full">
      {isSuccessQuery ? (
        <>
          {isSuccess ? (
            <Autocomplete
              disabled
              id="search-products"
              className="w-full mt-2 mb-2"
              options={products.data as TProduct[]}
              renderInput={(params) => (
                <TextField {...params} label="Search Product" />
              )}
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
                Object.keys(product as TProduct).forEach((property) => {
                  setValue(property, product[property]);
                });
              }}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option._id}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <motion.div
                    key={key}
                    {...optionProps}
                    whileHover={{ scale: 1.01 }}
                  >
                    {option.name}
                  </motion.div>
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
      <div className="md:w-1/2 flex flex-col items-center">
        <Card title="Delete Product" className="w-full" ref={refForWidth}>
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
                    value={data.data.name}
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
                    type="text"
                    value={products?.data[0].name}
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
                    value={data.data.description}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product description"
                    value={products?.data[0].description}
                    className="mt-2 mb-2"
                    error={errors.description ? true : false}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("description", { required: true })}
                  />
                )}
              </>
            )}

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
                    value={data.data.category}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product category"
                    value={products?.data[0].category}
                    className="mt-2 mb-2"
                    error={errors.category ? true : false}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("category", { required: true })}
                  />
                )}
              </>
            )}

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
                    value={data.data.brand}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Product brand"
                    value={products?.data[0].brand}
                    className="mt-2 mb-2"
                    error={errors.brand ? true : false}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("brand", { required: true })}
                  />
                )}
              </>
            )}

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
                    value={data.data.quantity}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Product quantity"
                    value={products?.data[0].quantity}
                    className="mt-2 mb-2"
                    error={errors.quantity ? true : false}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    {...register("quantity", { required: true, min: 1 })}
                  />
                )}
              </>
            )}

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
                    value={data.data.price}
                    className="mt-2 mb-2"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Product price"
                    value={products?.data[0].price}
                    className="mt-2 mb-2"
                    error={errors.price ? true : false}
                    fullWidth
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
                Delete product
              </button>
            ) : (
              <button disabled className="btn mt-2 mb-2" type="submit">
                `{data.data.name} is deleted`
              </button>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default DeleteProductPage;
