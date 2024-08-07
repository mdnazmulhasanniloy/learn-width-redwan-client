/** @format */

"use client";

import { RegisterSchema } from "@/schema/authSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import CardWrapper from "@/components/auth/card-wrapper";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import signInImage from "@/assets/auth-images/register.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserRegistrationMutation } from "@/redux/api/authApi";
import { StoreOtpInfo } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SuccessToast from "../toast/SuccessToast";
import ErrorToast from "../toast/errorToast";

const SignUpForm = () => {
  const [registerFn] = useUserRegistrationMutation();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { isSubmitting, isValid, errors } = form?.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    const res = await registerFn(values).unwrap();
    console.log(res);
    try {
      if (res.success) {
        // console.log(res?.data?.accessToken, res?.data?.user?.loggedInDevice);
        StoreOtpInfo({
          token: res?.data.token,
        });

        setLoading(false);
        SuccessToast(res?.message);
        router.push("/otp/verify");
      } else {
        setLoading(false);
        ErrorToast(res);
      }
    } catch (error: any) {
      setLoading(false);
      ErrorToast(error);
    }
  };

  return (
    <CardWrapper
      title={
        <Image src={signInImage} alt="signIn" className="p-4 object-fill" />
      }
      headerLabel="Welcome to sign up page"
      backButtonLabel="Have an account?"
      backButtonLink="/sign-in"
    >
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="my-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Mr Jodo"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-5 relative">
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      type={isShow ? "text" : "password"}
                      {...field}
                      disabled={loading}
                      placeholder="******"
                      className={cn(
                        "p-3 border rounded-lg",
                        errors?.password ? "border-red-400" : "border-sky-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                  <div
                    className="absolute top-9 right-4 text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {isShow ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </FormItem>
              )}
            ></FormField>

            <Button
              type="submit"
              className={cn(
                "w-full border border-sky-400 bg-sky-400 hover:text-sky-400 hover:bg-transparent",
                (!isValid || isSubmitting || loading) && "cursor-not-allowed"
              )}
              disabled={!isValid && isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign in
            </Button>
          </form>
        </Form>
      </>
    </CardWrapper>
  );
};

export default SignUpForm;
