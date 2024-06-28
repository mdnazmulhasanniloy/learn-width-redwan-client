import { serverUrl } from "@/config";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: serverUrl as string,
  }),
  tagTypes: ["user", "course", "batch", "module", "lecture"],
  endpoints: (builder) => ({}),
});

export default baseApi;
