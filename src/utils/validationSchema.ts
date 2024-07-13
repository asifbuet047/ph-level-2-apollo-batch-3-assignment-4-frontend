import { z } from "zod";

const productCreationValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
    })
    .min(3, {
      message: "product name length must be greater than 4 letter",
    }),
  description: z
    .string({
      invalid_type_error: "Description must ebs tring",
    })
    .min(10, {
      message: "Description must be greater than 10 letter",
    }),
  category: z
    .string({
      invalid_type_error: "Category must be string",
    })
    .min(5, {
      message: "Category must be greater than 5 letter",
    }),
  brand: z.string({
    invalid_type_error: "brand must be string",
  }),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be number",
    })
    .gte(1, {
      message: "Quantity must be greater than 1",
    }),
  rating: z
    .number({
      invalid_type_error: "Rating must be number",
    })
    .gte(0, {
      message: "Rating must be greater than or equal 0",
    }),
  price: z
    .number({
      invalid_type_error: "Price must be number",
    })
    .gt(0, {
      message: "Price must be greater than 0",
    }),
  product_image_url: z
    .string({
      invalid_type_error: "Product Image URL must be string",
    })
    .optional(),
});

const productUpdateValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
    })
    .min(3, {
      message: "product name length must be greater than 4 letter",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must ebs tring",
    })
    .min(10, {
      message: "Description must be greater than 10 letter",
    })
    .optional(),
  category: z
    .string({
      invalid_type_error: "Category must be string",
    })
    .min(5, {
      message: "Category must be greater than 5 letter",
    })
    .optional(),
  brand: z
    .string({
      invalid_type_error: "brand must be string",
    })
    .optional(),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be number",
    })
    .gte(1, {
      message: "Quantity must be greater than 1",
    })
    .optional(),
  rating: z
    .number({
      invalid_type_error: "Rating must be number",
    })
    .gte(0, {
      message: "Rating must be greater than or equal 0",
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: "Price must be number",
    })
    .gt(0, {
      message: "Price must be greater than 0",
    })
    .optional(),
});

export const ProductValidation = {
  productCreationValidationSchema,
  productUpdateValidationSchema,
};
