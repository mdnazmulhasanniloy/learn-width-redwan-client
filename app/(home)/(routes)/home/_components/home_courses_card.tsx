"use client";
import React, { useEffect, useState } from "react";
import { ICourse } from "./constants";
import { formatPrice } from "@/lib/format";
import { CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

const HomeCoursesCard = ({
  course,
  variants,
}: {
  course: ICourse;
  variants: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3 * 1000);
  }, []);
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      className="w-full flex flex-col md:flex-row overflow-hidden border border-gray-300 rounded-md shadow-lg hover:cursor-pointer hover:shadow-xl"
    >
      <div className="relative w-full md:w-[40%] h-64 md:h-auto">
        {isLoading ? (
          <Skeleton width="100%" height="100%" className="mt-0 p-0" />
        ) : (
          <Image
            src={course?.thumbnail}
            alt={course?.name}
            fill // Replaces layout="fill"
            loading="lazy"
            placeholder="empty"
            unoptimized
            onLoad={() => setIsLoading(false)}
            className={`${isLoading ? "hidden" : "block"} object-cover`}
          />
        )}
      </div>

      <div className="w-full md:w-[60%] p-4">
        {isLoading ? (
          <Skeleton height={20} width="50%" />
        ) : (
          <h2 className="text-2xl font-bold">{course?.name}</h2>
        )}

        {isLoading ? (
          <div className="mt-3">
            <Skeleton height={12} width="100%" />
            <Skeleton height={12} width="100%" />
            <Skeleton height={12} width="70%" />
          </div>
        ) : (
          <p className="text-md mt-3">
            {course?.description
              ? course?.description
              : "IT-Somadan have a big team who are expert in mobile app development. Our mobile app developers exclusive thought to maximize our use of the Android."}
          </p>
        )}
        <div className="mt-4 flex justify-between items-center">
          {isLoading ? (
            <Skeleton height={14} width="130px" />
          ) : (
            <h2 className="text-xl text-sky-400 my-4">
              {formatPrice(course?.regularPrice)}
            </h2>
          )}
          <div className="flex items-center text-sky-400 gap-2">
            {isLoading ? (
              <Skeleton height={28} width={"28px"} />
            ) : (
              <CalendarCheck />
            )}
            <p className="text-md text-black">
              {isLoading ? (
                <Skeleton height={14} width={"80px"} />
              ) : (
                <>{course?.duration} Months</>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>

    // <motion.div
    //   variants={variants}
    //   initial="initial"
    //   whileInView="animate"
    //   className="w-full flex flex-col md:flex-row overflow-hidden border border-gra rounded-md shadow-lg hover:cursor-pointer hover:shadow-xl"
    // >
    //   <img
    //     src={course?.thumbnail}
    //     alt={course?.name}
    //     loading="lazy"
    //     decoding="async"
    //     className="w-full md:w-[40%] h-full object-cover"
    //   />

    //   <div className="w-full md:w-[60%] p-4">
    //     <h2 className="text-2xl font-bold">{course?.name}</h2>
    //     <p className="text-md mt-3">
    //       {course?.description
    //         ? course?.description
    //         : "IT-Somadan have a big team who are expert in mobile app development. Our mobile app developers exclusive thought to maximize our use of the Android."}
    //     </p>
    //     <div className="mt-4 flex justify-between items-center">
    //       <h2 className="text-xl text-sky-400 my-4">
    //         {formatPrice(course?.regularPrice)}
    //       </h2>
    //       <div className="flex items-center text-sky-400 gap-2">
    //         <CalendarCheck />{" "}
    //         <p className="text-md text-black">{course?.duration} Months</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <Image
    //     src={course?.thumbnail}
    //     loading="lazy"
    //     decoding="async"
    //     alt=""
    //     className="w-1/3 h-full object-cover"
    //   /> */}
    // </motion.div>
  );
};

export default HomeCoursesCard;
