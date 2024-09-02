"use client";
 
import React, { useState } from "react";  
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from "@/redux/api/authApi";
import { DataTable } from "./_components/data-table"; 
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button"
import { IUser } from "@/types/user.interface"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, } from "lucide-react"
import { CgUnblock } from "react-icons/cg";
import { MdBlockFlipped } from "react-icons/md";
import { Dialog } from "@radix-ui/react-dialog";
import UserDetails from "./_components/user-details";
import { toast } from "sonner";
import { duration } from "moment";
import ErrorToast from "@/components/toast/errorToast";
import { ConfirmModal } from "@/actions/shared/shared";

const UsersPage = () => {  
    const [blockFn] = useBlockUserMutation()
    const [unblockFn] = useUnblockUserMutation()
  const [search, setSearch] = useState<string | null | undefined>(""); 

  const [open, setOpen] = useState(false); 
  const [modalData, setModalData] = useState<IUser | null>(null); 

   
  const query:Record<string, any> = {}
  query["limit"]=999999999999999
  query["searchTerm"]=search
    const {data:allUsersRes}= useGetAllUsersQuery(query)
    const allUsers =allUsersRes?.data ||[] 

// const handelToBlockUser = async(id:string)=>{
//     const toastId = {id:"block", duration:3000}
//     toast.loading("Blocking...", toastId)
//     try {
//         const res = await blockFn(id).unwrap();
//         toast.success(res.message, toastId)
//     } catch (error) {
//         ErrorToast(error, "block")
//     }
// }
// const handelToUnBlockUser = async(id:string)=>{
//     const toastId = {id:"unblock", duration:3000}
//     toast.loading("Blocking...", toastId)
//     try {
//         const res = await blockFn(id).unwrap();
//         toast.success(res.message, toastId)
//     } catch (error) {
//         ErrorToast(error, "unblock")
//     }
// }
    const columns: ColumnDef<IUser>[] = [
        {
          accessorKey: "studentId",
          header: "id",
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "email",
          // header: "Email",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        },
        {
          accessorKey: "role",
          header: "Role",
        },
        {
          accessorKey: "phoneNumber",
          header: "Phone Number",
        },
        {
          accessorKey: "userStatus",
          header: "Status",
          cell:({row})=>{  
            return(
              row.getValue("userStatus") === "active" ?
              <button className="px-3 py-2 bg-green-50 text-green-700">{row.getValue("userStatus")}</button>
              :<button className="px-3 py-2 bg-red-50 text-red-700">{row.getValue("userStatus")}</button>
          )
          }
        },
        {
          accessorKey: "Actions",
          header: "Actions",
          cell:({row})=>{  
            return(
              <div className="flex gap-3 items-center">
                 <button 
              className="flex gap-2"
              onClick={() =>{ setOpen(!open), setModalData(row?.original)}}
            >
               <Eye size={22} /> 
            </button>
            
                              
                               {row.getValue("userStatus") === "active"?
                               <button onClick={async()=>ConfirmModal(row?.original?._id as string, blockFn, "Yes, Block it!")}  className=" text-green-400 p-2 text-sm rounded-full cursor-pointer"> 
      
                                 <CgUnblock size={22}/>
                               </button>
                              : 
                              <button onClick={async()=>ConfirmModal(row?.original?._id as string, unblockFn, "Yes, Unblock it!")}  className="  text-red-400 p-2 text-sm rounded-full cursor-pointer">
      
                                <MdBlockFlipped size={22} />
                              </button>
                              } 
              
              </div>
            )
          }
        }
      ] 

 
    return (
        <div className="w-11/12 mx-auto mt-10">
            <div className="flex justify-end mb-4 relative">
        <input
            type="text"
            placeholder="Search..."
            value={search || ""}
            className="border border-sky-400 rounded-full px-2 py-2"
            onChange={(e) => setSearch(e.target.value)}
            />
<Search className="text-md absolute top-2 right-3 text-sky-400" />
            </div>
            <DataTable columns={columns} data={allUsers}/>

           
           { 
           modalData && <Dialog onOpenChange={setOpen} open={open}>
             <UserDetails modalData={modalData}/>
           </Dialog>
           }
          
        </div>
    );

 
 
};

export default UsersPage;
