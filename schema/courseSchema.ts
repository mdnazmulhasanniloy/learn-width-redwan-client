import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const coursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.string({ required_error: "duration is required" }),
  regularPrice: z.string({ required_error: "regular price is required" }),
  currentBatch: z.string({ required_error: "current batch is required" }),
  thumbnail: z.any(),
  isActive: z.boolean({ required_error: "isActive is required" }).default(true),
});
export const updateCoursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.string({ required_error: "duration is required" }),
  regularPrice: z.string({ required_error: "regular price is required" }),
  currentBatch: z.string({ required_error: "current batch is required" }),
  thumbnail: z.any(),
  isActive: z
    .boolean({ required_error: "isActive is required" })
    .default(true)
    .optional(),
});
