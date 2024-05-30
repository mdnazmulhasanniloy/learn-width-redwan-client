import { serverUrl } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
  }),
  tagTypes: ["user", "course", "batch", "module", "lecture"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
