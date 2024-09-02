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
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { useUpdateBatchMutation } from "@/redux/api/batchApi";
import { toast } from "sonner";
import ErrorToast from "@/components/toast/errorToast";

type IUpdateBatchProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};
const UpdateBatchDialog = ({ data, setOpen }: IUpdateBatchProps) => {
  const [updateBatchFn, { isLoading }] = useUpdateBatchMutation(); 
  const [courseId, setCourseId] = useState({
    name: data.courseId.name,
    _id: data?.courseId?._id,
  });
  
  const courseQuery:Record<string, any> ={}
  courseQuery["limit"]=999999999999999
  const {data:coursesRes} = useGetAllCourseQuery(courseQuery)
  const courses = coursesRes?.data || []


  const form = useForm<z.infer<typeof UpdateBatchSchema>>({
    resolver: zodResolver(UpdateBatchSchema),
    defaultValues: {
      name: data.name,
      duration: data.duration,
      startedAt: data.startedAt,
      courseId: courseId._id,
      isActive: data.isActive,
    },
  });
 

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

  const handleDurationChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const duration = parseInt(event.target.value);
    form.setValue("duration", duration);
  };

  const onSubmit = async (values: z.infer<typeof UpdateBatchSchema>) => {
    try {
      toast.loading("Updating...", { id: "batch-Update", duration:3000 });
      const res: any = await updateBatchFn({ id: data?._id, data: values }).unwrap();
      toast.success(res.message, { id: "batch-Update",  duration:3000 });

      if (res.success) {
        form.reset()
        setOpen(false);
      }

    } catch (error: any) {
      ErrorToast(error, "batch-update");
    }
  };
  
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title>Update Batch</Title>
        </DialogTitle>
        <DialogDescription>
          change batch data here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <BatchForm
          setOpen={setOpen}
          form={form}
          onSubmit={onSubmit}
          courses={courses}
          isLoading={isLoading}
          handleDurationChange={handleDurationChange}
        />
      </div>
    </DialogContent>
  );
};

export default UpdateBatchDialog;
