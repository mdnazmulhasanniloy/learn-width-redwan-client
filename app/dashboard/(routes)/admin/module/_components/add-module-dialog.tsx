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
import { zodResolver } from "@hookform/resolvers/zod";
import { moduleSchema } from "@/schema/moduleSchema";
import { useAddModuleMutation } from "@/lib/redux/features/module/moduleApi";
import { HandelToAddModule } from "@/actions/module";

type IAddModuleDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};
const AddModuleDialog = ({ setOpen }: IAddModuleDialog) => {
  const [addModule, { isLoading }] = useAddModuleMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [course, setCourse] = useState({});

  const form = useForm<z.infer<typeof moduleSchema>>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      isActive: true,
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

  const onSubmit = async (values: z.infer<typeof moduleSchema>) => {
    await HandelToAddModule(
      addModule,
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
          <Title title={`Add Module`} />
        </DialogTitle>
        <DialogDescription>
          make a module here. Click submit when you&apos;re done.
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

export default AddModuleDialog;
