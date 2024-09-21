import { Card } from "antd";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import SingleProductCardComponent from "../components/SingleProductCardComponent";
import { useEffect, useRef, useState } from "react";
import { parseInputForProductAddSubmit } from "../utils/DataValidationUtilFunctions";
import { useCreateProductMutation } from "../redux/api/allApiEndpoints";
import { toast } from "react-toastify";
import { Button, TextField, ThemeProvider } from "@mui/material";
import Rating from "react-rating";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { myCustomMuiTheme } from "../utils/myCustomMuiTheme";

function AddProductPage() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [creatProduct, { data, isError, isSuccess, isLoading, error }] =
    useCreateProductMutation();
  const navigate = useNavigate();
  const refForWidth = useRef(null);
  const [viewWidth, setViewWidth] = useState(0);

  if (isError) {
    toast.error("Product addition error. Please try later");
  }
  if (isSuccess) {
    toast.success(`${getValues().name} is successfully created`);
  }

  useEffect(() => {
    if (refForWidth.current) {
      setViewWidth(refForWidth.current.offsetWidth);
    }
  }, []);

  const submit = () => {
    creatProduct(parseInputForProductAddSubmit(getValues()));
  };
  return (
    <div className="flex flex-col items-center justify-between align-middle w-full bg-[#C0F5FA] py-2">
      <Card title="Add Product" className="md:w-1/2">
        <div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-center align-middle items-center p-5"
            encType="multipart/form-data"
            ref={refForWidth}
          >
            {isLoading ? (
              <TextField
                error={errors.name ? true : false}
                variant="outlined"
                label="Product name"
                fullWidth
                disabled
                type="text"
                placeholder="Product name"
                sx={{ marginBottom: 2 }}
                {...register("name", { required: true, minLength: 4 })}
              />
            ) : (
              <TextField
                error={errors.name ? true : false}
                variant="outlined"
                label="Product name"
                fullWidth
                type="text"
                placeholder="Product name"
                sx={{ marginBottom: 2 }}
                {...register("name", { required: true, minLength: 4 })}
              />
            )}

            {errors.name && <p>Name is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Product description"
                placeholder="Product description"
                error={errors.description ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("description", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Product description"
                placeholder="Product description"
                error={errors.description ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                {...register("description", { required: true })}
              />
            )}
            {errors.description && <p>Description is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Product category"
                placeholder="Product category"
                className="mt-2 mb-2"
                error={errors.category ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("category", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Product category"
                placeholder="Product category"
                className="mt-2 mb-2"
                error={errors.category ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                {...register("category", { required: true })}
              />
            )}

            {errors.category && <p>Category is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Product brand"
                placeholder="Product brand"
                className="mt-2 mb-2"
                error={errors.brand ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("brand", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Product brand"
                placeholder="Product brand"
                className="mt-2 mb-2"
                error={errors.brand ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                {...register("brand", { required: true })}
              />
            )}

            {errors.brand && <p>Brand is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="number"
                label="Product quantity"
                placeholder="Product quantity"
                className="mt-2 mb-2"
                error={errors.quantity ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("quantity", { required: true, min: 1 })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="number"
                label="Product quantity"
                placeholder="Product quantity"
                className="mt-2 mb-2"
                error={errors.quantity ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                {...register("quantity", { required: true, min: 1 })}
              />
            )}

            {errors.quantity && <p>Quantity is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="number"
                label="Product price"
                placeholder="Product price"
                className="mt-2 mb-2"
                error={errors.price ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("price", { required: true, min: 0 })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="number"
                label="Product price"
                placeholder="Product price"
                className="mt-2 mb-2"
                error={errors.price ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                {...register("price", { required: true, min: 0 })}
              />
            )}

            {errors.price && <p>Price is required</p>}

            {isLoading ? (
              <Rating
                readonly
                initialRating={getValues().rating ? getValues().rating : 1}
                emptySymbol={<StarBorderOutlinedIcon className="w-28 h-28" />}
                fullSymbol={<StarOutlinedIcon className="w-28 h-28" />}
                stop={10}
                className="w-full text-center"
                onChange={(value) => setValue("rating", value)}
              />
            ) : (
              <Rating
                initialRating={1}
                emptySymbol={<StarBorderOutlinedIcon className="w-28 h-28" />}
                fullSymbol={<StarOutlinedIcon className="w-28 h-28" />}
                stop={10}
                className="w-full text-center"
                onChange={(value) => setValue("rating", value)}
              />
            )}

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

            {!isSuccess ? (
              <Button
                variant="contained"
                className="btn mt-2 mb-2"
                type="submit"
                disabled={isLoading}
              >
                Add product
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
        </div>
      </Card>
    </div>
  );
}

export default AddProductPage;
