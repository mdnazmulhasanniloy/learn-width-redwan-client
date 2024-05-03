import { serverUrl } from "@/config";
import { coursesSchema, updateCoursesSchema } from "@/schema/courseSchema";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { z } from "zod";

export const getCourse = async () => {
  try {
    const res = await fetch(`${serverUrl}course`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const HandelToAddCourse = async (
  addCourse: Function,
  values: z.infer<typeof coursesSchema>,
  setSuccess: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void,
  setError: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void,
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void,
  form: any
) => {
  try {
    setSuccess("");
    setError("");
    values.duration = parseInt(values.duration);
    values.regularPrice = parseInt(values.regularPrice);

    const res: any = await addCourse(values);
    const data: any = { ...res.data };

    if (data?.success) {
      setSuccess(`${data?.message}`);
      toast.success(data?.message);
      setOpen(false);
      form.reset();
      setSuccess("");
      setError("");
    } else {
      let errorMessage = data?.message || "An error occurred";
      // Check if there are individual error messages
      if (data?.errorMessages) {
        // Format the individual error message
        const individualErrorMessage = data?.errorMessages?.map(
          (error: { path: string; message: string }) =>
            `${error.path}: ${error.message} \n`
        );
        errorMessage = `${errorMessage}: \n ${individualErrorMessage}`;
      }
      setError(errorMessage);
    }
  } catch (error) {
    setError("course creation failed");
  }
};

export const HandelToUpdateCourse = async (
  id: string,
  updateCourse: Function,
  values: z.infer<typeof updateCoursesSchema>,
  setSuccess: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void,
  setError: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void,
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void,
  form: any
) => {
  setSuccess("");
  setError("");
  try {
    values.duration = parseInt(values.duration);
    values.regularPrice = parseInt(values.regularPrice);

    const res: any = await updateCourse({ id, data: values });
    const data: any = { ...res.data };

    if (data?.success) {
      setSuccess(`${data?.message}`);
      toast.success(data?.message);
      setOpen(false);
      form.reset();
      setSuccess("");
      setError("");
    } else {
      let errorMessage = data?.message || "An error occurred";
      // Check if there are individual error messages
      if (data?.errorMessages) {
        // Format the individual error message
        const individualErrorMessage = data?.errorMessages?.map(
          (error: { path: string; message: string }) =>
            `${error.path}: ${error.message} \n`
        );
        errorMessage = `${errorMessage}: \n ${individualErrorMessage}`;
      }
      setError(errorMessage);
    }
  } catch (error) {
    setError("course updating failed");
  }
};

//delete batch
export const HandelToDeleteCourse = async (
  id: string,
  removeCourse: Function
) => {
  try {
    const res = await removeCourse(id);
    if (res.data.success) {
      toast.success(res.data.message, { id: "course" });
    } else if (!res.data.success) {
      toast.error(res.data.message, { id: "course" });
    }
  } catch (error: any) {
    toast.error(error.message, { id: "course" });
  }
};
