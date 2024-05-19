"use client";
import { CalendarCheck } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const LoadingCard = ({ variants }: any) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      className="w-full flex flex-col md:flex-row overflow-hidden border border-gra rounded-md shadow-lg hover:cursor-pointer hover:shadow-xl"
    >
      <div className="animate-pulse w-full md:w-[40%] h-full"></div>

      <div className="w-full md:w-[60%] p-4">
        <div className="animate-pulse h-5 w-5"></div>
        <div className="animate-pulse mt-3 h-3 w-full"></div>
        <div className="animate-pulse mt-2 h-3 w-1/2"></div>
        <div className="mt-4 flex justify-between items-center">
          <div className="w-5 h-3 my-4"></div>
          <div className="animate-pulse h-2 w-2"></div>
        </div>
      </div>

      {/* <Image
        src={course?.thumbnail}
        loading="lazy"
        decoding="async"
        alt=""
        className="w-1/3 h-full object-cover"
      /> */}
    </motion.div>
  );
};

export default LoadingCard;
