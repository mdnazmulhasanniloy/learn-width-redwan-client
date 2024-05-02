"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { FilePenLine, Files, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { useRemoveBatchMutation } from "@/lib/redux/features/batch/batchSlice";
import { Dialog } from "@/components/ui/dialog";
import AddBatchDialog from "./add-batch-dialog";
import { HandelToDeleteBatch } from "@/actions/batch";
import UpdateBatchDialog from "./update-batch-dialog";
import Swal from "sweetalert2";

type IData = {
  data: any[];
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  statusCode: number;
};
type DataTableProps = {
  data: IData; // Change 'any' to the actual type of your data array if possible
  // Change 'Record<string, any>' to the actual type of your meta object if possible
  setSearch: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
  setMeta: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
};

const DataTable = ({
  data: { data, meta },
  setMeta,
  setSearch,
}: DataTableProps) => {
  const [removeBatch, deleteResult] = useRemoveBatchMutation();
  const [open, setOpen] = useState(false);
  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false);
  const [batchData, setBatchData] = useState({});

  useEffect(() => {
    if (deleteResult?.isLoading) {
      toast.loading("Deleting...", { id: "removeBatch" });
    }
  }, [deleteResult]);

  //delete course
  const handelDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        HandelToDeleteBatch(id, removeBatch);
      }
    });
  };

  return (
    <div className="flex flex-col justify-center h-full mx-auto text-center">
      <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
        <header className="px-5 py-4 border-b border-gray-100">
          <div className="my-5">
            <Title title={`Batch`} />
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="search Batch"
              onInput={(e) => setSearch((e.target as HTMLInputElement)?.value)}
              className="p-3 border border-sky-400"
            />
            <Button
              variant="default"
              className="flex gap-2"
              onClick={() => setOpen(true)}
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
                      <div className="mx-auto flex w-[100px] gap-2">
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
                        onClick={() => handelDelete(item?._id)}
                        className="text-red-700 bg-red-200 p-2 text-sm rounded-full cursor-pointer"
                      >
                        <Trash2 />
                      </button>

                      <button
                        className="text-sky-700 bg-sky-200 p-2 text-sm rounded-full cursor-pointer"
                        onClick={() => {
                          setUpdateDialogIsOpen(true), setBatchData(item);
                        }}
                      >
                        <FilePenLine />
                      </button>

                      <button className="text-green-700 bg-green-200 rounded-full cursor-pointer p-2 text-sm">
                        <Files />
                      </button>
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
          <div className="paginate">
            <Button
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
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open}>
        <AddBatchDialog setOpen={setOpen} />
      </Dialog>
      {batchData && updateDialogIsOpen && (
        <Dialog open={updateDialogIsOpen}>
          <UpdateBatchDialog setOpen={setUpdateDialogIsOpen} data={batchData} />
        </Dialog>
      )}
    </div>
  );
};

export default DataTable;
