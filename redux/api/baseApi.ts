import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; 
import { serverUrl } from "@/config";
import ErrorToast from "@/components/toast/errorToast";
import { tagTypes, tagTypesList } from "../tag_types";
import { getFromLocalStorage } from "@/utils/local-storage";
// import { logout, setUser } from "../features/auth/authSlice";  
const baseQuery = fetchBaseQuery({
  baseUrl: serverUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    
    const otpToken = getFromLocalStorage("otpToken");
    const accessToken = getFromLocalStorage("accessToken");
    

    if (otpToken) {
      headers.set("authorization", `Bearer ${otpToken}`);
    }
    if (accessToken) { 
      headers.set("authorization", `Bearer ${accessToken}`);
    }
 

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result?.error?.status === 404) {
    ErrorToast((result.error.data as any).message); 
  }
  if (result?.error?.status === 403) {
    ErrorToast((result.error.data as any).message); 
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch(
      `${serverUrl}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log("data", data);
    // if (data?.data?.accessToken) {
    //   const user = (api.getState() as RootState).auth.user;

    //   api.dispatch(
    //     setUser({
    //       user,
    //       token: data.data.accessToken,
    //     })
    //   );

    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(logout());
    // }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
