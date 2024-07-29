"use client";
import { tagTypes } from "../tag_types";
import { baseApi } from "./baseApi";

const moduleApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    // get module
    getModule: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `/module`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes?.module],
    }),

    //add module
    addModule: builder.mutation({
      query: (data) => ({
        url: "/module/create-module",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.module],
    }),

    //update module
    updateModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `module/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes?.module],
    }),

    //delete module
    removeModule: builder.mutation({
      query: (id) => ({
        url: `module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.module],
    }),
  }),
});

export const {
  useGetModuleQuery,
  useAddModuleMutation,
  useUpdateModuleMutation,
  useRemoveModuleMutation,
} = moduleApi;
