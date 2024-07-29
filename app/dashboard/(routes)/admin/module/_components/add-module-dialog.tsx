"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useEffect, useState } from "react";
import ModuleForm from "./module-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { moduleSchema } from "@/schema/moduleSchema";
import { useAddModuleMutation } from "@/redux/api/modules";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import ErrorToast from "@/components/toast/errorToast";
import { toast } from "sonner";

type IAddModuleDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};
const AddModuleDialog = ({ setOpen }: IAddModuleDialog) => {
  const [addModule, { isLoading }] = useAddModuleMutation();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [course, setCourse] = useState<any>({});
  const query: Record<string, any> = {};
  const batchQuery: Record<string, any> = {};
  query["limit"] = 999999999;
  batchQuery["limit"] = 999999999;
  batchQuery["courseId"] = course?._id;
  const { data, isSuccess } = useGetAllCourseQuery({ ...query });
  const { data: batch, isSuccess: batchSuccess } = useGetBatchQuery({
    ...batchQuery,
  });
  const form = useForm<z.infer<typeof moduleSchema>>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      isActive: true,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setCourses([]);
      setCourses(data?.data);
    }
    if (batchSuccess) {
      setBatches([]);
      setBatches(batch?.data);
    }
  }, [batch?.data, batchSuccess, data?.data, isSuccess]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "course") {
        courses?.forEach((each: { _id: string; name: string }) => {
          if (each?._id === value?.course) {
            setCourse({
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

  const onSubmit = async (values: z.infer<typeof moduleSchema>) => {
    toast.loading("Batch is Adding...", { id: "addBatch" });
    try {
      const res: any = await addModule(values).unwrap();
      toast.success(res.message, { id: "addBatch" });
      if (res.success) {
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      ErrorToast(error, "addBatch");
    }
  };
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title>Add Module</Title>
        </DialogTitle>
        <DialogDescription>
          make a module here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <ModuleForm
          setOpen={setOpen}
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          courses={courses}
          batches={batches}
        />
      </div>
    </DialogContent>
  );
};

export default AddModuleDialog;
