"use client";

import React, { useEffect, useState } from "react";
import DataTable from "./_components/data-table";
import Loader from "@/components/ui/loader";
import { useGetLectureQuery } from "@/redux/api/lectureApi";

const LecturePage = () => {
  const query: Record<string, any> = {};
  const [lecture, setLecture] = useState([]);
  const [search, setSearch] = useState<string | null | undefined>("");
  const [sortOrder, setSortOrder] = useState<string | null | undefined>("asc");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  query["limit"] = limit;
  query["page"] = page;
  query["sortOrder"] = sortOrder;

  query["searchTerm"] = search;
  const { data: data, isLoading, isSuccess } = useGetLectureQuery({ ...query });

  useEffect(() => {
    if (isSuccess) {
      setLecture(data?.data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return <Loader />;
  }
console.log(lecture)
  return (
    <div className="p-6">
      <DataTable
        data={lecture}
        meta={data?.meta}
        setPage={setPage}
        setSearch={setSearch}
      />
    </div>
  );
};

export default LecturePage;
