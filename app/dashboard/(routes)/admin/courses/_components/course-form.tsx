import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
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
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type ICourseFormProps = {
  error: string | undefined;
  success: string | undefined;
  form: any;
  onSubmit: any;
  isLoading: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  handleThumbnailChange: Function;
};

const CourseForm = ({
  setOpen,
  error,
  success,
  form,
  onSubmit,
  isLoading,
  handleThumbnailChange,
}: ICourseFormProps) => {
  const { isSubmitting } = form.formState;

  return (
    <div className="py-4">
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
                  <FormLabel htmlFor="CourseName">Course Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                      onChange={(e) => handleThumbnailChange(e)}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter Current Batch"
                      accept="image/png, image/jpeg, image/jpg"
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

          <div className="flex items-center justify-end gap-x-5">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
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

export default CourseForm;
