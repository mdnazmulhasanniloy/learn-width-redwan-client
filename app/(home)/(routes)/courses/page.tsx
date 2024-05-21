"use client";
import { useGetCourseQuery } from "@/lib/redux/features/courses/coursesApi";
import React, { useEffect } from "react";
import { ICourse } from "../home/_components/constants";
import CardLoader from "./_components/card-loader";
import CourseCard from "./_components/course-card";
import SearchAndFilter from "./_components/search-and-filter";

const CoursePage = () => {
  const [meta, setMeta] = React.useState({
    limit: 10,
    page: 1,
    total: 5,
  });
  const [search, setSearch] = React.useState<string | null | undefined>("");
  const [sortOrder, setSortOrder] = React.useState<string | null | undefined>(
    "asc"
  );
  const [sortBy, setSortBy] = React.useState<boolean>(false);
  const [courses, setCourses] = React.useState<ICourse[] | []>([]);

  const { data, isLoading, isError, isSuccess } = useGetCourseQuery({
    meta,
    search,
    sortBy: sortBy ? "regularPrice" : "createdAt",
    sortOrder,
  });

  useEffect(() => {
    if (isSuccess) {
      data?.success && setCourses(data?.data);
    }
  }, [data, isSuccess]);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {courses?.length > 0 &&
          courses?.map((course: ICourse) => (
            <CourseCard key={course?._id} course={course} />
          ))}
      </div>
    </div>
  );
};

export default CoursePage;
