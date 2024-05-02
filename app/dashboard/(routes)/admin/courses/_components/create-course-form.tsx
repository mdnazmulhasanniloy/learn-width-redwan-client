"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  useFormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import useS3Uploader from "@/hooks/useS3Uploader";
import Title from "@/components/ui/title";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { coursesSchema } from "@/schema/courseSchema";
import { useAddCourseMutation } from "@/lib/redux/features/courses/coursesApi";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CreateCourseForm = () => {
  const [createCourse, { isLoading }] = useAddCourseMutation();
  const [success, setSuccess] = useState<string | undefined>("");
  const [errors, setErrors] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof coursesSchema>>({
    resolver: zodResolver(coursesSchema),
    defaultValues: {
      name: undefined,
      duration: undefined,
      regularPrice: undefined,
      category: undefined,
      thumbnail: undefined,
    },
  });

  const { isSubmitting, isValid } = form?.formState;

  const onSubmit = async (values: z.infer<typeof coursesSchema>) => {
    setSuccess("");
    setErrors("");
    console.log("eeeee", values);
    values.duration = parseInt(values.duration);
    values.regularPrice = parseInt(values.duration);

    try {
      const res: any = await createCourse(values);
      const data: any = { ...res.data };
      if (data?.success) {
        setSuccess(`${data?.message}`);
        form.reset();
      } else {
        let errorMessage = data?.message || "An error occurred";
        // Check if there are individual error messages
        if (data?.errorMessages) {
          // Format the individual error message
          const individualErrorMessage = data?.errorMessages?.map(
            (error: { path: string; message: string }) =>
              `${error.path}: ${error.message} \n`
          );
          errorMessage = `${errorMessage}: \n ${individualErrorMessage}`;
        }
        console.log(errorMessage);
        setErrors(errorMessage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // if (isLoading) {
  //   toast.loading("course adding...", { id: "course" });
  // } else if (isSuccess) {
  //   if (data?.success) {
  //     toast.success("course add successfully", { id: "course" });
  //   } else {
  //     toast.error(data?.message, { id: "course" });
  //   }
  // } else if (isError) {
  //   toast.error(error?.message, { id: "course" });
  //   console.error(error);
  // }

  // console.log(data);

  return (
    <div className="max-w-5xl h-full mx-auto flex items-center justify-center">
      <div className="shadow-lg p-5 rounded-md">
        <Title title={`Add Course`} />
        <FormError message={errors} />
        <FormSuccess message={success} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8 "
          >
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="CourseName">Course Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Course Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="thumbnail">Course Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...field}
                        required
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Current Batch"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="CourseDuration">
                      Course Duration
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        required
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Course Duration"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="regularPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="regularPrice">Regular Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        required
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Regular Price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentBatch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="currentBatch">Current Batch</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Current Batch"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-x-2">
              <Link href="/dashboard/admin/courses">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting || isLoading}
                className={cn(
                  "cursor-pointer",
                  (isLoading || isSubmitting) && "cursor-not-allowed"
                )}
              >
                {(isLoading || isSubmitting) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourseForm;
