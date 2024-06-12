import * as z from "zod";
import { addLectureSchema, updateLectureSchema } from "@/schema/lectureSchema";
import toast from "react-hot-toast";

export const ValidVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

export const handelToAddLecture = async (
  addLecture: Function,
  values: z.infer<typeof addLectureSchema>,
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
  try {
    setSuccess("");
    setError("");

    //check video type
    if (
      values.video &&
      !ValidVideoTypes.find((type) => type === values.video.type)
    ) {
      setError("Only .mp4, .webm and .ogg formats are supported.");
      return;
    }

    const formData = new FormData();

    formData.append("video", values.video); // Use consistent key

    const value = JSON.stringify(values);
    formData.append("data", value);
    // Append other form data
    // Object.entries(values).forEach(([key, value]) => {
    //   if (key !== "video") {
    //     formData.append(key, value);
    //   }
    // });

    // values.video = formData;

    const res: any = await addLecture(formData);

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
    setError("lecture creation failed");
  }
};

export const handelToUpdateLecture = async (
  id: string,
  updateLecture: Function,
  values: z.infer<typeof updateLectureSchema>,
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
  setSuccess("");
  setError("");

  const formData = new FormData();

  try {
    if (values?.video) {
      if (!ValidVideoTypes.includes(values.video.type)) {
        setError("Only .mp4, .webm and .ogg formats are supported.");
        return;
      }
      formData.append("video", values.video);
    }

    const value = JSON.stringify(values);
    formData.append("data", value);

    // Append other form data
    // await Object.entries(values).forEach(([key, value]) => {
    //   if (key !== "video") {
    //     formData.append(key, value);
    //   }
    // });

    const res: any = await updateLecture({ id, data: formData });
    const data: any = res.data;

    if (data?.success) {
      setSuccess(data.message);
      toast.success(data.message);
      setOpen(false);
      forms.reset();
      setSuccess("");
      setError("");
    } else {
      let errorMessage = data?.message || "An error occurred";
      // Check if there are individual error messages
      if (data?.errorMessages) {
        // Format the individual error messages
        const individualErrorMessages = data.errorMessages
          .map(
            (error: { path: string; message: string }) =>
              `${error.path}: ${error.message}`
          )
          .join("\n");
        errorMessage = `${errorMessage}:\n${individualErrorMessages}`;
      }
      setError(errorMessage);
    }
  } catch (error) {
    setError("Lecture updating failed");
  }
};
