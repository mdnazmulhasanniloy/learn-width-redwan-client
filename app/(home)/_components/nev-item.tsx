"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DefaultRoutes } from "./routes";
// import { useUserLogoutMutation } from "@/lib/redux/features/user/userSlice";

const NevItem = () => {
  // const [logOut, { data, isLoading, isSuccess, isError }] =
  //   useUserLogoutMutation();
  const pathname = usePathname();

  const handelToSignOut = async () => {};

  // useEffect(() => {
  //   if (isLoading) {
  //     toast.loading("Loading...", { id: "sign_out" });
  //   }
  // }, [isLoading]);
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

        {/* {user?.email ? (
          <button
            className="font-bold text-sm uppercase hover:text-sky-400 transition-colors duration-500"
            onClick={handelToSignOut}
          >
            SignOut
          </button>
        ) : ( */}
        <Link
          className={cn(
            " font-bold text-sm uppercase hover:text-sky-400 transition-colors duration-500",
            pathname === "sign-in" && "text-sky-400"
          )}
          href={`sign-in`}
        >
          Login
        </Link>
        {/* )} */}
      </div>
    </div>
  );
};

export default NevItem;
