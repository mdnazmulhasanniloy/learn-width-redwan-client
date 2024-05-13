import { serverUrl } from "@/config";
import { coursesSchema, updateCoursesSchema } from "@/schema/courseSchema";
import toast from "react-hot-toast";
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
  forms: any
) => {
  const ValidImageTypes = ["image/png", "image/jpeg", "image/jpg"];

  try {
    setSuccess("");
    setError("");

    //check thumbnail type
    if (
      values.thumbnail &&
      !ValidImageTypes.find((type) => type === values.thumbnail.type)
    ) {
      setError("Only .jpg,.jpeg and .png  formats are supported.");
      return;
    }

    // const form = new FormData();
    // form.append("image", values?.thumbnail);

    // const res: any = await addCourse({ ...values, form });
    const formData = new FormData();

    formData.append("thumbnail", values.thumbnail); // Use consistent key

    // Append other form data
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "thumbnail") {
        formData.append(key, value);
      }
    });

    const res: any = await addCourse(formData);

    const data: any = { ...res.data };

    if (data?.success) {
      setSuccess(`${data?.message}`);
      toast.success(data?.message);
      setOpen(false);
      forms.reset();
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
