"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  Files,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import moment from "moment";

import { Dialog } from "@/components/ui/dialog";
import AddBatchDialog from "./add-batch-dialog";
import UpdateBatchDialog from "./update-batch-dialog";
import { handelToActive, handelToDelete } from "@/actions/shared/shared";
import { Pagination } from "react-pagination-bar";
import {
  useRemoveBatchMutation,
  useUpdateBatchMutation,
} from "@/redux/api/batchApi";
import { toast } from "sonner";

type DataTableProps = {
  data: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };

  setSearch: (value: any) => void;
  setPage: (value: any) => void;
};

const DataTable = ({ data, meta, setPage, setSearch }: DataTableProps) => {
  const [removeBatch, deleteResult] = useRemoveBatchMutation();
  const [updateBatch, updateResult] = useUpdateBatchMutation();
  const [open, setOpen] = useState(false);
  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false); 
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    if (deleteResult?.isLoading) {
      toast.loading("Deleting...", { id: "removeItem" });
    }
    if (deleteResult?.isSuccess) {
      toast.success("delete Success", { id: "removeItem" });
    }

    if (updateResult?.isLoading) {
      toast.loading("Loading...", { id: "updateItem" });
    }
  }, [deleteResult, updateResult]);
  console.log(open);
  return (
    <div className="flex flex-col justify-center h-full mx-auto text-center">
      <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
        <header className="px-5 py-4 border-b border-gray-100">
          <div className="my-5">
            <Title>Batch</Title>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-5">
            <input
              type="text"
              placeholder="search Batch"
              onInput={(e) => setSearch((e.target as HTMLInputElement)?.value)}
              className="p-3 border border-sky-400"
            />
            <Button
              variant="default"
              className="flex gap-2"
              onClick={() => setOpen(!open)}
            >
              Add Batch <Plus />
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
                    <div className="font-semibold text-center">batch Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center ">batch ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Duration</div>
                  </th>

                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">start at</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">course Id</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>

              {/*start table body */}
              {data?.length > 0 &&
                data?.map((item: any, i: number) => (
                  <tr key={item?._id}>
                    <td className="p-2 whitespace-nowrap text-center">
                      <div className="flex items-center">{i + 1}</div>
                    </td>

                    <td className="p-2 whitespace-nowrap   text-start">
                      {item?.name}
                    </td>

                    <td className="p-2 whitespace-nowrap t text-center">
                      {item?.id}
                    </td>

                    <td className="p-2 whitespace-nowrap text-center">
                      {item?.duration}
                      {"months".toLocaleLowerCase()}
                    </td>

                    <td className="p-2 whitespace-nowrap text-center">
                      {moment(item?.startedAt).format("MMM Do YY")}
                    </td>

                    <td className="p-2 whitespace-nowrap text-center">
                      {item?.courseId?.id}
                    </td>
                    <td className="p-2 whitespace-nowrap text-center">
                      <div
                        className="mx-auto flex justify-center w-[100px] gap-2 cursor-pointer"
                        onClick={() =>
                          handelToActive(item._id, !item?.isActive, updateBatch)
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
                            Destructive
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap flex gap-2 justify-center">
                      <button
                        onClick={() => handelToDelete(item?._id, removeBatch)}
                        className="text-red-700 bg-red-200 p-2 text-sm rounded-full cursor-pointer"
                      >
                        <Trash2 />
                      </button>

                      <button
                        className="text-sky-700 bg-sky-200 p-2 text-sm rounded-full cursor-pointer"
                        onClick={() => {
                          setUpdateDialogIsOpen(!updateDialogIsOpen),
                            setModalData(item);
                        }}
                      >
                        <FilePenLine />
                      </button>

                      {/* <button className="text-green-700 bg-green-200 rounded-full cursor-pointer p-2 text-sm">
                        <Files />
                      </button> */}
                    </td>
                  </tr>
                ))}
              {/*end table body */}
            </table>
            {data?.length === 0 && (
              <div className="text-red-400 text-3xl my-4">
                Oops! course not found
              </div>
            )}
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
              // withProgressBar={true}
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
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => setMeta({ ...meta, page: meta?.page - 1 })}
              disabled={meta?.page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMeta({ ...meta, page: meta?.page + 1 })}
              disabled={Math.ceil(meta?.total / meta?.limit) === meta?.page}
            >
              Next
            </Button> */}
          </div>
        </div>
      </div>

      <Dialog onOpenChange={() => setOpen(!open)} open={open}>
        <AddBatchDialog setOpen={setOpen} />
      </Dialog>
      
      {modalData && updateDialogIsOpen && (
        <Dialog
          onOpenChange={() => setUpdateDialogIsOpen(!updateDialogIsOpen)}
          open={updateDialogIsOpen}
        >
          <UpdateBatchDialog setOpen={setUpdateDialogIsOpen} data={modalData} />
        </Dialog>
      )}
    </div>
  );
};

export default DataTable;
