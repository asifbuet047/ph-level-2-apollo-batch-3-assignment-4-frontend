import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppSelector } from "../redux/hooks";
import { motion } from "framer-motion";
import { useUpdateproductMutation } from "../redux/features/products/productsApi";
import { Card } from "antd";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TProduct } from "../types/AllTypes";
import SingleProductCard from "../components/SingleProductCard";

function UpdateProductPage() {
  const products = useAppSelector((state) => state.products.products);
  console.log(products);
  const [selectedProduct, setSelectedProduct] = useState<TProduct>(products[0]);
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
  const [viewWidth, setViewWidth] = useState(0);
  const [name, setName] = useState(selectedProduct.name);

  const submit = () => {
    console.log(getValues());
  };

  useEffect(() => {
    setViewWidth(refForWidth.current.offsetWidth);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between align-middle w-full border-2">
      <Autocomplete
        id="search-products"
        className="w-full mt-2 mb-2"
        options={products}
        renderInput={(params) => (
          <TextField {...params} label="Search Product" />
        )}
        onChange={(event, product) => {
          setSelectedProduct(product);
          console.log(selectedProduct);
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
            {!isSuccess && (
              <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col justify-center align-middle items-center p-5 w-full"
                encType="multipart/form-data"
                ref={refForWidth}
              >
                {selectedProduct ? (
                  <input
                    type="text"
                    defaultValue={selectedProduct.name}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("name", { required: true })}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    placeholder="Product name"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("name", { required: true })}
                  />
                )}

                {errors.name && <p>Name is required</p>}
                {selectedProduct ? (
                  <input
                    defaultValue={selectedProduct.description}
                    type="text"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("description", {
                      required: true,
                    })}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    placeholder="Product description"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("description", {
                      required: true,
                    })}
                  />
                )}
                {errors.description && <p>Description is required</p>}
                {selectedProduct ? (
                  <input
                    defaultValue={selectedProduct.category}
                    type="text"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("category", { required: true })}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    placeholder="Product category"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("category", { required: true })}
                  />
                )}
                {errors.category && <p>Category is required</p>}
                {selectedProduct ? (
                  <input
                    type="text"
                    defaultValue={selectedProduct.brand}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("brand", { required: true })}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    placeholder="Product brand name"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("brand", { required: true })}
                  />
                )}
                {errors.brand && <p>Brand is required</p>}
                {selectedProduct ? (
                  <input
                    defaultValue={selectedProduct.quantity.toString()}
                    type="number"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("quantity", { required: true })}
                  />
                ) : (
                  <input
                    disabled
                    type="number"
                    placeholder="Product quantity"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("quantity", { required: true })}
                  />
                )}

                {errors.quantity && <p>Quantity is required</p>}
                {selectedProduct ? (
                  <input
                    type="number"
                    defaultValue={selectedProduct.price.toString()}
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("price", { required: true })}
                  />
                ) : (
                  <input
                    disabled
                    type="number"
                    placeholder="Product unit price"
                    className="input input-bordered w-full max-w-xs mt-2 mb-2"
                    {...register("price", { required: true })}
                  />
                )}

                {errors.price && <p>Price is required</p>}

                {isLoading && (
                  <p className="mt-2 mb-2">
                    <BarLoader color="#36d7b7" width={viewWidth}></BarLoader>
                  </p>
                )}
                {isError && (
                  <p>
                    {error.status} {JSON.stringify(error.data)}
                  </p>
                )}

                <button className="btn mt-2 mb-2" type="submit">
                  Update product
                </button>
              </form>
            )}

            {isSuccess && (
              <SingleProductCard product={data.data}></SingleProductCard>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UpdateProductPage;
