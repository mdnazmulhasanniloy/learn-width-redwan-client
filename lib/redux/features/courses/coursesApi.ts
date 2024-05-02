"use client";
import apiSlice from "../api/apiSlice";

const coursesApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCourse: builder.query({
      query: ({ meta, search }) =>
        `/course?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
      providesTags: ["course"],
    }),

    //add course
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),

    //update course
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `course/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),

    //delete course
    removeCourse: builder.mutation({
      query: (id) => ({
        url: `course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useAddCourseMutation,
  useRemoveCourseMutation,
  useUpdateCourseMutation,
} = coursesApi;
