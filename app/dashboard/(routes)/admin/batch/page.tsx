"use client";
import { useGetBatchQuery } from "@/lib/redux/features/batch/batchSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "./_components/data-table";

const BatchPage = () => {
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 5 });
  const [search, setSearch] = useState("");
  console.log(search);
  const { data, isLoading, isSuccess, isError, error } = useGetBatchQuery({
    meta,
    search,
  });

  if (isLoading) {
    return <div>data is loading</div>;
  }

  if (!data?.success) {
    toast.error(data?.message);
  }

  return (
    <div className="p-6">
      <DataTable data={data} setMeta={setMeta} setSearch={setSearch} />
    </div>
  );
};

export default BatchPage;
