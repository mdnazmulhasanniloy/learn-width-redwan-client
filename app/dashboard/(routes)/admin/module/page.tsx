"use client";

import Loader from "@/components/ui/loader";
// import { useGetModuleQuery } from "@/lib/redux/features/module/moduleApi";
import React, { useState } from "react";
import DataTable from "./_components/data-table";

const ModulePage = () => {
  const [meta, setMeta] = useState({ limit: 10, page: 1, total: 5 });
  const [search, setSearch] = useState("");
  // const { data, isLoading, isSuccess } = useGetModuleQuery({
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

export default ModulePage;
