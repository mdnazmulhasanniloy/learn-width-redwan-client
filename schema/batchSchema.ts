import * as z from "zod";

export const batchSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.string({ required_error: "duration is required" }),
  startAt: z.string({ required_error: "startAt is required" }),
  courseId: z.string({ required_error: "courseId is required" }),
});
