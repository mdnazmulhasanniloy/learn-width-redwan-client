 
import { toast } from "sonner";

const SuccessToast = (message: string, toastId?: number | string) => {
  return toast.success(
    message,
    {
      id: toastId,
      duration: 2000,
    }
     
  );
 
};

export default SuccessToast;
