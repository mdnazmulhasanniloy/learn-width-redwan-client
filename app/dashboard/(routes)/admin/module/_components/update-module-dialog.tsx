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
import { serverUrl } from "@/config";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateModuleSchema } from "@/schema/moduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateModuleMutation } from "@/lib/redux/features/module/moduleApi";
import { HandelToUpdateModule } from "@/actions/module";

type IUpdateModuleProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};
const UpdateModuleDialog = ({ data, setOpen }: IUpdateModuleProps) => {
  const [updateModule, { isLoading }] = useUpdateModuleMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
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

  const form = useForm<z.infer<typeof UpdateModuleSchema>>({
    resolver: zodResolver(UpdateModuleSchema),
    defaultValues: {
      moduleName: data.moduleName,
      course: course?._id,
      batch: batch?._id,
    },
  });

  //course search
  useEffect(() => {
    setCourses([]);
    fetch(`${serverUrl}course`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data?.data);
      });
  }, []);

  //batch search
  useEffect(() => {
    setBatches([]);
    fetch(`${serverUrl}batch?courseId=${course?._id}`)
      .then((response) => response.json())
      .then((data) => {
        setBatches(data?.data);
      });
  }, [course]);

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

  const onSubmit = async (values: z.infer<typeof UpdateModuleSchema>) => {
    const id = await data?._id;
    await HandelToUpdateModule(
      id,
      updateModule,
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
          <Title title={`Update Module`} />
        </DialogTitle>
        <DialogDescription>
          change module data here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <ModuleForm
          setOpen={setOpen}
          error={error}
          success={success}
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
