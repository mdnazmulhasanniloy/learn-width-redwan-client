"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DefaultRoutes } from "./routes";
import auth from "@/firebase/firebase.auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useUserLogoutMutation } from "@/lib/redux/features/user/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const NevItem = () => {
  const [logOut, { data, isLoading, isSuccess, isError }] =
    useUserLogoutMutation();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, loadings, errors] = useSignOut(auth);
  const pathname = usePathname();
  const router = useRouter();

  const handelToSignOut = async () => {
    // const sign_out = await signOut();
    // console.log(sign_out);
    // return;
    const res: any = await logOut({});
    const data: any = await { ...res.data };
    if (data?.success) {
      const sign_out = await signOut();
      //
      // console.log(data);
      // // return;
      if (!sign_out) return toast.error("sign out failed", { id: "sign_out" });
      router.push("/");
      toast.success(data?.message, { id: "sign_out" });
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
      toast.error(errorMessage, { id: "sign_out" });
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "sign_out" });
    }
  }, [isLoading]);
  return (
    <div className="hidden md:flex h-full items-center px-4">
      <div className="flex gap-5">
        {DefaultRoutes.map((item, i) => (
          <Link
            key={i}
            className={cn(
              " font-bold text-sm uppercase hover:text-sky-400 transition-colors duration-500",
              pathname === item.href && "text-sky-400"
            )}
            href={item?.href}
          >
            {item?.label}
          </Link>
        ))}

        {user?.email ? (
          <button
            className="font-bold text-sm uppercase hover:text-sky-400 transition-colors duration-500"
            onClick={handelToSignOut}
          >
            SignOut
          </button>
        ) : (
          <Link
            className={cn(
              " font-bold text-sm uppercase hover:text-sky-400 transition-colors duration-500",
              pathname === "sign-in" && "text-sky-400"
            )}
            href={`sign-in`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NevItem;
