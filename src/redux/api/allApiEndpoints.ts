import {
  TDiscount,
  TGenericSuccessfulResponse,
  TProduct,
  TReduxResponse,
} from "../../types/AllTypes";
import { baseApi } from "./baseApi";

export const allApiEndPoints = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        query: ({ data, file }) => {
          const formData = new FormData();
          formData.append("file", file);
          //when sending data with file FormData should send data this way or cant be parsed in server side
          for (const key in data) {
            formData.append(key, data[key]);
          }
          return {
            url: "/product",
            method: "POST",
            body: formData,
          };
        },
        transformResponse: (response: TReduxResponse<TProduct>) => {
          return {
            data: response.data,
          };
        },
      }),
      updateproduct: builder.mutation({
        query: (product: TProduct) => {
          return {
            url: `/product/${product._id}`,
            method: "PUT",
            body: product,
          };
        },
        transformResponse: (response: TReduxResponse<TProduct>) => {
          return {
            response: response.data,
          };
        },
      }),
      getProduct: builder.query({
        query: (productId) => {
          return {
            url: `/product/${productId}`,
            method: "GET",
          };
        },
        transformResponse: (response: TReduxResponse<TProduct>) => {
          return {
            data: response.data,
          };
        },
      }),
      getAllProducts: builder.query({
        query: () => {
          return {
            url: "/product",
            method: "GET",
          };
        },
        transformResponse: (
          response: TGenericSuccessfulResponse<TProduct[]>
        ) => {
          return {
            data: response.data,
          };
        },
      }),
      getAllDiscounts: builder.query({
        query: () => {
          return {
            url: "/discount",
            method: "GET",
          };
        },
        transformResponse: (
          response: TGenericSuccessfulResponse<TDiscount[]>
        ) => {
          return {
            data: response.data,
          };
        },
      }),
      getLatestProducts: builder.query({
        query: () => {
          return {
            url: "/product?latest=1",
            method: "GET",
          };
        },
        transformResponse: (
          response: TGenericSuccessfulResponse<TProduct[]>
        ) => {
          return {
            data: response.data,
          };
        },
      }),
      getCategories: builder.query({
        query: () => {
          return {
            url: "/product/categories",
            method: "GET",
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<string[]>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            data: response.data,
          };
        },
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useGetAllProductsQuery,
  useUpdateproductMutation,
  useGetAllDiscountsQuery,
  useGetLatestProductsQuery,
  useGetCategoriesQuery,
} = allApiEndPoints;
