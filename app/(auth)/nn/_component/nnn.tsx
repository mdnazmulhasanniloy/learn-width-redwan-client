"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Form, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { RegisterSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Nnn = ({ isOpen, isRegisterOpen, handleClickToClose }: any) => {
  const registerVariants = {
    open: {
      opacity: 1,
      width: "500px",
      height: "700px",
      borderRadius: "12px",
      top: 0,
      left: 0,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
    closed: {
      width: "80px",
      height: "80px",
      borderRadius: "9999px",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid, errors } = form?.formState;

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    // setLoading(true);
    setSuccess("");
    setError("");
    try {
      console.log(values);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <motion.div
      animate={isRegisterOpen ? "open" : "closed" && !isOpen && { opacity: 0 }}
      variants={registerVariants}
      className="absolute top-20 right-[210px] h-20 w-20 bg-sky-400 text-white rounded-full shadow-lg "
    >
      <div className="relative h-full w-full p-5">
        <Plus
          onClick={handleClickToClose}
          className="h-10 w-10 absolute top-3 right-3 rotate-45 hover:cursor-pointer"
        />
        <h1 className="text-center text-2xl my-5">Register</h1>
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
      </div>
    </motion.div>
  );
};

export default Nnn;
