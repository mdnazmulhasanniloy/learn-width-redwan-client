import ErrorToast from "@/components/toast/errorToast"; 
import { toast } from "sonner";
import Swal from "sweetalert2";

export const handelToActive = async (
  id: string,
  value: Boolean,
  updateItem: Function
) => {
  try {
    const data = { isActive: value };
    const res = await updateItem({ id, data: data });
    if (res.data.success) {
      toast.success(res.data.message, { id: "updateItem" });
    } else if (!res.data.success) {
      toast.error(res.data.message, { id: "updateItem" });
    }
  } catch (error: any) {
    toast.error(error.message, { id: "updateItem" });
  }
};

export const handelToDelete = async (id: string, removeItem: Function) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      try {
        const res = await removeItem(id).unwrap() 
        toast.success(res.message, {id:"removeItem", duration: 3000}); 
      } catch (error: any) {
        ErrorToast(error, "removeItem") 
      }
    }
  });
};
export const ConfirmModal = async (id: string, action: Function, buttonText?:string, toastId?:string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: buttonText || "Yes, Do it!",
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      try {
        const res = await action(id).unwrap() 
        toast.success(res.message, {id:toastId, duration: 3000}); 
      } catch (error: any) {
        ErrorToast(error, toastId) 
      }
    }
  });
};
