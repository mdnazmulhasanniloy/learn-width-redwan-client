import { serverUrl } from "@/config";

export const getCourse = async () => {
  try {
    const res = await fetch(`${serverUrl}course`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
