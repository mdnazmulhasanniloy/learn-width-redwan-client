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
import { useState } from "react";
// import useS3Uploader from "@/hooks/useS3Uploader";
import Title from "@/components/ui/title";
import { useAddCourseMutation } from "@/lib/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { coursesSchema } from "@/schema/courseSchema";

const CreatePage = () => {
  const [createPost, { isLoading, isError, error, isSuccess, data }] =
    useAddCourseMutation();
  //   const { uploadFileToS3, uploadResponse, uploadError } = useS3Uploader();
  const [file, setFile] = useState();

  const form = useForm<z.infer<typeof coursesSchema>>({
    resolver: zodResolver(coursesSchema),
    defaultValues: {
      name: "",
      duration: 0,
      regularPrice: 0,
      currentBatch: 0,
      thumbnail: "",
    },
  });

  const { isSubmitting, isValid } = form?.formState;

  const onSubmit = async (values: z.infer<typeof coursesSchema>) => {
    console.log(values);
    try {
      await createPost({ ...values }).unwrap();
    } catch (err) {
      console.error(err);
    }
    // try {
    //   if (values?.thumbnail) {
    //     await uploadFileToS3(values?.thumbnail, `$course-{values.name}`);
    //   }
    //   console.log(values);
    // } catch (error) {
    //   console.error(error?.message);
    // }
  };

  if (isLoading) {
    toast.loading("course adding...", { id: "course" });
  } else if (isSuccess) {
    if (data?.success) {
      toast.success("course add successfully", { id: "course" });
    } else {
      toast.error(data?.message, { id: "course" });
    }
  } else if (isError) {
    toast.error(error?.message, { id: "course" });
    console.error(error);
  }

  console.log(data);
  return (
    <div className="maz-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6  ">
      <div className="shadow-lg p-5 rounded-md">
        <Title title={`Add Course`} />
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
