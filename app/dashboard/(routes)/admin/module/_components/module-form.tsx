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
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Select } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import React from "react";

type IModuleFormProps = {
  error: string | undefined;
  success: string | undefined;
  form: any;
  onSubmit: Function;
  isLoading: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  courses: any;
  batches: any;
};

const ModuleForm = ({
  setOpen,
  error,
  success,
  form,
  onSubmit,
  isLoading,
  courses,
  batches,
}: IModuleFormProps) => {
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
              name="moduleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Module Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isLoading}
                      placeholder="Enter Module Name"
                      className={cn(
                        "p-3 border rounded-lg",
                        form.formState.errors?.moduleName
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
              name="course"
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
                          form?.formState?.errors?.course && "border-red-400"
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
              name="batch"
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
                          form?.formState?.errors?.batch && "border-red-400"
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

export default ModuleForm;
