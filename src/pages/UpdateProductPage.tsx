import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { motion } from "framer-motion";
import { Card } from "antd";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { TProduct } from "../types/AllTypes";
import {
  parseInputForProductUpdateSubmit,
  validateWithZodSchema,
} from "../utils/DataValidationUtilFunctions";
import { toast } from "react-toastify";
import {
  useGetAllProductsQuery,
  useUpdateproductMutation,
} from "../redux/api/allApiEndpoints";
import { ZodIssue } from "zod";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UpdateProductPage() {
  const {
    data: products,
    isFetching: isFetchingQuery,
    isSuccess: isSuccessQuery,
  } = useGetAllProductsQuery([]);
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const [updateProduct, { data, isError, isSuccess, isLoading }] =
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
    const refinedProduct = parseInputForProductUpdateSubmit(getValues());
    if (validateWithZodSchema(refinedProduct) == true) {
      updateProduct(refinedProduct);
    } else {
      const issues = validateWithZodSchema(refinedProduct) as ZodIssue[];
      issues.forEach((issue, index) =>
        toast.warn(`${index + 1}. ${issue.message}`)
      );
    }
  };

  if (isError) {
    toast.error("Error happens while updating Product");
  }
  if (isSuccess) {
    toast.success(`${getValues().name} is successfully updated`);
  }

  if (isSuccessQuery) {
    toast.info("Please select a product from above to update");
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setWidth(refForWidth.current.offsetWidth);
  }, [refForWidth]);

  return (
    <div className="flex flex-col items-center justify-between px-2 py-2 bg-[#C0F5FA]">
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={(event, product: TProduct) => {
                Object.keys(product as TProduct).forEach((property) => {
                  setValue(property, product[property]);
                });
              }}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option._id}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
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
      <div className="flex flex-col items-center justify-between align-middle w-full">
        <Card
          title="Update Product"
          className="md:w-1/2 w-full"
          ref={refForWidth}
        >
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
                    placeholder="Product name"
                    fullWidth
                    disabled={isLoading}
                    type="text"
                    focused
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
                    placeholder="Product description"
                    focused
                    error={errors.description ? true : false}
                    fullWidth
                    className="mt-2 mb-2"
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
                    placeholder="Product category"
                    focused
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
                    placeholder="Product brand"
                    focused
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
                    placeholder="Product quantity"
                    focused
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
                    placeholder="Product price"
                    focused
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
              <Button
                variant="contained"
                className="btn mt-2 mb-2"
                type="submit"
              >
                Update product
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="btn mt-2 mb-2"
                onClick={() => navigate("/products")}
              >
                Go to All Product Page
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProductPage;
