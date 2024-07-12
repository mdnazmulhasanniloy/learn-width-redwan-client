"use client";

import Image from "next/image";
import React from "react";
import image from "@/assets/signinImage/device-clear.aff66d28.png";
import { useClearDeviceMutation } from "@/redux/api/authApi";
import { RemoveUserInfo, StoreUserInfo } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ErrorToast from "@/components/toast/errorToast";
import SuccessToast from "@/components/toast/SuccessToast";

const ClearDevicePage = () => {
  const [clearSessionFn] = useClearDeviceMutation();
  const router = useRouter();
  const { toast } = useToast();
  const handelToClearDevice = async () => {
    try {
      const res = await clearSessionFn({}).unwrap();
      console.log(res);
      if (res.success) {
        RemoveUserInfo();
        StoreUserInfo({
          accessToken: res?.data?.accessToken,
          deviceIdentifier: res?.data?.user?.loggedInDevice,
        });
        SuccessToast(res.message);
        router.push("/");
      } else {
        ErrorToast(res);
        // toast({
        //   variant: "destructive",
        //   title: res.message,
        //   action: <ToastAction altText="Try again">Try again</ToastAction>,
        // });
      }
    } catch (error) {
      ErrorToast(error);
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: "There was a problem with your request.",
      //   action: <ToastAction altText="Try again">Try again</ToastAction>,
      // });
    }
  };
  return (
    <div className="h-full w-[60%] mx-auto flex flex-col items-center justify-center gap-20">
      <h2 className="text-3xl font-bold text-sky-400">Device Limit Exceeded</h2>
      <Image
        src={image}
        alt="Session Limit"
        className="object-fill h-auto w-auto"
      />
      <p className="text-md font-sans first-letter:collapse text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        quis, atque repellat dolorem aut laboriosam voluptatem quas ex rem
        optio.
      </p>
      <div className="flex items-center">
        <button className="px-5 py-3 rounded-lg text-sky-400  ">LogOut</button>
        <button
          onClick={handelToClearDevice}
          className="px-5 py-3 rounded-lg text-sky-400 border border-sky-400 bg-transparent hover:bg-sky-400 hover:text-white  transition-all duration-300"
        >
          Clear All Device
        </button>
      </div>
    </div>
  );
};

export default ClearDevicePage;
