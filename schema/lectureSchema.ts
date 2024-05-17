import { z } from "zod";

export const addLectureSchema = z.object({
  lectureName: z.string({ required_error: "lecture name is required" }),
  topic: z.string({ required_error: "topic is required" }),
  video: z.any(),
  type: z.string({ required_error: "type is required" }),
  isActive: z
    .boolean({ required_error: "isActive is required" })
    .default(true)
    .optional(),
  batchId: z.string({ required_error: "batchId is required" }),
  moduleId: z.string({ required_error: "moduleId is required" }),
  courseId: z.string({ required_error: "courseId is required" }),
});

export const updateLectureSchema = z.object({
  lectureName: z
    .string({ required_error: "lecture name is required" })
    .optional(),
  topic: z.string({ required_error: "topic is required" }).optional(),
  video: z.any().optional(),
  type: z.string({ required_error: "type is required" }).optional(),
  isActive: z
    .boolean({ required_error: "isActive is required" })
    .default(true)
    .optional(),
  batchId: z.string({ required_error: "batchId is required" }).optional(),
  moduleId: z.string({ required_error: "moduleId is required" }).optional(),
  courseId: z.string({ required_error: "courseId is required" }).optional(),
});
