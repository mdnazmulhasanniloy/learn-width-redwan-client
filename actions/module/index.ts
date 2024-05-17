import { moduleSchema, UpdateModuleSchema } from "@/schema/moduleSchema";
import toast from "react-hot-toast";
import { z } from "zod";

//add module
export const HandelToAddModule = async (
  addModule: Function,
  values: z.infer<typeof moduleSchema>,
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
    const res: any = await addModule(values);
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
    setError("Batch creation failed");
  }
};

//update module
export const HandelToUpdateModule = async (
  id: string,
  updateModule: Function,
  values: z.infer<typeof UpdateModuleSchema>,
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
    const res: any = await updateModule({ id, data: values });
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
    setError("Module updating failed");
  }
};

 