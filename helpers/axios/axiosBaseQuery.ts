import { AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError } from "axios";
import { instance as axiosInstance } from "./axiosInstance";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      // // Prepare headers here
      // const headers: AxiosRequestConfig["headers"] = {};

      // headers["X-Custom-Header"] = "MyCustomHeaderValue";

      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: { contentType: contentType || "application/json" },
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;

// import axios, { AxiosRequestConfig } from 'axios';
// import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
// import { AxiosError } from 'axios';
// import { RootState } from '@/store'; // Adjust the path to your store
// import { GetState } from '@reduxjs/toolkit';

// const axiosBaseQuery = (
//   { baseUrl }: { baseUrl: string } = { baseUrl: '' }
// ): BaseQueryFn<
//   { url: string; method: AxiosRequestConfig['method']; data?: any; params?: any },
//   unknown,
//   unknown
// > => async ({ url, method, data, params }, { getState }) => {
//   try {
//     // Prepare headers here
//     const headers: AxiosRequestConfig['headers'] = {};

//     const state = getState() as RootState;
//     const token = state.auth.token;
//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }
//     headers['X-Custom-Header'] = 'MyCustomHeaderValue';

//     const result = await axios({
//       url: baseUrl + url,
//       method,
//       data,
//       params,
//       headers,
//     });
//     return { data: result.data };
//   } catch (axiosError) {
//     let err = axiosError as AxiosError;
//     return {
//       error: {
//         status: err.response?.status,
//         data: err.response?.data || err.message,
//       },
//     };
//   }
// };

// export default axiosBaseQuery;
