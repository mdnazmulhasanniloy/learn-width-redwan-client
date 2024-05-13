import { z } from "zod";

const lectureVideo = z.object({
  liveLink: z.string({ required_error: "video link is required" }),
  videoLink: z.object({
    s3Hoster: z.string({ required_error: "host is required" }),
    vimeoHoster: z.string({ required_error: "vimeo is required" }).optional(),
  }),
});

export const addLectureSchema = z.object({
  lectureName: z.string({ required_error: "lecture name is required" }),
  topic: z.string({ required_error: "topic is required" }),
  notice: z.string({ required_error: "notice is required" }),
  lectureVideo: lectureVideo,
  type: z.string({ required_error: "type is required" }),
  startAt: z.string({ required_error: "startAt is required" }),
  endsAt: z.string({ required_error: "endsAt is required" }),
  isOptional: z.boolean({ required_error: "isOptional is required" }),
  batchId: z.string({ required_error: "batchId is required" }),
  moduleId: z.string({ required_error: "moduleId is required" }),
  courseId: z.string({ required_error: "courseId is required" }),
});
export const updateLectureSchema = z.object({});
