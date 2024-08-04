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
import { UpdateModuleSchema } from "@/schema/moduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateModuleMutation } from "@/redux/api/modules";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import { toast } from "sonner";
import ErrorToast from "@/components/toast/errorToast";

type IUpdateModuleProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};

const UpdateModuleDialog = ({ data, setOpen }: IUpdateModuleProps) => {
  const [updateModuleFn, { isLoading }] = useUpdateModuleMutation();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [course, setCourse] = useState({
    name: data.course.name,
    _id: data?.course?._id,
  });
  const [batch, setBatch] = useState({
    name: data.batch.name,
    _id: data?.batch?._id,
  });

  const query: Record<string, any> = { limit: 999999999 };
  const batchQuery: Record<string, any> = {
    limit: 999999999,
    courseId: course?._id,
  };

  const { data: allCourses, isSuccess } = useGetAllCourseQuery(query);
  const { data: allBatches, isSuccess: batchSuccess } =
    useGetBatchQuery(batchQuery);

  const form = useForm<z.infer<typeof UpdateModuleSchema>>({
    resolver: zodResolver(UpdateModuleSchema),
    defaultValues: {
      moduleName: data.moduleName,
      course: course?._id,
      batch: batch?._id,
      isActive: data.isActive,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setCourses(allCourses?.data || []);
    }
  }, [allCourses, isSuccess]);

  useEffect(() => {
    if (batchSuccess) {
      setBatches(allBatches?.data || []);
    }
  }, [allBatches, batchSuccess]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "course") {
        const selectedCourse = courses.find(
          (each: { _id: string }) => each._id === value.course
        );
        if (selectedCourse) {
          setCourse(selectedCourse);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [courses, form]);

  const onSubmit = async (values: z.infer<typeof UpdateModuleSchema>) => {
    console.log(values);
    // const id = data?._id;
    try {
      toast.loading(`Updating...`, { id: "moduleId" });
      const res: any = await updateModuleFn({
        id: data?._id,
        data: values,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: "moduleId" });
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      ErrorToast(error, "moduleId");
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title>Update Module</Title>
        </DialogTitle>
        <DialogDescription>
          Change module data here. Click submit when you&apos;re done.
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

export default UpdateModuleDialog;
