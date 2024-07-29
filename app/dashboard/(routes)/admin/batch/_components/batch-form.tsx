"use client"; 
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type IBatchFormProps = { 
  form: any;
  onSubmit: any;
  isLoading: boolean;
  courses: any;
  handleDurationChange: Function;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
 
};
const BatchForm = ({
  setOpen,  
  form,
  onSubmit, 
  courses,
  isLoading,
  handleDurationChange,
}: IBatchFormProps) => {
  const { isSubmitting } = form.formState;

  return (
    <div className="py-4"> 
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
                        form.formState.errors?.name
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="duration">Batch Duration</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => handleDurationChange(e)}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter Batch duration"
                      className={cn(
                        "p-3 border rounded-lg",
                        form?.formState?.errors?.duration
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
                        form?.formState?.errors?.startedAt
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
                          form?.formState?.errors?.courseId && "border-red-400"
                        )}
                      >
                        <SelectValue placeholder="Select a Course" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent> 
                      {courses?.length > 0 ? (
                        courses?.map((each: { _id: string; name: string }) => (
                          <SelectItem key={each?._id} value={each?._id}>
                            {each?.name}
                          </SelectItem>
                        ))
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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setOpen(false);
                form.reset();
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
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
  );
};

export default BatchForm;
