import { Card } from "antd";
import { error } from "console";
import { useForm } from "react-hook-form";
import { ProductValidation } from "../utils/validationSchema";
import { useCreateProductMutation } from "../redux/features/products/productsApi";
import { TProduct } from "../types/AllTypes";
import { BarLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";

function AddProduct() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [creatProduct, { data, isError, isSuccess, isLoading }] =
    useCreateProductMutation();
  const navigate = useNavigate();

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
      <Card
        title="Add Product"
        className="rounded-lg border-2 border-red-500 w-1/2"
      >
        <div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-center align-middle items-center p-5 w-full"
            encType="multipart/form-data"
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
            {isSuccess ? (
              <div>
                <button className="btn mt-2 mb-2" onClick={onHomeClick}>
                  Go to Home page
                </button>
                <button className="btn mt-2 mb-2" type="submit">
                  Add another product
                </button>
              </div>
            ) : (
              <button className="btn mt-2 mb-2" type="submit">
                Add product
              </button>
            )}

            {isLoading && <BarLoader></BarLoader>}
            {isSuccess && <p>{data.data.name} is succeesfully created</p>}
          </form>
        </div>
      </Card>
    </div>
  );
}

export default AddProduct;
