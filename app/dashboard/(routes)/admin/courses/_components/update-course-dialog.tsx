import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useState } from "react";
import CourseForm from "./course-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateCoursesSchema } from "@/schema/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandelToUpdateCourse } from "@/actions/course";
import { useUpdateCourseMutation } from "@/redux/api/courseApi";
import ErrorToast from "@/components/toast/errorToast";
import SuccessToast from "@/components/toast/SuccessToast";

type IUpdateCourseProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};

const UpdateCourseDialog = ({ data, setOpen }: IUpdateCourseProps) => {
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
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
    delete values.thumbnail; 
    const id = await data?._id;

    try {
      const formData = new FormData();
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      formData.append("data", JSON.stringify(values));

      const res: any = await updateCourse({ id, data: formData });
      if (res?.data?.success) {
        SuccessToast(res?.data?.message);
        setOpen(false);
        return;
      } else {
        ErrorToast(res?.data?.message);
        return;
      }
    } catch (error) {
      ErrorToast(error);
    }
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
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </DialogContent>
  );
};

export default UpdateCourseDialog;
