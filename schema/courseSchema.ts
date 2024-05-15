import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const coursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.string({ required_error: "duration is required" }),
  regularPrice: z.string({ required_error: "regular price is required" }),
  currentBatch: z.string({ required_error: "current batch is required" }),
  thumbnail: z.any(),
  // .refine((file) => console.log("sssssss", file)),
  // .refine((file) => file[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`),
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
  //   "Only .jpg, .jpeg and .png formats are supported."
  // ),
  // thumbnail: z.instanceof(File),
});
export const updateCoursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.string({ required_error: "duration is required" }),
  regularPrice: z.string({ required_error: "regular price is required" }),
  currentBatch: z.string({ required_error: "current batch is required" }),
  thumbnail: z.any(),
});
