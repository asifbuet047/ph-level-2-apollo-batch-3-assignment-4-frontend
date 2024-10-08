import {
  TDiscount,
  TGenericSuccessfulResponse,
  TOrder,
  TPaymentIntentParams,
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
        transformErrorResponse: (response) => {
          return {
            error: response.data,
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
            data: response.data,
          };
        },
      }),
      getProduct: builder.query({
        query: (productId: string) => {
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
      deleteProduct: builder.mutation({
        query: (productId: string) => {
          return {
            url: `/product/${productId}`,
            method: "DELETE",
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
        transformErrorResponse: (response) => {
          return {
            error: response.data,
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
      getStripePaymentIntent: builder.query({
        query: (paymentIntentParams: Partial<TPaymentIntentParams>) => {
          return {
            url: "/order/secret",
            method: "POST",
            timeout: 3000,
            body: paymentIntentParams,
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<any>) => {
          return {
            data: response.data,
          };
        },
      }),

      creatOrder: builder.mutation({
        query: (order) => {
          return {
            url: "/order",
            method: "POST",
            body: order,
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TOrder>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (error) => {
          return {
            data: error.data,
          };
        },
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useCreatOrderMutation,
  useGetProductQuery,
  useLazyGetProductQuery,
  useGetAllProductsQuery,
  useUpdateproductMutation,
  useGetAllDiscountsQuery,
  useGetLatestProductsQuery,
  useGetCategoriesQuery,
  useGetStripePaymentIntentQuery,
  useDeleteProductMutation,
} = allApiEndPoints;
