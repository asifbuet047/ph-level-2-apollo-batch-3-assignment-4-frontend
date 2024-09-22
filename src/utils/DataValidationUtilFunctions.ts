import { ProductValidation } from "./validationSchema";

export const parseInputForProductUpdateSubmit = (data:any) => {
  const temp = { ...data };
  for (const key in temp) {
    if (key === "quantity" || key === "price" || key === "rating") {
      temp[key] = Number.parseInt(temp[key]);
    }
  }
  return temp;
};

export const parseInputForProductAddSubmit = (dataObject: any) => {
  const temp = { ...dataObject };
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

export const validateWithZodSchema = (data: any) => {
  const result =
    ProductValidation.productUpdateValidationSchema.safeParse(data);
  if (result.error) {
    return result.error.issues;
  } else {
    return result.success;
  }
};
