"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useEffect, useState } from "react";
import BatchForm from "./batch-form";
import { z } from "zod";
import { UpdateBatchSchema } from "@/schema/batchSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBatchMutation } from "@/lib/redux/features/batch/batchSlice";
import { serverUrl } from "@/config";
import { HandelToUpdateBatch } from "@/actions/batch";

type IUpdateBatchProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};
const UpdateBatchDialog = ({ data, setOpen }: IUpdateBatchProps) => {
  const [updateBatch, { isLoading }] = useUpdateBatchMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState<string | undefined>("");
  const [meta, setMeta] = useState({ limit: 2, page: 1, total: 0 });
  const [courseId, setCourseId] = useState({
    name: data.courseId.name,
    _id: data?.courseId?._id,
  });

  const form = useForm<z.infer<typeof UpdateBatchSchema>>({
    resolver: zodResolver(UpdateBatchSchema),
    defaultValues: {
      name: data.name,
      duration: data.duration.toString(),
      startedAt: data.startedAt,
      courseId: courseId._id,
    },
  });

  useEffect(() => {
    setCourses([]);
    fetch(`${serverUrl}course?searchTerm=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data?.data);
      });
  }, [setMeta, meta, search]);

  useEffect(() => {
    const subscription = form?.watch((value, { name, type }) => {
      if (name === "courseId") {
        courses?.forEach((each: { _id: string; name: string }) => {
          if (each?._id === value?.name) {
            setCourseId({
              _id: each?._id,
              name: each?.name,
            });
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });
  console.log("object", data?._id);
  const onSubmit = async (values: z.infer<typeof UpdateBatchSchema>) => {
    const id = await data?._id;
    await HandelToUpdateBatch(
      id,
      updateBatch,
      values,
      setSuccess,
      setError,
      setOpen,
      form
    );
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title title={`Update Batch`} />
        </DialogTitle>
        <DialogDescription>
          change batch data here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <BatchForm
          setOpen={setOpen}
          error={error}
          success={success}
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          setSearch={setSearch}
          courses={courses}
        />
      </div>
    </DialogContent>
  );
};

export default UpdateBatchDialog;
