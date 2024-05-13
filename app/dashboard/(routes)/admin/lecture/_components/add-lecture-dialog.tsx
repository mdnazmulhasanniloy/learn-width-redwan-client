"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useState } from "react";
import LectureForm from "./lecture-form";
import { useAddLectureMutation } from "@/lib/redux/features/lecture/lectureApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLectureSchema } from "@/schema/lectureSchema";

type IAddLectureDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const AddLectureDialog = ({ setOpen }: IAddLectureDialog) => {
  const [addLecture, { isLoading }] = useAddLectureMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [lectureVideo, setLectureVideo] = useState<File | null>(null);

  const form = useForm<z.infer<typeof addLectureSchema>>({
    resolver: zodResolver(addLectureSchema),
    defaultValues: {
      lectureName: undefined,
      topic: undefined,
      notice: undefined,
      type: undefined,
      startAt: undefined,
      endsAt: undefined,
      isOptional: undefined,
      courseId: undefined,
      batchId: undefined,
      moduleId: undefined,
      lectureVideo: {
        s3Hoster: undefined,
      },
    },
  });

  const handleVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event?.target?.files[0];
    if (file) {
      setLectureVideo(file);
    }
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title title={`Add Lecture`} />
        </DialogTitle>
        <DialogDescription>
          Make a lecture here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <LectureForm
          handleVideoChange={handleVideoChange}
          HandelChangeDuration={HandelChangeDuration}
          HandelChangeRegularPrice={HandelChangeRegularPrice}
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

export default AddLectureDialog;
