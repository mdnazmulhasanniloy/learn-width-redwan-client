"use client";
import apiSlice from "../api/apiSlice";

const lectureApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get Lecture
    getLecture: builder.query({
      query: ({ meta, search }) =>
        `/lecture?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
      providesTags: ["lecture"],
    }),

    //add lecture
    addLecture: builder.mutation({
      query: (data) => ({
        url: "/lecture/create-lecture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["lecture"],
    }),

    //update lecture
    updateLecture: builder.mutation({
      query: ({ id, data }) => ({
        url: `lecture/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["lecture"],
    }),

    //delete lecture
    removeLecture: builder.mutation({
      query: (id) => ({
        url: `lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lecture"],
    }),
  }),
});

export const {
  useGetLectureQuery,
  useAddLectureMutation,
  useUpdateLectureMutation,
  useRemoveLectureMutation,
} = lectureApi;
