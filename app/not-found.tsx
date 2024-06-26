"use client";

import Link from "next/link";
import Img404 from "@/assets/404page/404-2.png";
import group from "@/assets/404page/Group.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/sign-in");
    }, 8000);
  }, [router]);
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you&apos;ve found the doorway to the great nothing
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link href="/">
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src={Img404}
              height={0}
              width={0}
              loading="lazy"
              decoding="async"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src={group}
          height={0}
          width={0}
          loading="lazy"
          decoding="async"
          alt=""
        />
      </div>
    </div>
  );
}
