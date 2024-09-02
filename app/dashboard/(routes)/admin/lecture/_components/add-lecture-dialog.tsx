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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addLectureSchema } from "@/schema/lectureSchema"; 
import { useAddLectureMutation } from "@/redux/api/lectureApi";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import { useGetModuleQuery } from "@/redux/api/modules";
import { toast } from "sonner";
import ErrorToast from "@/components/toast/errorToast";

type IAddLectureDialog = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
};
export const ValidVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
const AddLectureDialog = ({ setOpen }: IAddLectureDialog) => {
  const [course, setCourse] = useState<{ _id: string; name: string } | null>(
    null
  );
  const [batch, setBatch] = useState<{ _id: string; name: string } | null>(
    null
  ); 

  const [addLecture, { isLoading }] = useAddLectureMutation();
  
  const courseQuery:Record<string, any> ={}
  courseQuery["limit"]=999999999999999
  const {data:coursesRes} = useGetAllCourseQuery(courseQuery)
  const courses = coursesRes?.data || []


  const batchQuery:Record<string, any> ={}
  batchQuery["limit"]=999999999999999
  batchQuery["courseId"]=course?._id
  const {data:batchesRes}= useGetBatchQuery(batchQuery)
  const batches = batchesRes?.data ||[]
  
  const moduleQuery:Record<string, any> ={}
  moduleQuery["limit"]=999999999999999
  moduleQuery["batch"]=batch?._id
  const {data: modulesRes}= useGetModuleQuery(moduleQuery)
  const modules = modulesRes?.data ||[]


  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [video, setVideo] = useState<File | null>(null); 



  const form = useForm<z.infer<typeof addLectureSchema>>({
    resolver: zodResolver(addLectureSchema),
    defaultValues: {
      lectureName: undefined,
      topic: undefined,
      type: undefined,
      isActive: true,
      courseId: undefined,
      batchId: undefined,
      moduleId: undefined,
      video: undefined,
    },
  });

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
    });
    return () => subscription.unsubscribe();
  });

 

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

    toast.loading("Loading...", {id:"...", duration: 3000});
    try { 
    if (
      values.video &&
      !ValidVideoTypes.find((type) => type === values.video.type)
    ) {
      ErrorToast("Only .mp4, .webm and .ogg formats are supported.", "...");
      return;
    } else if(values?.video ===null){
      toast.error("Please select a video file.", {id:"...", duration:3000});
      return;
    }
 
    const formData = new FormData();

    formData.append("video", values.video); // Use consistent key

    const value = JSON.stringify(values);
    formData.append("data", value);

      const res:any = await addLecture(formData).unwrap() 
      toast.success(res.message, {id:"...", duration:3000})
      if(res.success){
        setOpen(false);
      form.reset();
      }
    } catch (error) {
      ErrorToast(error, "...")
    } 
  };


  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>
          <Title>Add Lecture</Title>
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
