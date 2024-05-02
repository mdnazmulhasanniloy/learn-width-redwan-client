"use client";
import apiSlice from "../api/apiSlice";

const batchApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    getBatch: builder.query({
      query: ({ meta, search }) =>
        `/batch?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
      providesTags: ["batch"],
    }),

    //add course
    addBatch: builder.mutation({
      query: (data) => ({
        url: "/batch/create-batch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["batch"],
    }),

    //update batch
    updateBatch: builder.mutation({
      query: ({ id, data }) => ({
        url: `batch/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["batch"],
    }),

    //delete course
    removeBatch: builder.mutation({
      query: (id) => ({
        url: `batch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["batch"],
    }),
  }),
});

// const batchApi = apiSlice?.injectEndpoints({
//   endpoints: (builder) => ({
//     // get categories
//     getBatch: builder.query({
//       query: ({ meta, search }) =>
//         `/batch?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
//       providesTags: ["batch"],
//     }),

//     //add course
//     addBatch: builder.mutation({
//       query: (data) => ({
//         url: "/batch/create-batch",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["batch"],
//     }),

//     //delete course
//     // delete category
//     removeBatch: builder.mutation({
//       query: (id) => ({
//         url: `batch/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["batch"],
//     }),
//   }),
// });

export const {
  useGetBatchQuery,
  useAddBatchMutation,
  useUpdateBatchMutation,
  useRemoveBatchMutation,
} = batchApi;
