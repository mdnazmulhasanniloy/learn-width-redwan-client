"use client";
import Table from "@/components/ui/Table";
import { useGetBatchQuery } from "@/lib/redux/features/batch/batchSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DataTable from "./_components/data-table";

const BatchPage = () => {
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 5 });
  const [search, setSearch] = useState("");
  console.log(search);
  const { data, isLoading, isSuccess } = useGetBatchQuery({
    meta,
    search,
  });
  if (!data?.success) {
    toast.error(data?.message);
  }

  if (isLoading) {
    return <div>data is loading</div>;
  }

  console.log("data", data);
  return (
    <div className="p-6">
      <DataTable
        data={data?.data}
        meta={data?.meta}
        setMeta={setMeta}
        setSearch={setSearch}
      />
    </div>
  );
};

export default BatchPage;
