import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsBaseApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/product",
  }),
  endpoints: () => {
    return {};
  },
});
