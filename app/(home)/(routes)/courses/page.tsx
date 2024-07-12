"use client";
// import { useGetCourseQuery } from "@/lib/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import { ICourse } from "../home/_components/constants";
import CardLoader from "./_components/card-loader";
import CourseCard from "./_components/course-card";
import SearchAndFilter from "./_components/search-and-filter";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
} from "lucide-react";

const CoursePage = () => {
  const query: Record<string, any> = {};
  const [search, setSearch] = React.useState<string | null | undefined>("");
  const [sortOrder, setSortOrder] = React.useState<string | null | undefined>(
    "asc"
  );
  const [sortBy, setSortBy] = React.useState<boolean>(false);
  const [courses, setCourses] = React.useState<ICourse[] | []>([]);

  const [limit, SetLimit] = useState(6);
  const [page, setPage] = useState(1);
  // const [total, SetTotal] = useState(5);

  query["limit"] = limit;
  query["page"] = page;
  query["sortBy"] = sortBy || sortBy ? "regularPrice" : "createdAt";
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = search;

  const { data, isLoading, isSuccess } = useGetAllCourseQuery({ ...query });

  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      setCourses(data?.data);
    }
  }, [data, isSuccess]);

  // const { data, isLoading, isError, isSuccess } = useGetCourseQuery({
  //   meta,
  //   search,
  //   sortBy: sortBy ? "regularPrice" : "createdAt",
  //   sortOrder,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     data?.success && setCourses(data?.data);
  //   }
  // }, [data, isSuccess]);

  if (isLoading) {
    return <CardLoader />;
  }
  return (
    <div className="w-11/12 mx-auto my-20">
      <SearchAndFilter
        setSearch={setSearch}
        setSortOrder={setSortOrder}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 ">
        {courses?.length > 0 &&
          courses?.map((course: ICourse) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>
      <div className="flex w-full justify-center mt-20 ">
        <Pagination
          customClassNames={{
            rpbItemClassName:
              "h-10 w-10 flex items-center justify-center border border-sky-400  hover:bg-sky-300 hover:text-white text-sky-400 rounded-[100%] transition-all duration-200",
            rpbItemClassNameActive: "text-white bg-sky-400",
            rpbGoItemClassName: "custom-go-item",
            rpbItemClassNameDisable: "opacity-20 cursor-not-allowed",
            rpbProgressClassName: "h-[1.5px] mt-5 bg-sky-400 rounded-full",
            rpbRootClassName: "custom-root",
          }}
          withProgressBar={true}
          currentPage={page}
          itemsPerPage={limit}
          onPageChange={(pageNumber) => setPage(pageNumber)}
          totalItems={data?.meta?.total}
          startLabel={<ChevronFirst />}
          endLabel={<ChevronLast />}
          nextLabel={<ChevronRight />}
          prevLabel={<ChevronLeft />}
          pageNeighbours={2}
        />
      </div>
    </div>
  );
};

export default CoursePage;
