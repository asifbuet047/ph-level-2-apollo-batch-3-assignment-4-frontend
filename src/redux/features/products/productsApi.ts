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
        query: ({ data, file }) => {
          const formData = new FormData();
          formData.append("file", file);
          //when sending data with file FormData should send dat this way or cant be pasrsed in server side
          for (const key in data) {
            formData.append(key, data[key]);
          }
          return {
            url: "/",
            method: "POST",
            body: formData,
          };
        },
        transformResponse: (response: TReduxResponse<TProduct>) => {
          console.log(response);
          return {
            data: response.data,
          };
        },
      }),
      updateproduct: builder.mutation({
        query: (product: TProduct) => {
          console.log(product);
          return {
            url: "/",
            method: "PUT",
            body: product,
          };
        },
        transformResponse: (response: TReduxResponse<TProduct>) => {
          console.log(response);
          return {
            data: response,
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
  useUpdateproductMutation,
} = productsApi;
