"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Title from "@/components/ui/title";
import { cn } from "@/lib/utils";
import { batchSchema } from "@/schema/batchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serverUrl } from "@/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useAddBatchMutation,
  useGetBatchQuery,
} from "@/lib/redux/features/batch/batchSlice";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Loader2 } from "lucide-react";
import { getCourse } from "@/actions/course";

const BatchForm = () => {
  const [addBatch, { isLoading, isSuccess, isError }] = useAddBatchMutation();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState({});
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [searchTram, setSearchTram] = useState<string | undefined>("");
  const [meta, setMeta] = useState({ limit: 2, page: 1, total: 0 });

  const form = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      name: "",
      duration: 0,
      startedAt: "",
      courseId: "",
    },
  });

  const { isSubmitting, isValid, errors } = form?.formState;

  const onSubmit = async (values: z.infer<typeof batchSchema>) => {
    setSuccess("");
    setError("");
    values.duration = parseInt(values.duration);

    try {
      const res = await addBatch(values);
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
        setError(errorMessage);
      }
    } catch (error) {
      setError("Batch creation failed");
    }

    // addBatch(values)
    //   .then((data: any) => {
    //     if (data?.data?.success) {
    //       setSuccess(`${data?.data?.message}`);
    //       form.reset();
    //     }
    //     if (!data?.data?.success || data?.data?.errorMessages) {
    //       // data?.data?.errorMessages.map((err) => form.setError());

    //       setError(
    //         `${data?.data?.message} \n ${
    //           data?.data?.errorMessages &&
    //           JSON.stringify(data?.data?.errorMessages)
    //         }`
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     setError(`batch creation failed`);
    //   });
  };
  return (
    <div className="max-w-5xl h-full mx-auto flex items-center justify-center">
      <div className="shadow-lg p-5 rounded-md ">
        <Title title={`Add Batch`} />
        <FormError message={error} />
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
                    <FormLabel htmlFor="name">Batch Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Batch Name"
                        className={cn(
                          "p-3 border rounded-lg",
                          errors?.name ? "border-red-400" : "border-sky-400"
                        )}
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
                    <FormLabel htmlFor="duration">Batch Duration</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Batch duration"
                        className={cn(
                          "p-3 border rounded-lg",
                          errors?.duration ? "border-red-400" : "border-sky-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="duration">Start At</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        disabled={isSubmitting || isLoading}
                        placeholder="Enter Batch duration"
                        className={cn(
                          "p-3 w-full border rounded-lg",
                          errors?.startedAt
                            ? "border-red-400"
                            : "border-sky-400"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course ID</FormLabel>
                    <Select
                      disabled={isSubmitting || isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "border border-sky-400",
                            errors?.courseId && "border-red-400"
                          )}
                        >
                          <SelectValue placeholder="Select a Course" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <Input
                          type="search"
                          onChange={(e) => setSearchTram(e?.target?.value)}
                        />
                        {courses?.length > 0 ? (
                          courses?.map(
                            (each: { _id: string; name: string }) => (
                              <SelectItem key={each?._id} value={each?._id}>
                                {each?.name}
                              </SelectItem>
                            )
                          )
                        ) : (
                          <h2 className="text-red-400 text-center text-sm py-4">
                            No Course Found!
                          </h2>
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-x-2">
              <Link href="/dashboard/admin/batch">
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

export default BatchForm;
