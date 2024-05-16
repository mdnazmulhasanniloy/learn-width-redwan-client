"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import React, { useEffect, useState } from "react";
import LectureForm from "./lecture-form";
import { useAddLectureMutation } from "@/lib/redux/features/lecture/lectureApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLectureSchema } from "@/schema/lectureSchema";
import { handelToAddLecture } from "@/actions/lecture";
import { serverUrl } from "@/config";

type IAddLectureDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const AddLectureDialog = ({ setOpen }: IAddLectureDialog) => {
  const [addLecture, { isLoading }] = useAddLectureMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [video, setVideo] = useState<File | null>(null);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [modules, setModules] = useState([]);

  const [course, setCourse] = useState<{ _id: string; name: string } | null>(
    null
  );
  const [batch, setBatch] = useState<{ _id: string; name: string } | null>(
    null
  );
  const [module, setModule] = useState<{ _id: string; name: string } | null>(
    null
  );

  const form = useForm<z.infer<typeof addLectureSchema>>({
    resolver: zodResolver(addLectureSchema),
    defaultValues: {
      lectureName: undefined,
      topic: undefined,
      type: undefined,
      isOptional: false,
      courseId: undefined,
      batchId: undefined,
      moduleId: undefined,
      video: undefined,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "courseId") {
        console.log("object");
        courses?.forEach((each: { _id: string; name: string }) => {
          if (each?._id === value?.courseId) {
            setCourse({
              _id: each?._id,
              name: each?.name,
            });
            return;
          }
        });
      }
      if (name === "batchId") {
        batches?.forEach((each: { _id: string; name: string }) => {
          if (each?._id === value?.batchId) {
            setBatch({
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

  //module search
  useEffect(() => {
    setBatches([]);
    fetch(`${serverUrl}module?batch=${batch?._id}`)
      .then((response) => response.json())
      .then((data) => {
        setModules(data?.data);
      });
  }, [batch]);

  const handleVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event?.target?.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof addLectureSchema>) => {
    // Add thumbnail to values object
    values = {
      ...values,
      video: video,
    };
    await handelToAddLecture(
      addLecture,
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
          <Title title={`Add Lecture`} />
        </DialogTitle>
        <DialogDescription>
          Make a lecture here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <LectureForm
          setOpen={setOpen}
          error={error}
          success={success}
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          handleVideoChange={handleVideoChange}
          courses={courses}
          batches={batches}
          modules={modules}
        />
      </div>
    </DialogContent>
  );
};

export default AddLectureDialog;
