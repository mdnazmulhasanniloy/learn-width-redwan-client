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
import { z } from "zod"; 
import ErrorToast from "@/components/toast/errorToast";
import { useAddBatchMutation } from "@/redux/api/batchApi";
import { toast } from "sonner";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";

type IAddBatchDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};
const AddBatchDialog = ({ setOpen }: IAddBatchDialog) => {
  const [addBatch, { isLoading }] = useAddBatchMutation(); 
  const [courseId, setCourseId] = useState({}); 

  const courseQuery:Record<string, any> ={}
  courseQuery["limit"]=999999999999999
  const {data:coursesRes} = useGetAllCourseQuery(courseQuery)
  const courses = coursesRes?.data || []




  const form = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      isActive: true,
    },
  });

  

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
      if(res.success){
        form.reset();
        setOpen(false);
      }
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
