"use client";
import { BarChart, Compass, Layout, List, LogIn, LogOut } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { DefaultRoutes } from "./routes";
import auth from "@/firebase/firebase.auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useUserLogoutMutation } from "@/lib/redux/features/user/userSlice";
import { useRouter } from "next/navigation";

const SidebarRoutes = () => {
  const [logOut, { data, isLoading, isSuccess, isError }] =
    useUserLogoutMutation();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, loadingS, errorS] = useSignOut(auth);
  const router = useRouter();

  const handelToSignOut = async () => {
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
    <div className="flex flex-col w-ful">
      {DefaultRoutes?.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}

      {user?.email ? (
        <button
          onClick={handelToSignOut}
          type="button"
          className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
        >
          <div className="flex items-center justify-center gap-x-2 py-4">
            <LogOut size={22} className="text-slate-500" />
            <span className="ml-2">SignOut</span>
          </div>
          <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all duration-500"></div>
        </button>
      ) : (
        <Link
          href={"/sign-in"}
          className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
        >
          <div className="flex items-center justify-center gap-x-2 py-4">
            <LogIn size={22} className="text-slate-500" />
            <span className="ml-2">Sign In</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SidebarRoutes;
