import * as z from "zod";

export const coursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.number({ required_error: "duration is required" }),
  regularPrice: z.number({ required_error: "regular price is required" }),
  currentBatch: z.number({ required_error: "current batch is required" }),
  thumbnail: z.string({ required_error: "thumbnail is required" }),
});
