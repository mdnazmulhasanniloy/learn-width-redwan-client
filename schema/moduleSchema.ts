import { z } from "zod";

export const moduleSchema = z.object({
  moduleName: z.string({ required_error: "module name is required" }),
  course: z.string({ required_error: "batch id is required" }),

  batch: z.string({ required_error: "batch id is required" }),
  isActive: z.boolean({ required_error: "isActive is required" }).default(true),
});
export const UpdateModuleSchema = z.object({
  moduleName: z
    .string({ required_error: "module name is required" })
    .optional(),
  course: z.string({ required_error: "batch id is required" }).optional(),

  batch: z.string({ required_error: "batch id is required" }).optional(),
  isActive: z
    .boolean({ required_error: "isActive is required" })
    .default(true)
    .optional(),
});
