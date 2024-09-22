import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ph-level-2-apollo-batch-3-assignment-4-backend.vercel.app/",
  }),
  endpoints: () => {
    return {};
  },
});
