"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import { formatPrice } from "@/lib/format";
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
import toast from "react-hot-toast";
import AddCourseDialog from "./add-course-dialog";
import UpdateCourseDialog from "./update-course-dialog";
import { handelToActive, handelToDelete } from "@/actions/shared/shared";
import { Pagination } from "react-pagination-bar";
import {
  useRemoveCourseMutation,
  useUpdateCourseMutation,
} from "@/redux/api/courseApi";
import EmptyData from "@/components/ui/emptyData";

type DataTableProps = {
  data: any[];
  meta: Record<string, any>;
  setPage: (value: any) => void;
  setSearch: (value: any) => void;
};

const DataTable = ({ data, meta, setPage, setSearch }: DataTableProps) => {
  const [deleteCourse] = useRemoveCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [courseData, setCourseData] = useState({});
  const [open, setOpen] = useState(false);
  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState(false);

  // useEffect(() => {
  //   if (deleteResult?.isLoading) {
  //     toast.loading("Deleting...", { id: "removeItem" });
  //   }

  //   if (updateResult?.isLoading) {
  //     toast.loading("Loading...", { id: "updateItem" });
  //   }
  // }, [deleteResult, updateResult]);

  return (
    <div className="flex flex-col justify-center h-full mx-auto text-center">
      <div className="w-full mx-auto bg-white rounded-lg border border-gray-300">
        <header className="px-5 py-4 border-b border-gray-100">
          <div className="my-5">
            <Title>Course</Title>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-5">
            <input
              type="text"
              placeholder="search courses"
              onInput={(e) => setSearch((e.target as HTMLInputElement)?.value)}
              className="p-3 border border-sky-400"
            />
            <Button
              variant="default"
              className="flex gap-2"
              onClick={() => setOpen(!open)}
            >
              Add Course <Plus />
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
                    <div className="font-semibold text-center">
                      Course Name{" "}
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center ">Course ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Duration</div>
                  </th>

                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Price</div>
                  </th>
                  <th className="p-2 whitespace-nowrap w-[15%]">
                    <div className="font-semibold text-center">Status</div>
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
                          <div className="flex items-center">
                            {(meta?.page - 1) * meta?.limit + i + 1}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap   text-center">
                          {item?.name}
                        </td>
                        <td className="p-2 whitespace-nowrap t text-center">
                          {item?.id}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {item?.duration} months
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {formatPrice(item?.regularPrice)}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {/* isActive */}
                          <div
                            className="mx-auto flex w-[100px] gap-2 justify-between"
                            onClick={() =>
                              handelToActive(
                                item._id,
                                !item?.isActive,
                                updateCourse
                              )
                            }
                          >
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
                            onClick={() =>
                              handelToDelete(item?._id, deleteCourse)
                            }
                            className="text-red-700 bg-red-200 p-2 text-sm rounded-full cursor-pointer"
                          >
                            <Trash2 />
                          </button>

                          <button
                            className="text-sky-700 bg-sky-200 p-2 text-sm rounded-full cursor-pointer"
                            onClick={() => {
                              setUpdateDialogIsOpen(!updateDialogIsOpen),
                                setCourseData(item);
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
                </tbody>
              )}
              {/*end table body */}
            </table>
            {data?.length === 0 && <EmptyData />}
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
        <AddCourseDialog setOpen={setOpen} />
      </Dialog>
      {courseData && updateDialogIsOpen && (
        <Dialog
          onOpenChange={() => setUpdateDialogIsOpen(!updateDialogIsOpen)}
          open={updateDialogIsOpen}
        >
          <UpdateCourseDialog
            setOpen={setUpdateDialogIsOpen}
            data={courseData}
          />
        </Dialog>
      )}
    </div>
  );
};

export default DataTable;
