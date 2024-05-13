import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import CourseForm from "./course-form";
import { useUpdateCourseMutation } from "@/lib/redux/features/courses/coursesApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCoursesSchema } from "@/schema/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandelToUpdateCourse } from "@/actions/course";
import Title from "@/components/ui/title";

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
    },
  });

  const onSubmit = async (values: z.infer<typeof updateCoursesSchema>) => {
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
  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title title={`Update Course`} />
        </DialogTitle>
        <DialogDescription>
          change course data here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <CourseForm
          setThumbnail={setThumbnail}
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
