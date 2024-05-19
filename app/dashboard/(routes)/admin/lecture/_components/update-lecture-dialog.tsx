"use client";

import { handelToUpdateLecture } from "@/actions/lecture";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import { serverUrl } from "@/config";
import { useUpdateLectureMutation } from "@/lib/redux/features/lecture/lectureApi";
import { updateLectureSchema } from "@/schema/lectureSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LectureForm from "./lecture-form";

type IUpdateLectureProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};
const UpdateLectureDialog = ({ data, setOpen }: IUpdateLectureProps) => {
  const [updateLecture, { isLoading }] = useUpdateLectureMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [video, setVideo] = useState<File | undefined>();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState({
    name: data?.courseId?.name,
    _id: data?.courseId?._id,
  });

  const [batch, setBatch] = useState({
    name: data?.batchId?.name,
    _id: data?.batchId?._id,
  });
  const [module, setModule] = useState({
    name: data?.moduleId?.moduleName,
    _id: data?.moduleId?._id,
  });

  const form = useForm<z.infer<typeof updateLectureSchema>>({
    resolver: zodResolver(updateLectureSchema),
    defaultValues: {
      lectureName: data?.lectureName,
      topic: data?.topic,
      type: data?.type,
      isActive: data?.isActive,
      courseId: course?._id,
      batchId: batch?._id,
      moduleId: module._id,
    },
  });

  //course search
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "courseId") {
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
      if (name === "moduleId") {
        batches?.forEach((each: { _id: string; moduleName: string }) => {
          if (each?._id === value?.batchId) {
            setModule({
              _id: each?._id,
              name: each?.moduleName,
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
    setModules([]);
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

  const onSubmit = async (values: z.infer<typeof updateLectureSchema>) => {
    console.log(values);
    const id = await data?._id;
    values = {
      ...values,
      video: video,
    };

    await handelToUpdateLecture(
      id,
      updateLecture,
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
          <Title>Update Lecture</Title>
        </DialogTitle>
        <DialogDescription>
          change Lecture data here. Click submit when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <LectureForm
          setOpen={setOpen}
          error={error}
          success={success}
          handleVideoChange={handleVideoChange}
          form={form}
          onSubmit={onSubmit}
          isLoading={isLoading}
          courses={courses}
          batches={batches}
          modules={modules}
        />
      </div>
    </DialogContent>
  );
};

export default UpdateLectureDialog;
