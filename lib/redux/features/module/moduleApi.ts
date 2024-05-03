"use client";
import apiSlice from "../api/apiSlice";

const moduleApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get module
    getModule: builder.query({
      query: ({ meta, search }) =>
        `/module?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
      providesTags: ["module"],
    }),

    //add module
    addModule: builder.mutation({
      query: (data) => ({
        url: "/module/create-module",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["module"],
    }),

    //update module
    updateModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `module/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["module"],
    }),

    //delete module
    removeModule: builder.mutation({
      query: (id) => ({
        url: `module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["module"],
    }),
  }),
});

export const {
  useGetModuleQuery,
  useAddModuleMutation,
  useUpdateModuleMutation,
  useRemoveModuleMutation,
} = moduleApi;
