import {
  TGenericSuccessfulResponse,
  TProduct,
  TReduxResponse,
} from "../../../types/AllTypes";
import { productsBaseApi } from "../../api/productsBaseApi";

export const productsApi = productsBaseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation({
        query: (product) => {
          console.log(product);
          return {
            url: "/",
            method: "POST",
            body: product,
          };
        },
      }),
      getProduct: builder.query({
        query: (productId) => {
          return {
            url: `/${productId}`,
            method: "GET",
          };
        },
        transformResponse: (response: TReduxResponse<TProduct>) => {
          console.log(response);
          return {
            data: response.data,
          };
        },
      }),
      getAllProducts: builder.query({
        query: () => {
          return {
            url: "/",
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
    };
  },
});

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useGetAllProductsQuery,
} = productsApi;
