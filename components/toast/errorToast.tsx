import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "sonner";

const ErrorToast = (error: any, toastId?: number | string) => {
  const title = error.message || "An error occurred";
  let errorMessage = null;
  // Check if there are individual error messages
  if (error?.errorMessages) {
    // Format the individual error message
    const individualErrorMessage = error?.errorMessages?.map(
      (error: { path: string; message: string }) =>
        `${error.path}: ${error.message} \n`
    );
    errorMessage = `${title}: \n ${individualErrorMessage}`;
  }
  // toast.success("Event has been created");

  return toast.error(
    errorMessage,
    {
      id: toastId,
      duration: 2000,
    }
    // {
    // variant: "destructive",
    // title: title,
    // description: errorMessage,
    // action: <ToastAction altText="Try again">Try again</ToastAction>,
    // }
  );
};

export default ErrorToast;
