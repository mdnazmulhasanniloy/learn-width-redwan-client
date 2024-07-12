"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import { coursesSchema } from "@/schema/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CourseForm from "./course-form";
import SuccessToast from "@/components/toast/SuccessToast";
import { useCreateCourseMutation } from "@/redux/api/courseApi";
import ErrorToast from "@/components/toast/errorToast";

type IAddCourseDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const AddCourseDialog = ({ setOpen }: IAddCourseDialog) => {
  const [addCourse, { isLoading }] = useCreateCourseMutation();
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const form = useForm<z.infer<typeof coursesSchema>>({
    resolver: zodResolver(coursesSchema),
    defaultValues: {
      name: "",
      duration: 0,
      regularPrice: 0,
      currentBatch: 0,
      thumbnail: null,
      isActive: true,
    },
  });

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event?.target?.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof coursesSchema>) => {
    try {
      delete values.thumbnail;
      const formData = new FormData();
      // Append other form data
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      } else {
        ErrorToast({ message: "Thumbnail is required" });
      }
      formData.append("data", JSON.stringify(values));

      const res: any = await addCourse(formData);

      if (res?.data?.success) {
        SuccessToast(res?.data?.message);
        setThumbnail(null);
        setOpen(false);
        form.reset();
        return;
      } else {
        ErrorToast(res?.data);
        return;
      }
    } catch (error: any) {
      ErrorToast(error);
    }
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
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </DialogContent>
  );
};

export default AddCourseDialog;
