"use client";
// import { useGetCourseQuery } from "@/lib/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import DataTable from "./_components/data-table";
import {
  awsAccessKey,
  awsBucketName,
  awsRegion,
  awsSecretAccessKey,
  serverUrl,
} from "@/config";
import Loader from "@/components/ui/loader";

const CoursesPage = () => {
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 5 });
  const [search, setSearch] = useState("");
  // const { data, isLoading, isSuccess } = useGetCourseQuery({
  //   meta,
  //   search,
  // });

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <div className="p-6">
      {/* <DataTable
        data={data?.data}
        meta={data?.meta}
        setMeta={setMeta}
        setSearch={setSearch}
      /> */}
    </div>
  );
};

export default CoursesPage;
