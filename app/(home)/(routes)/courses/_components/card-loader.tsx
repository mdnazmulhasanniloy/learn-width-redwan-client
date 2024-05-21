"use client";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

const CardLoader = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10];
  const variants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
      {items?.map((item) => (
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="p-5 border border-gray-200 rounded-md"
          key={item}
        >
          <div className="">
            <figure>
              <Skeleton width="100%" height="200px" />
            </figure>
            <div className="mt-5">
              <Skeleton width="200px" height="20px" />
            </div>
            <div className="mt-5">
              <>
                <Skeleton width="full" height="20px" />
                <Skeleton width="full" height="20px" />
                <Skeleton width="100px" height="20px" />
              </>

              <div className="flex justify-between items-center my-5">
                <Skeleton width="150px" height="15px" />

                <Skeleton width="80px" height="15px" />
              </div>

              <div className="flex justify-end">
                <Skeleton width="150px" height="30px" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardLoader;
