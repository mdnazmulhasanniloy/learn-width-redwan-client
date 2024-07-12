import { tagTypes } from "../tag_types";
import { IMeta } from "@/types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
const USER_URL = "/users";
const COURSE_URL = "/course";
const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (loginData: any) => ({
        url: `${COURSE_URL}/create-course`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    getAllCourse: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${COURSE_URL}/`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.course],
    }),

    getCourseById: builder.query({
      query: ({ id }) => ({
        url: `/course/${id}`,
        method: "GET",
        // params: { id },
      }),
      providesTags: [tagTypes.course],
    }),

    //add course
    // addCourse: builder.mutation({
    //   query: (data) => ({
    //     url: "/course/create-course",
    //     method: "POST",
    //     credentials: "include",
    //     body: data,
    //   }),
    //   invalidatesTags: ["course"],
    // }),

    //update course
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `course/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),

    //delete course
    removeCourse: builder.mutation({
      query: (id) => ({
        url: `course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useRemoveCourseMutation,
} = courseApi;
