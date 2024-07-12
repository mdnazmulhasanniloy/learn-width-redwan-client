import axios from "axios";
import { RootState } from "@/redux/store";
import { getFromLocalStorage } from "@/utils/local-storage";
import { responseErrorType } from "@/types";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post["Accept"] = "application/json";
instance.defaults.timeout = 6000;

instance.interceptors.request.use(
  function (config) {
    //  const state: any = getState() as RootState;
    const otpToken = getFromLocalStorage("otpToken");
    const accessToken = getFromLocalStorage("accessToken");
    //  const token = state?.auth?.token;

    //  if (token) {
    //    config.headers.Authorization = `Bearer ${token}`;
    //  }

    if (otpToken) {
      config.headers.Authorization = `Bearer ${otpToken}`;
    }
    if (accessToken) {
      // console.log("-------------------->accessToken: " + accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // const responseObject: responseSuccessType = {
    //   data: response?.data?.data,
    //   meta: response?.data?.meta,
    // };
    // return responseObject;
    return response;
  },
  function (error) {
    console.log("===================?>", error);

    const responseObject: responseErrorType = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.messages || "something went wrong",
      errorMessages: error?.response?.data?.errorMessages,
    };
    // return responseObject;
    return Promise.reject(error);
  }
);

export { instance };
