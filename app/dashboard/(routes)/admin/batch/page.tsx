"use client";
// import { useGetBatchQuery } from "@/lib/redux/features/batch/batchSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "./_components/data-table";
import Loader from "@/components/ui/loader";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import ErrorToast from "@/components/toast/errorToast";

const BatchPage = () => {
  const query: Record<string, any> = {};
  const [search, setSearch] = useState<string | null | undefined>(""); 
  const [batch, setBatch] = useState<any[]>([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  // const [total, SetTotal] = useState(5);

  query["limit"] = limit;
  query["page"] = page; 
  query["searchTerm"] = search;

  const { data, isLoading, isSuccess, isError, error } = useGetBatchQuery({
    ...query,
  });

  useEffect(() => {
    if (isSuccess) {
      setBatch(data?.data);
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
        data={batch}
        meta={data?.meta}
        setPage={setPage}
        setSearch={setSearch}
      />
    </div>
  );
};

export default BatchPage;
