"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import { useAddCourseMutation } from "@/lib/redux/features/courses/coursesApi";
import { coursesSchema } from "@/schema/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import CourseForm from "./course-form";
import { HandelToAddCourse } from "@/actions/course";

type IAddCourseDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const AddCourseDialog = ({ setOpen }: IAddCourseDialog) => {
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const form = useForm<z.infer<typeof coursesSchema>>({
    resolver: zodResolver(coursesSchema),
    defaultValues: {
      name: undefined,
      duration: undefined,
      regularPrice: undefined,
      currentBatch: undefined,
      thumbnail: undefined,
      isActive: true,
    },
  });

  const subscription = form.watch((value, { name, type }) => {
    if (name === "duration" && value.duration !== undefined) {
      form.setValue("duration", parseInt(String(value.duration), 10));
      console.log(value.duration);
    }
    if (name === "regularPrice" && value.regularPrice !== undefined) {
      form.setValue("regularPrice", parseInt(String(value.regularPrice), 10));
      console.log(value.regularPrice);
    }
    if (name === "currentBatch" && value.currentBatch !== undefined) {
      form.setValue("currentBatch", parseInt(String(value.currentBatch), 10));
      console.log(value.currentBatch);
    }
  });
  const handleThumbnailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event?.target?.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof coursesSchema>) => {
    // Add thumbnail to values object
    values = {
      ...values,
      thumbnail: thumbnail,
    };
    await HandelToAddCourse(
      addCourse,
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
          <Title>Add Course</Title>
        </DialogTitle>
        <DialogDescription>
          Make a course here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <CourseForm
          handleThumbnailChange={handleThumbnailChange}
          setOpen={setOpen}
          error={error}
          success={success}
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </DialogContent>
  );
};

export default AddCourseDialog;
