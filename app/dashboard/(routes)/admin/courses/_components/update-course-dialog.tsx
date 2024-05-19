import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useState } from "react";
import CourseForm from "./course-form";
import { useUpdateCourseMutation } from "@/lib/redux/features/courses/coursesApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCoursesSchema } from "@/schema/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandelToUpdateCourse } from "@/actions/course";

type IUpdateCourseProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};

const UpdateCourseDialog = ({ data, setOpen }: IUpdateCourseProps) => {
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const form = useForm<z.infer<typeof updateCoursesSchema>>({
    resolver: zodResolver(updateCoursesSchema),
    defaultValues: {
      name: data?.name,
      currentBatch: data?.currentBatch?.toString(),
      regularPrice: data?.regularPrice?.toString(),
      duration: data?.duration?.toString(),
      isActive: data?.isActive,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateCoursesSchema>) => {
    values = {
      ...values,
      thumbnail: thumbnail,
    };

    const id = await data?._id;
    await HandelToUpdateCourse(
      id,
      updateCourse,
      values,
      setSuccess,
      setError,
      setOpen,
      form
    );
  };

  const handleThumbnailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event?.target?.files[0];
    if (file) {
      setThumbnail(file);
    }
  };
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title>Update Course</Title>
        </DialogTitle>
        <DialogDescription>
          change course data here. Click submit when you&apos;re done.
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

export default UpdateCourseDialog;
