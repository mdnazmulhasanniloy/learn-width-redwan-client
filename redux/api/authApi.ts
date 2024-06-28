import baseApi from "@/redux/api/baseApi";

const AUTH_URL = "/auth";
const USER_URL = "/users";
const OTP_URL = "/otp";
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/sign-in`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    userRegistration: build.mutation({
      query: (registrationData) => ({
        url: `${USER_URL}/create-user`,
        method: "POST",
        data: registrationData,
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: build.mutation({
      query: ({ data, otpToken }) => ({
        url: `${OTP_URL}/verify-otp`,
        method: "POST",
        headers: {
          token: otpToken,
        },
        data: data,
      }),
      invalidatesTags: ["user"],
    }),
    resendOtp: build.mutation({
      query: (email) => ({
        url: `${OTP_URL}/resend-otp`,
        method: "POST",
        data: email,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegistrationMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = authApi;
