"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

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
import {
  useSendEmailVerification,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useUerLoginMutation } from "@/lib/redux/features/user/userSlice";
import auth from "@/firebase/firebase.auth";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [signInFn, { isLoading }] = useUerLoginMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [signInWithEmailAndPassword, user, loginLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [sendEmailVerification, sending, verifyEmailError] =
    useSendEmailVerification(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isShow, setIsShow] = useState(false);
  const { isSubmitting, isValid, errors } = form?.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        values.email,
        values.password
      );
      if (!userCredential?.user?.emailVerified) {
        await sendEmailVerification();
        await signOut();
        setLoading(false);
        return setError(
          "This Email is not verified, please check your mail box"
        );
      }

      const res: any = await signInFn(values);
      const data: any = { ...res.data };
      if (data?.success) {
        setSuccess(data?.message);
        setLoading(false);
        form.reset();
        router.push("/");
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
    } catch (err: any) {
      throw setError(err?.message);
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome to sign in page"
      backButtonLabel="Don't have an account?"
      backButtonLink="/sign-up"
      showSocial
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
