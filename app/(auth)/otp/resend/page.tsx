"use client";

import CardWrapper from "@/components/auth/card-wrapper";
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
import { useResendOtpMutation } from "@/redux/api/authApi";
import { sendOtpSchema } from "@/schema/authSchema";
import { StoreOtpInfo } from "@/service/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdOutlineMailLock } from "react-icons/md";

const ResendOtpPage = () => {
  const [resendOtpFn] = useResendOtpMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof sendOtpSchema>>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting, isValid, errors } = form?.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof sendOtpSchema>) => {
    setSuccess("");
    setError("");
    setLoading(true);
    console.log(values);
    try {
      const res = await resendOtpFn(values).unwrap();
      if (res.success) {
        StoreOtpInfo({
          token: res?.data.token,
        });

        setError("");
        setLoading(false);
        setSuccess(res?.message);
        router.push("/otp/verify");
      } else {
        setSuccess("");
        setLoading(false);
        setError(res?.message);
      }
    } catch (error: any) {
      setSuccess("");
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <CardWrapper
      title={
        <span>
          <MdOutlineMailLock
            className="text-sky-400 bg-transparent  animate-bounce"
            size={35}
          />
        </span>
      }
      headerLabel="send otp to verify email"
      backButtonLabel="Have a OTP?"
      backButtonLink="/otp/verify"
    >
      <>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="jon@example.com"
                      className={cn(
                        "p-3 border rounded-lg",
                        errors?.email ? "border-red-400" : "border-sky-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Button
              type="submit"
              className={cn(
                "w-full border border-sky-400 bg-sky-400 hover:text-sky-400 hover:bg-transparent",
                (!isValid || isSubmitting || loading) && "cursor-not-allowed"
              )}
              disabled={(!isValid && isSubmitting) || loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>
        </Form>
      </>
    </CardWrapper>
  );
};

export default ResendOtpPage;
