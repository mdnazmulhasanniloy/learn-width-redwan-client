"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AddModuleDialog from "./add-module-dialog";
import UpdateModuleDialog from "./update-module-dialog";
import { handelToActive, handelToDelete } from "@/actions/shared/shared";
import {
  useRemoveModuleMutation,
  useUpdateModuleMutation,
} from "@/redux/api/modules";
import { Pagination } from "react-pagination-bar";
import EmptyData from "@/components/ui/emptyData";
import { toast } from "sonner";

type DataTableProps = {
  data: any[]; // Change 'any' to the actual type of your data array if possible
  meta: Record<string, any>; // Change 'Record<string, any>' to the actual type of your meta object if possible
  setSearch: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
  setPage: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
  setLimit: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
};

const DataTable = ({
  data,
  meta,
  setPage, 
  setSearch,
}: DataTableProps) => {
  const [deleteModule, deleteResult] = useRemoveModuleMutation();
  const [updateModule, updateResult] = useUpdateModuleMutation();
  const [open, setOpen] = useState(false);
  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false);
  const [moduleData, setModuleData] = useState({});

  useEffect(() => {
    if (deleteResult?.isLoading) {
      toast.loading("Deleting...", { id: "removeItem" });
    }
    if (deleteResult?.isSuccess) {
      toast.success(deleteResult.data?.message, { id: "removeItem" });
    }
  }, [deleteResult, updateResult]);

  return (
    <div className="flex flex-col justify-center h-full mx-auto text-center">
      <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
        <header className="px-5 py-4 border-b border-gray-100">
          <div className="my-5">
            <Title>Module</Title>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-5">
            <input
              type="text"
              placeholder="Search modules"
              onInput={(e) => setSearch((e.target as HTMLInputElement)?.value)}
              className="p-3 border border-sky-400"
            />
            <Button
              variant="default"
              className="flex gap-2"
              onClick={() => setOpen(!open)}
            >
              Add Module <Plus />
            </Button>
          </div>
        </header>
        <div className="p-3">
          <div className="max-w-[90vw] overflow-x-auto">
            <table className="table-auto w-full font-poppins overflow-x-auto">
              <thead className="text-xs font-semibold uppercase bg-gray-100">
                <tr>
                  <th className="p-2 whitespace-nowrap w-[5%]">
                    <div className="font-semibold text-center">SL No:</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[20%]">
                    <div className="font-semibold text-center">Module Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Module ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Course Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Batch Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {data?.length > 0 ? (
                  data?.map((item: any, i: number) => (
                    <tr key={item?._id}>
                      <td className="p-2 whitespace-nowrap text-center">
                        <div className="flex items-center">{i + 1}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap text-center">
                        {item?.moduleName}
                      </td>
                      <td className="p-2 whitespace-nowrap text-center">
                        {item?.id}
                      </td>
                      <td className="p-2 whitespace-nowrap text-center">
                        {item?.course?.name}
                      </td>
                      <td className="p-2 whitespace-nowrap text-center">
                        {item?.batch?.name}
                      </td>
                      <td className="p-2 whitespace-nowrap text-center">
                        <div
                          className="mx-auto flex w-[100px] gap-2 justify-center"
                          onClick={() =>
                            handelToActive(
                              item._id,
                              !item?.isActive,
                              updateModule
                            )
                          }
                        >
                          {item?.isActive ? (
                            <Badge
                              variant="outline"
                              className="bg-green-300 text-green-700 cursor-pointer"
                            >
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-300 text-red-700 cursor-pointer"
                            >
                              Inactive
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handelToDelete(item?._id, deleteModule)
                          }
                          className="text-red-700 bg-red-200 p-2 text-sm rounded-full cursor-pointer"
                        >
                          <Trash2 />
                        </button>
                        <button
                          className="text-sky-700 bg-sky-200 p-2 text-sm rounded-full cursor-pointer"
                          onClick={() => {
                            setUpdateDialogIsOpen(true);
                            setModuleData(item);
                          }}
                        >
                          <FilePenLine />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-5">
                      <EmptyData />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-10 flex items-center justify-end mr-10">
            <Pagination
              customClassNames={{
                rpbItemClassName:
                  "h-10 w-10 flex items-center justify-center border border-[#0369a1]  hover:bg-[#0369a1] hover:text-white text-[#0369a1] rounded-[100%] transition-all duration-200",
                rpbItemClassNameActive: "text-[#fff] bg-[#0369a1]",
                rpbGoItemClassName: "custom-go-item",
                rpbItemClassNameDisable: "opacity-20 cursor-not-allowed",
                rpbProgressClassName:
                  "h-[1.5px] mt-5 bg-[#0369a1] rounded-full",
                rpbRootClassName: "custom-root",
              }}
              currentPage={meta?.page}
              itemsPerPage={meta?.limit}
              onPageChange={(pageNumber: number) => setPage(pageNumber)}
              totalItems={meta?.total}
              startLabel={<ChevronFirst />}
              endLabel={<ChevronLast />}
              nextLabel={<ChevronRight />}
              prevLabel={<ChevronLeft />}
              pageNeighbours={1}
            />
          </div>
        </div>
      </div>
      <Dialog onOpenChange={setOpen} open={open}>
        <AddModuleDialog setOpen={setOpen} />
      </Dialog>
      {moduleData && updateDialogIsOpen && (
        <Dialog onOpenChange={setUpdateDialogIsOpen} open={updateDialogIsOpen}>
          <UpdateModuleDialog
            setOpen={setUpdateDialogIsOpen}
            data={moduleData}
          />
        </Dialog>
      )}
    </div>
  );
};

export default DataTable;
