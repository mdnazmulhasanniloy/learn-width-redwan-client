"use client";

import { handelToUpdateLecture, ValidVideoTypes } from "@/actions/lecture";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Title from "@/components/ui/title";
import { serverUrl } from "@/config"; 
import { updateLectureSchema } from "@/schema/lectureSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LectureForm from "./lecture-form";
import { useGetModuleQuery } from "@/redux/api/modules";
import { useGetBatchQuery } from "@/redux/api/batchApi";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";
import { useUpdateLectureMutation } from "@/redux/api/lectureApi";
import { toast } from "sonner";
import ErrorToast from "@/components/toast/errorToast";

type IUpdateLectureProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  data: any;
};
const UpdateLectureDialog = ({ data, setOpen }: IUpdateLectureProps) => {
  const [updateLecture, { isLoading }] = useUpdateLectureMutation();
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
  const [video, setVideo] = useState<File | undefined>(); 
  

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
  
  const handleVideoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files && event?.target?.files[0];
    if (file) {
      setVideo(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof updateLectureSchema>) => {
    const toastId = {id:"...", duration: 3000}
toast.loading("Please wait...", toastId,)
    const id = await data?._id;
    values = {
      ...values, 
      video: video,
    }; 
  const formData = new FormData();

  try {
    if (values?.video) {
      if (!ValidVideoTypes.includes(values.video.type)) {
        setError("Only .mp4, .webm and .ogg formats are supported.");
        return;
      }
      formData.append("video", values.video);
    }

    const value = JSON.stringify(values);
    formData.append("data", value);
  const res = await updateLecture({id, data:formData}).unwrap()
  toast.success(res?.message, toastId)
  if(res.success){
    form.reset()
    setOpen(false)
  }
  
} catch (error) {
  ErrorToast(error, "...")
}
  
  }

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
