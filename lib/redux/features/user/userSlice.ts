import apiSlice from "../../../../redux/api/baseApi";

const userApi = apiSlice?.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ meta, search }) =>
        `/auth?searchTerm=${search}&limit=${meta.limit}&page=${meta?.page}&total=${meta?.total}`,
      providesTags: ["user"],
    }),
    getUserByEmail: builder.query({
      query: ({ email }) => `/users/${email}`,
      providesTags: ["user"],
    }),

    //add user
    uerRegister: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    uerLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    userLogout: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-out",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUerRegisterMutation,
  useUerLoginMutation,
  useUserLogoutMutation,
  useGetUserByEmailQuery,
} = userApi;
