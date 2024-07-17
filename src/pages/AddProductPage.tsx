import { Card } from "antd";
import { useForm } from "react-hook-form";
import { ProductValidation } from "../utils/validationSchema";
import { useCreateProductMutation } from "../redux/features/products/productsApi";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useMotionValue, motion, useAnimate } from "framer-motion";
import SingleProductCard from "../components/SingleProductCard";
import { useEffect, useRef, useState } from "react";

function AddProduct() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [creatProduct, { data, isError, isSuccess, isLoading, error }] =
    useCreateProductMutation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [viewWidth, setViewWidth] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateWithZodSchema = (data: any) => {
    const result =
      ProductValidation.productCreationValidationSchema.safeParse(data);
    if (result.error) {
      return result.error.issues;
    } else {
      return result.success;
    }
  };

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.offsetWidth);
      setViewWidth(ref.current.offsetWidth);
    }
  }, []);

  const parseInputForSubmit = () => {
    const temp = { ...getValues() };
    for (const key in temp) {
      if (key === "quantity" || key === "price" || key === "rating") {
        temp[key] = Number.parseInt(temp[key]);
      } else if (key === "product_image_file") {
        temp[key] = temp[key][0];
      }
    }
    const { product_image_file, ...data } = temp;
    return {
      data,
      file: product_image_file,
    };
  };
  const onHomeClick = () => {
    navigate("/");
  };
  const submit = () => {
    creatProduct(parseInputForSubmit());
  };
  return (
    <div className="flex flex-col items-center">
      <Card title="Add Product" className="rounded-lg border-2 w-1/2">
        <div>
          {!isSuccess && (
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col justify-center align-middle items-center p-5 w-full"
              encType="multipart/form-data"
              ref={ref}
            >
              <input
                type="text"
                placeholder="Product name"
                className="input input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("name", { required: true })}
              />
              {errors.name && <p>Name is required</p>}
              <input
                type="text"
                placeholder="Product description"
                className="input input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("description", {
                  required: true,
                })}
              />
              {errors.description && <p>Description is required</p>}
              <input
                type="text"
                placeholder="Product category"
                className="input input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("category", { required: true })}
              />
              {errors.category && <p>Category is required</p>}
              <input
                type="text"
                placeholder="Product brand name"
                className="input input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("brand", { required: true })}
              />
              {errors.brand && <p>Brand is required</p>}
              <input
                type="number"
                placeholder="Product quantity"
                className="input input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && <p>Quantity is required</p>}
              <input
                type="number"
                placeholder="Product unit price"
                className="input input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("price", { required: true })}
              />
              {errors.price && <p>Price is required</p>}
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("product_image_file", {
                  required: true,
                })}
              />
              {errors.product_image_file && <p>File is required</p>}
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
                Add product
              </button>
            </form>
          )}

          {isSuccess && (
            <SingleProductCard product={data.data}></SingleProductCard>
          )}
        </div>
      </Card>
    </div>
  );
}

export default AddProduct;
