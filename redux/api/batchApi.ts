import { tagTypes } from "../tag_types";
import { baseApi } from "./baseApi";

const batchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBatch: builder.query({
      query: ({ arg }) => ({
        url: "/batch",
        method: "GET",
        params: arg,
      }),
      // `/batch?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
      providesTags: [tagTypes.batch],
    }),

    //add course
    addBatch: builder.mutation({
      query: (data) => ({
        url: "/batch/create-batch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.batch],
    }),

    //update batch
    updateBatch: builder.mutation({
      query: ({ id, data }) => ({
        url: `batch/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.batch],
    }),

    //delete course
    removeBatch: builder.mutation({
      query: (id) => ({
        url: `batch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.batch],
    }),
  }),
});

export const {
  useAddBatchMutation,
  useGetBatchQuery,
  useRemoveBatchMutation,
  useUpdateBatchMutation,
} = batchApi;
