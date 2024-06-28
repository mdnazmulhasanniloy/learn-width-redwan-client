"use client";

import React, { useState } from "react";
import DataTable from "./_components/data-table";
import Loader from "@/components/ui/loader";
// import { useGetLectureQuery } from "@/lib/redux/features/lecture/lectureApi";

const LecturePage = () => {
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 5 });
  const [search, setSearch] = useState("");
  // const { data, isLoading, isSuccess } = useGetLectureQuery({
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

export default LecturePage;
