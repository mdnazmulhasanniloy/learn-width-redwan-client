"use client";

import { RegisterSchema } from "@/schema/authSchema";
import React, { useEffect, useState, useTransition } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import auth from "@/firebase/firebase.auth";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignOut,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useUerRegisterMutation } from "@/lib/redux/features/user/userSlice";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [registerFn, { isLoading }] = useUerRegisterMutation();
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [
    createUserWithEmailAndPassword,
    user,
    createUserLoading,
    createUserError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateUserError] = useUpdateProfile(auth);
  const [sendEmailVerification, sending, verifyEmailError] =
    useSendEmailVerification(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid, errors } = form?.formState;
  useEffect(() => {
    if (createUserError) {
      setError(createUserError.message);
      setLoading(false);
    }
    if (updateUserError) {
      setError(updateUserError.message);
      setLoading(false);
    }
    if (verifyEmailError) {
      setError(verifyEmailError.message);
      setLoading(false);
    }

    if (createUserLoading || updating || sending || isLoading) setLoading(true);
  }, [
    createUserError,
    updateUserError,
    verifyEmailError,
    createUserLoading,
    updating,
    sending,
    isLoading,
  ]);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const user = await createUserWithEmailAndPassword(
        values?.email,
        values?.password
      );

      if (user?.user?.email) {
        const userUpdate = await updateProfile({ displayName: values?.name });
        if (userUpdate) {
          const register: any = await registerFn(values);

          const data: any = { ...register.data };

          if (data?.success) {
            const success = await sendEmailVerification();

            if (success) {
              setSuccess("Please check your email to verify");
              setLoading(false);
              form.reset();
              setTimeout(async () => {
                await signOut();
                router.push("/sign-in");
              }, 5000);
            }
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
            setLoading(false);
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome to sign up page"
      backButtonLabel="Have an account?"
      backButtonLink="/sign-in"
      showSocial
    >
      <>
        <FormError message={error} />
        <FormSuccess message={success} />
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
                      placeholder="Mr Jondo"
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
