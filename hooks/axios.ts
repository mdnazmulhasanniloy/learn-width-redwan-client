import { serverUrl } from "@/config";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: serverUrl,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosClient;
