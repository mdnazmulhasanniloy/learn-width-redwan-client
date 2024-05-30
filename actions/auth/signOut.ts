import toast from "react-hot-toast";

export const SignOutAction = async (signOut: any, logOut: Function) => {
  try {
    const res: any = logOut({ data: null });
    const data: any = { ...res.data };

    if (data?.success) {
      const sign_out = await signOut();
      if (!sign_out) {
        return toast.error("sign out failed", { id: "sign_out" });
      }
      toast.success(data?.message, { id: "sign_out" });
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
      toast.error(errorMessage, { id: "sign_out" });
    }
  } catch (error: any) {
    toast.error(error.message, { id: "sign_Out" });
  }
};
