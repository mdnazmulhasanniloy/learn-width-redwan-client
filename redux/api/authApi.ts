import { tagTypes } from "../tag_types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
const USER_URL = "/users";
const OTP_URL = "/otp";
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData: any) => ({
        url: `${AUTH_URL}/sign-in`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userRegistration: build.mutation({
      query: (registrationData: any) => ({
        url: `${USER_URL}/create-user`,
        method: "POST",
        data: registrationData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    verifyOtp: build.mutation({
      query: (data: any) => ({
        url: `${OTP_URL}/verify-otp`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    resendOtp: build.mutation({
      query: (email: any) => ({
        url: `${OTP_URL}/resend-otp`,
        method: "POST",
        data: email,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    clearDevice: build.mutation({
      query: (email: any) => ({
        url: `${AUTH_URL}/clear-session`,
        method: "POST",
        data: email,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    signOut: build.mutation({
      query: (email: any) => ({
        url: `${AUTH_URL}/sign-out`,
        method: "POST",
        data: email,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegistrationMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useClearDeviceMutation,
  useSignOutMutation,
} = authApi;
