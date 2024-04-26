"use client";
import apiSlice from "../api/apiSlice";

const batchApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getBatch: builder.query({
      query: ({ meta, search }) =>
        `/batch?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
    }),

    //add course
    addBatch: builder.mutation({
      query: (data) => ({
        url: "/batch/create-batch",
        method: "POST",
        body: data,
      }),
    }),

    //delete course
    // delete category
    removeBatch: builder.mutation({
      query: (id) => ({
        url: `batch/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetBatchQuery, useAddBatchMutation, useRemoveBatchMutation } =
  batchApi;
