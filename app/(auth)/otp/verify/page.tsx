/** @format */

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
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "@/redux/api/authApi";
import { OtpSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { StoreUserInfo } from "@/service/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import otpImage from "@/assets/auth-images/otp.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";

const VerifyOtp = () => {
  const [verifyOtpFn] = useVerifyOtpMutation();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof OtpSchema>) => {
    try {
      const res: any = await verifyOtpFn(data).unwrap();
      if (res?.success) {
        removeFromLocalStorage("otpToken");
        StoreUserInfo({
          accessToken: res?.data?.accessToken,
          deviceIdentifier: res?.data?.deviceIdentifier,
        });
        setError("");
        setLoading(false);
        setSuccess(res?.message);
        router.push("/");
      } else {
        setSuccess("");
        setLoading(false);
        setError(res?.message);
      }
    } catch (error: any) {
      setSuccess("");
      setLoading(false);
      setError(error?.message);
    }
  };
  return (
    <CardWrapper
      title={
        <Image
          src={otpImage}
          alt="signIn"
          className="w-full h-full rounded-full object-cover"
        />
      }
      headerLabel="enter your OTP to verify"
      backButtonLabel="Resend OTP?"
      backButtonLink="/otp/resend"
    >
      <>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              "my-4 flex items-center justify-center",
              loading && "cursor-wait"
            )}
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className="w-full"
                      disabled={loading}
                    >
                      <InputOTPGroup className="w-full flex gap-5 justify-center items-center">
                        <InputOTPSlot
                          index={0}
                          className="border border-sky-400 rounded-md focus:outline-1 focus:outline-sky-200"
                        />
                        <InputOTPSlot
                          index={1}
                          className="border border-sky-400 rounded-md focus:outline-1 focus:outline-sky-200"
                        />
                        <InputOTPSlot
                          index={2}
                          className="border border-sky-400 rounded-md focus:outline-1 focus:outline-sky-200"
                        />
                        <InputOTPSlot
                          index={3}
                          className="border border-sky-400 rounded-md focus:outline-1 focus:outline-sky-200"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </>
    </CardWrapper>
  );
};

export default VerifyOtp;
