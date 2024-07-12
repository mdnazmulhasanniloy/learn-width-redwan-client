import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const imageFileSchema = z.object({
  fieldname: z.literal("thumbnail"),
  originalname: z
    .string()
    .refine((name) => /\.(jpg|jpeg|png|gif)$/i.test(name), {
      message:
        "Invalid file type for thumbnail. Only JPG, JPEG, PNG, and GIF are allowed.",
    }),
  encoding: z.string(),
  mimetype: z.string().refine((type) => type.startsWith("image/"), {
    message: "Invalid mime type for image. Only images are allowed.",
  }),
  buffer: z.instanceof(Buffer),
});
export const coursesSchema = z.object({
  // thumbnail:z.array(imageFileSchema),
  thumbnail: z.any(),
  name: z.string({ required_error: "name is required" }),
  duration: z.coerce
    .number({ required_error: "duration is required" })
    .max(12)
    .min(1),
  // z.number({ required_error: "duration is required" }),
  regularPrice: z.coerce.number({
    required_error: "regular price is required",
  }),
  currentBatch: z.coerce.number({
    required_error: "current batch is required",
  }),
  isActive: z.boolean({ required_error: "isActive is required" }).default(true),
});
export const updateCoursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.coerce
    .number({ required_error: "duration is required" })
    .max(12)
    .min(1),
  regularPrice: z.coerce.number({
    required_error: "regular price is required",
  }),
  currentBatch: z.coerce.number({
    required_error: "current batch is required",
  }),
  thumbnail: z.any(),
  isActive: z
    .boolean({ required_error: "isActive is required" })
    .default(true)
    .optional(),
});
