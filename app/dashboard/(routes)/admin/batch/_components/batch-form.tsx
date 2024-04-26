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
import { useGetCourseQuery } from "@/lib/redux/features/courses/coursesApi";
import { serverUrl } from "@/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BatchForm = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState({});
  const form = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
  });

  useEffect(() => {
    setCourses([]);
    fetch(`${serverUrl}course`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data", data?.data);
        setCourses(data?.data);
      });
  }, []);

  useEffect(() => {
    const subscription = form?.watch((value, { name, type }) => {
      if (name === "courseId") {
        courses?.forEach((each: { _id: string; name: string }) => {
          if (each?._id === value?.name) {
            setCourseId({
              course_id: each?._id,
              courseName: each?.name,
            });
            return;
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  });

  const { isSubmitting, isValid, errors } = form?.formState;

  const onSubmit = (values: z.infer<typeof batchSchema>) => {
    values.duration = parseInt(values.duration);
    console.log(values);
  };

  return (
    <div className="maz-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6  ">
      <div className="shadow-lg p-5 rounded-md">
        <Title title={`Add Batch`} />
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        placeholder="Enter Batch duration"
                        className={cn(
                          "p-3 w-full border rounded-lg",
                          errors?.startAt ? "border-red-400" : "border-sky-400"
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
                        {courses?.length > 0 &&
                          courses?.map(
                            (each: { _id: string; name: string }) => (
                              <SelectItem key={each?._id} value={each?._id}>
                                {each?.name}
                              </SelectItem>
                            )
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

export default BatchForm;
