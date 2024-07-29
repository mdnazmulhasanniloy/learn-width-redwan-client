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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { batchSchema } from "@/schema/batchSchema";
import { serverUrl } from "@/config";
// import { useAddBatchMutation } from "@/lib/redux/features/batch/batchSlice";
import { z } from "zod";
import { HandelToAddBatch } from "@/actions/batch";
import ErrorToast from "@/components/toast/errorToast";
import { useAddBatchMutation } from "@/redux/api/batchApi";
import { toast } from "sonner";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";

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
  const courseQuery: Record<string, any> = {};
  courseQuery["limit"] = 999999999;
  const { data, isSuccess } = useGetAllCourseQuery({ ...courseQuery });
  const form = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      isActive: true,
    },
  });

  useEffect(() => {
    setCourses([]);
    if (isSuccess) {
      setCourses(data?.data);
    }
  }, [data?.data, isSuccess]);

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
    toast.loading("Batch Creating...", { id: "batch" });
    try {
      const res = await addBatch(values).unwrap();
      toast.success(res.message, { id: "batch" });
    } catch (error) {
      ErrorToast(error, "batch");
    }
  };

  const handleDurationChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const duration = parseInt(event.target.value);
    form.setValue("duration", duration);
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title>Add Batch</Title>
        </DialogTitle>
        <DialogDescription>
          Make a batch here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <BatchForm
          setOpen={setOpen}  
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading} 
          courses={courses}
          handleDurationChange={handleDurationChange}
        />
      </div>
    </DialogContent>
  );
};

export default AddBatchDialog;
