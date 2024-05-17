"use Client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useEffect, useState } from "react";
import BatchForm from "./batch-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { batchSchema } from "@/schema/batchSchema";
import { serverUrl } from "@/config";
import { useAddBatchMutation } from "@/lib/redux/features/batch/batchSlice";
import { z } from "zod";
import { HandelToAddBatch } from "@/actions/batch";

type IAddBatchDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};
const AddBatchDialog = ({ setOpen }: IAddBatchDialog) => {
  const [addBatch, { isLoading }] = useAddBatchMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState({});
  const [search, setSearch] = useState<string | undefined>("");
  const [meta, setMeta] = useState({ limit: 2, page: 1, total: 0 });

  const form = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      isActive: true,
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
              course_id: each?._id,
              courseName: each?.name,
            });
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });

  const onSubmit = async (values: z.infer<typeof batchSchema>) => {
    await HandelToAddBatch(
      addBatch,
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
          <Title title={`Add Batch`} />
        </DialogTitle>
        <DialogDescription>
          Make a batch here. Click submit when you&apos;re done.
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

export default AddBatchDialog;
