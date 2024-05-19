import * as z from "zod";

export const batchSchema = z.object({
  name: z.string({ required_error: "name is required" }).min(4, {
    message: "name must be at least 4 characters.",
  }),
  duration: z.number({ required_error: "duration is required" }),
  startedAt: z.string({ required_error: "startedAt is required" }),
  courseId: z.string({ required_error: "courseId is required" }),
  isActive: z.boolean({ required_error: "isActive is required" }).default(true),
});
export const UpdateBatchSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(4, {
      message: "name must be at least 4 characters.",
    })
    .optional(),
  duration: z.number({ required_error: "duration is required" }).optional(),
  startedAt: z.string({ required_error: "startedAt is required" }).optional(),
  courseId: z.string({ required_error: "courseId is required" }).optional(),
  isActive: z
    .boolean({ required_error: "isActive is required" })
    .default(true)
    .optional(),
});
// export const batchSchema = z.object({
//   name: z.string({ required_error: "name is required" }),
//   duration: z.string({ required_error: "duration is required" }),
//   startedAt: z.string({ required_error: "startAt is required" }),
//   courseId: z.string({ required_error: "courseId is required" }),
// });
