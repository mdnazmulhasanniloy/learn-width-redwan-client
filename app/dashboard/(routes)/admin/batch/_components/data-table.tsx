"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/title";
import { formatPrice } from "@/lib/format";
import { useRemoveCourseMutation } from "@/lib/redux/features/courses/coursesApi";
import { FilePenLine, Files, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

type DataTableProps = {
  data: any[]; // Change 'any' to the actual type of your data array if possible
  meta: Record<string, any>; // Change 'Record<string, any>' to the actual type of your meta object if possible
  setSearch: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
  setMeta: (value: any) => void; // Change 'any' to the actual type of setSearch function parameter and return value if possible
};

const DataTable = ({ data, meta, setMeta, setSearch }: DataTableProps) => {
  const [deleteCourse, deleteResult] = useRemoveCourseMutation();

  useEffect(() => {
    if (deleteResult?.isLoading) {
      toast.loading("Deleting...", { id: "removeCourse" });
    }
    if (deleteResult?.isSuccess) {
      toast.success("successfully deleted", { id: "removeCourse" });
    }
    if (deleteResult?.isError) {
      toast.success("something was wrong course deleting failed", {
        id: "removeCourse",
      });
    }
  }, [deleteResult, meta]);

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
        deleteCourse(id);
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
            <Link href="/dashboard/admin/batch/create">
              <Button variant="default" className="flex gap-2">
                Add Batch <Plus />
              </Button>
            </Link>
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
              {data?.length > 0 && (
                <tbody className="text-sm divide-y divide-gray-100">
                  {data?.length > 0 &&
                    data?.map((item: any, i: number) => (
                      <tr key={item?._id}>
                        <td className="p-2 whitespace-nowrap text-center">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap   text-center">
                          {item?.name}
                        </td>
                        <td className="p-2 whitespace-nowrap t text-center">
                          {item?.id}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.duration}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.startedAt}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.courseId}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {/* isActive */}
                          <div className="mx-auto flex w-[100px] gap-2">
                            {/* Buttons */}
                            {item.isActive ? (
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
                          {/* isActive */}
                        </td>
                        <td className="p-2 whitespace-nowrap flex gap-2 justify-center">
                          <button
                            onClick={() => handelDelete(item?._id)}
                            className="text-red-700 bg-red-200 p-2 text-sm rounded-full cursor-pointer"
                          >
                            <Trash2 />
                          </button>

                          <button className="text-sky-700 bg-sky-200 p-2 text-sm rounded-full cursor-pointer">
                            <FilePenLine />
                          </button>

                          <button className="text-green-700 bg-green-200 rounded-full cursor-pointer p-2 text-sm">
                            <Files />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
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
              disabled={meta?.limit / meta?.total > 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
