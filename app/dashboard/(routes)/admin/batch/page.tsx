"use client";
// import { useGetBatchQuery } from "@/lib/redux/features/batch/batchSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "./_components/data-table";
import Loader from "@/components/ui/loader";

const BatchPage = () => {
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 5 });
  const [search, setSearch] = useState("");
  // const { data, isLoading, isSuccess, isError, error } = useGetBatchQuery({
  //   meta,
  //   search,
  // });

  // if (isLoading) {
  //   return <Loader />;
  // }

  // if (!data?.success) {
  //   toast.error(data?.message);
  // }

  return (
    <div className="p-6">
      {/* <DataTable data={data} setMeta={setMeta} setSearch={setSearch} /> */}
    </div>
  );
};

export default BatchPage;
