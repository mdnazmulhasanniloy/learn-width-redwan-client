"use client";
import apiSlice from "../api/apiSlice";

const coursesApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    // get categories
    getCourse: builder.query({
      query: ({ meta, search, sortBy = "", sortOrder = "asc" }) =>
        `/course?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      providesTags: ["course"],
    }),

    //get course by id
    getCourseById: builder.query({
      query: ({ id }) => `/course/${id}`,
      providesTags: ["course"],
    }),

    //add course
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        credentials: "include",
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
  useGetCourseByIdQuery,
  useAddCourseMutation,
  useRemoveCourseMutation,
  useUpdateCourseMutation,
} = coursesApi;
