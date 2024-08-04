"use client";
import { tagTypes } from "../tag_types";
import { baseApi } from "./baseApi";

 

const lectureApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    // get Lecture
    getLecture: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `/lecture`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.lecture],
    }),

    //add lecture
    addLecture: builder.mutation({
      query: (data) => ({
        url: "/lecture/create-lecture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.lecture],
    }),

    //update lecture
    updateLecture: builder.mutation({
      query: ({ id, data }) => ({
        url: `lecture/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.lecture],
    }),

    //delete lecture
    removeLecture: builder.mutation({
      query: (id) => ({
        url: `lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.lecture],
    }),
  }),
});

export const {
  useGetLectureQuery,
  useAddLectureMutation,
  useUpdateLectureMutation,
  useRemoveLectureMutation,
} = lectureApi;
