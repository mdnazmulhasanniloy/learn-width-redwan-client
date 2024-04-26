import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, {
    message: "name must be at least 4 characters.",
  }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "please provide a valid email" }),
  password: z
    .string({ required_error: "password is required" })
    .regex(new RegExp(".*[A-Z].*"), {
      message: "must ba a uppercase characters",
    })
    .regex(new RegExp(".*[a-z].*"), { message: "must a lowercase characters" })
    .regex(new RegExp(".*[0-9].*"), { message: "must be a number" })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
      message: "must be a spacial character",
    })
    .min(6, {
      message: "name must be at least 6 characters.",
    }),
});

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "please provide a valid email" }),
  password: z
    .string({ required_error: "password is required" })
    .regex(new RegExp(".*[A-Z].*"), {
      message: "must ba a uppercase characters",
    })
    .regex(new RegExp(".*[a-z].*"), { message: "must a lowercase characters" })
    .regex(new RegExp(".*[0-9].*"), { message: "must be a number" })
    .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
      message: "must be a spacial character",
    })
    .min(6, {
      message: "name must be at least 6 characters.",
    }),
});
