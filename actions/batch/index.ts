import { batchSchema, UpdateBatchSchema } from "@/schema/batchSchema";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import * as z from "zod";

//add batch
export const HandelToAddBatch = async (
  addBatch: Function,
  values: z.infer<typeof batchSchema>,
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
  values.duration = parseInt(values.duration);

  try {
    const res: any = await addBatch(values);
    const data: any = { ...res.data };

    if (data?.success) {
      setSuccess(`${data?.message}`);
      toast.success(data?.message);
      setOpen(false);
      form.reset();
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

//update batch
export const HandelToUpdateBatch = async (
  id: string,
  updateBatch: Function,
  values: z.infer<typeof UpdateBatchSchema>,
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

    const res: any = await updateBatch({ id, data: values });
    const data: any = { ...res.data };

    if (data?.success) {
      setSuccess(`${data?.message}`);
      toast.success(data?.message);
      setOpen(false);
      form.reset();
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
    setError("Batch updating failed");
  }
};

//delete batch
export const HandelToDeleteBatch = async (
  id: string,
  removeBatch: Function
) => {
  try {
    const res = await removeBatch(id);
    if (res.data.success) {
      toast.success(res.data.message, { id: "removeBatch" });
    } else if (!res.data.success) {
      toast.error(res.data.message, { id: "removeBatch" });
    }
  } catch (error: any) {
    toast.error(error.message, { id: "removeBatch" });
  }
};
