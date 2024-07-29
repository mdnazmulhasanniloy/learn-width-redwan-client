"use client";

import Loader from "@/components/ui/loader"; 
import React, { useEffect, useState } from "react";
import DataTable from "./_components/data-table";
import { useGetModuleQuery } from "@/redux/api/modules";

const ModulePage = () => {
  const query: Record<string, any> = {};
  const [module, setModule] = useState([]);
  const [search, setSearch] = useState<string | null | undefined>("");
  const [sortOrder, setSortOrder] = useState<string | null | undefined>("asc");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  query["limit"] = limit;
  query["page"] = page;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = search;

  const { data, isLoading, isSuccess } = useGetModuleQuery({ ...query });

  useEffect(() => {
    if (isSuccess) {
      setModule(data?.data);
    }
  }, [data, isSuccess]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <DataTable
        data={module}
        meta={data?.meta}
        setPage={setPage}
        setLimit={setLimit}
        setSearch={setSearch}
      />
    </div>
  );
};

export default ModulePage;
