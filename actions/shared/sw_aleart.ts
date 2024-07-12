// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// export const handelToActive = async (
//   id: string,
//   value: Boolean,
//   updateItem: Function
// ) => {
//   try {
//     const data = { isActive: value };
//     const res = await updateItem({ id, data: data });
//     if (res.data.success) {
//       toast.success(res.data.message, { id: "updateItem" });
//     } else if (!res.data.success) {
//       toast.error(res.data.message, { id: "updateItem" });
//     }
//   } catch (error: any) {
//     toast.error(error.message, { id: "updateItem" });
//   }
// };

// export const UpdateItem = async (id: string, UpdateItem: Function, data:any) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then(async (result: any) => {
//     if (result.isConfirmed) {
//       try {
//         const res = await UpdateItem(id, data);
//         if (res.data.success) {
//           toast.success(res.data.message, { id: "removeItem" });
//         } else if (!res.data.success) {
//           toast.error(res.data.message, { id: "removeItem" });
//         }
//       } catch (error: any) {
//         toast.error(error.message, { id: "removeItem" });
//       }
//     }
//   });
// };
