"use client";
// import { useGetCourseQuery } from "@/lib/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import DataTable from "./_components/data-table";
// import {
//   awsAccessKey,
//   awsBucketName,
//   awsRegion,
//   awsSecretAccessKey,
//   serverUrl,
// } from "@/config";
import Loader from "@/components/ui/loader";
import { ICourse } from "@/app/(home)/(routes)/home/_components/constants";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import ErrorToast from "@/components/toast/errorToast";

const CoursesPage = () => {
  const query: Record<string, any> = {};
  const [search, setSearch] = useState<string | null | undefined>("");
  const [sortOrder, setSortOrder] = useState<string | null | undefined>("asc");
  const [sortBy, setSortBy] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[] | []>([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  // const [total, SetTotal] = useState(5);

  query["limit"] = limit;
  query["page"] = page;
  query["sortBy"] = sortBy || sortBy ? "regularPrice" : "createdAt";
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = search;

  const { data, isLoading, isSuccess, isError, error } = useGetAllCourseQuery({
    ...query,
  });

  useEffect(() => {
    if (isSuccess) {
      setCourses(data?.data);
    } else if (isError) {
      ErrorToast(error);
    }
  }, [data, isSuccess, isError, error]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-6">
      <DataTable
        data={courses}
        meta={data?.meta}
        setPage={setPage}
        setSearch={setSearch}
      />
    </div>
  );
};

export default CoursesPage;
