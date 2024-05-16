"use client";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

type ILectureFormProps = {
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  error: string | undefined;
  success: string | undefined;
  form: any;
  onSubmit: any;
  isLoading: boolean;
  handleVideoChange: Function;
  courses: any;
  batches: any;
  modules: any;
};

const LectureForm = ({
  setOpen,
  error,
  success,
  form,
  onSubmit,
  isLoading,
  handleVideoChange,
  courses,
  batches,
  modules,
}: ILectureFormProps) => {
  const { isSubmitting } = form?.formState;

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
              name="lectureName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lectureName">Lecture Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter Lecture Name"
                      className={cn(
                        "border border-sky-400",
                        form?.formState?.errors?.lectureName && "border-red-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="topic">Topic</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter Topic"
                      className={cn(
                        "border border-sky-400",
                        form?.formState?.errors?.topic && "border-red-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Lecture Type</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter Lecture Type"
                      className={cn(
                        "border border-sky-400",
                        form?.formState?.errors?.type && "border-red-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="video">Lecture Video</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      onChange={(e) => handleVideoChange(e)}
                      disabled={isSubmitting || isLoading}
                      placeholder="add a video"
                      accept="video/mp4, video/webm, video/ogg"
                      className={cn(
                        "border border-sky-400",
                        form?.formState?.errors?.video && "border-red-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="startAt">start At</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter startAt"
                      className={cn(
                        "border border-sky-400",
                        form?.formState?.errors?.startAt && "border-red-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endsAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="endsAt">ends At</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter EndsAt"
                      className={cn(
                        "border border-sky-400",
                        form?.formState?.errors?.endsAt && "border-red-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
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
                    <SelectContent className="h-40 overflow-y-scroll">
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
            <FormField
              control={form.control}
              name="batchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch</FormLabel>
                  <Select
                    disabled={isSubmitting || isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "border border-sky-400",
                          form?.formState?.errors?.batchId && "border-red-400"
                        )}
                      >
                        <SelectValue placeholder="Select a batch" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent className="h-40 overflow-y-scroll">
                      {batches?.length > 0 ? (
                        batches?.map((each: { _id: string; name: string }) => (
                          <SelectItem key={each?._id} value={each?._id}>
                            {each?.name}
                          </SelectItem>
                        ))
                      ) : (
                        <h2 className="text-red-400 text-center text-sm py-4">
                          No batch Found!
                        </h2>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module</FormLabel>
                  <Select
                    disabled={isSubmitting || isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "border border-sky-400",
                          form?.formState?.errors?.moduleId && "border-red-400"
                        )}
                      >
                        <SelectValue placeholder="Select a module" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent className="h-40 overflow-y-scroll">
                      {modules?.length > 0 ? (
                        modules?.map(
                          (each: { _id: string; moduleName: string }) => (
                            <SelectItem key={each?._id} value={each?._id}>
                              {each?.moduleName}
                            </SelectItem>
                          )
                        )
                      ) : (
                        <h2 className="text-red-400 text-center text-sm py-4">
                          No module Found!
                        </h2>
                      )}
                    </SelectContent>
                  </Select>
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
                form.reset();
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

export default LectureForm;
