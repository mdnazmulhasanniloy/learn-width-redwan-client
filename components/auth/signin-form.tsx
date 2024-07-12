/** @format */

"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import signInImage from "@/assets/auth-images/register.png";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormSuccess from "../form-success";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "@/schema/authSchema";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { StoreUserInfo } from "@/service/auth.service";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SuccessToast from "../toast/SuccessToast";
import ErrorToast from "../toast/errorToast";

const SignInForm = () => {
  const [userLoginFn] = useUserLoginMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      deviceIdentifier: null,
    },
  });

  const [isShow, setIsShow] = useState(false);
  const { isSubmitting, isValid, errors } = form?.formState;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);

    try {
      const deviceIdentifier = getFromLocalStorage("deviceIdentifier");
      values.deviceIdentifier = deviceIdentifier;
      const res = await userLoginFn(values).unwrap();

      console.log(res);
      if (res.success) {
        // console.log(res?.data?.accessToken, res?.data?.user?.loggedInDevice);
        StoreUserInfo({
          accessToken: res?.data?.accessToken,
          deviceIdentifier: res?.data?.deviceIdentifier,
        });

        setLoading(false);
        SuccessToast(res?.message);
        if (res.data.clearSession) {
          router.push("/clear-device");
        } else {
          router.push("/");
        }
      } else {
        setLoading(false);
        ErrorToast(res);
      }
    } catch (error: any) {
      ErrorToast(error);
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      title={
        <Image src={signInImage} alt="signIn" className="p-4 object-fill" />
      }
      headerLabel="Welcome to sign in page"
      backButtonLabel="Don't have an account?"
      backButtonLink="/sign-up"
    >
      <>
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

export default SignInForm;
