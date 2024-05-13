import * as z from "zod";

const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const coursesSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  duration: z.number({ required_error: "duration is required" }),
  regularPrice: z.number({ required_error: "regular price is required" }),
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
  name: z.string({ required_error: "name is required" }).optional(),
  duration: z.number({ required_error: "duration is required" }).optional(),
  regularPrice: z
    .number({ required_error: "regular price is required" })
    .optional(),
  currentBatch: z
    .string({ required_error: "current batch is required" })
    .optional(),
  thumbnail: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

// z.custom(
//     (value) => {
//       // Check if the value is a File object
//       console.log("object", value);
//       if (value instanceof File) {
//         return value; // No error if it's a File object
//       } else {
//         return "Thumbnail must be a File object"; // Error message if it's not a File object
//       }
//     },
//     {
//       // Custom error message if validation fails
//       message: "Invalid thumbnail",
//     }
//   ),
