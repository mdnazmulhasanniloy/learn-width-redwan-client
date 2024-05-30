"use client";
import { MdFacebook } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "@/firebase/firebase.auth";
import { useState } from "react";
import {
  useGetUserByEmailQuery,
  useUerLoginMutation,
  useUerRegisterMutation,
} from "@/lib/redux/features/user/userSlice";
import { SignInWithEmailAction } from "@/actions/auth/signInAction";
import { useRouter } from "next/navigation";
// import { googleLogin, githubLogin } from "@/actions/register";

type ISocialProp = {
  setSuccess: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  setError: (
    value:
      | string
      | undefined
      | ((prev: string | undefined) => string | undefined)
  ) => void;
  setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const Social = ({ setLoading, setSuccess, setError }: ISocialProp) => {
  const [email, setEmail] = useState<string | undefined>("");
  const [registerFn] = useUerRegisterMutation();
  const [signInFn] = useUerLoginMutation();
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { data, isSuccess } = useGetUserByEmailQuery(email);
  const router = useRouter();
  // const handelToSignInWithFacebook = async () => {
  //   await SignInWithEmailAction({
  //     setEmail,
  //     setLoading,
  //     setSuccess,
  //     setError,
  //     signInWith: signInWithFacebook,
  //     isSuccess,
  //     data,
  //     registerFn,
  //     signInFn,
  //     router,
  //   });
  // };
  const handelToSignInWithGitHub = async () => {
    await SignInWithEmailAction({
      setEmail,
      setLoading,
      setSuccess,
      setError,
      signInWith: signInWithGithub,
      isSuccess,
      data,
      registerFn,
      signInFn,
      router,
    });
  };
  const handelToSignInWithGoogle = async () => {
    await SignInWithEmailAction({
      setEmail,
      setLoading,
      setSuccess,
      setError,
      signInWith: signInWithGoogle,
      isSuccess,
      data,
      registerFn,
      signInFn,
      router,
    });
  };
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between items-center gap-5">
        {/* <div
          onClick={handelToSignInWithFacebook}
          className="text-xl px-10 py-3 text-[#1877F2] border  border-gray-200 shadow-lg rounded-lg cursor-pointer hover:bg-red-50"
        >
          <MdFacebook />
        </div> */}
        <div
          className="text-xl px-10 py-3 border border-gray-200 shadow-lg rounded-lg cursor-pointer hover:bg-red-50"
          onClick={handelToSignInWithGitHub}
        >
          <FaGithub />
        </div>
        <div
          className="text-xl px-10 py-3 border border-gray-200 shadow-lg rounded-lg cursor-pointer hover:bg-red-50"
          onClick={handelToSignInWithGoogle}
        >
          <FcGoogle />
        </div>
      </div>
    </div>
  );
};

export default Social;
