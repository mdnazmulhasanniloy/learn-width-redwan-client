"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HomeJoinCard = () => {
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
    <motion.section
      variants={variants}
      initial="initial"
      whileInView="animate"
      className="w-11/12 mx-auto flex flex-col md:flex-row p-5 md:p-10 bg-sky-400 my-20 "
    >
      <motion.div
        variants={variants}
        initial={{ x: -20 }}
        whileInView="animate"
        className="w-full md:w-[50%] flex flex-col md:align-middle"
      >
        <h2 className="text-3xl font-semibold text-white">Ready to join?</h2>
        <p className="text-white text-md text-start font-medium font-Poppins mt-5">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </motion.div>

      <motion.div
        variants={variants}
        initial={{ x: 20 }}
        whileInView="animate"
        className="w-full md:w-[50%] flex md:items-center md:justify-center mt-5"
      >
        <Link href={"/sign-in"}>
          <button className="px-4 py-3 text-lg md:text-xl bg-white  hover:cursor-pointer hover:border hover:border-black rounded-md">
            Register Now
          </button>
        </Link>
        {/* <Button variant="outline">Register Now</Button>{" "} */}
      </motion.div>
    </motion.section>
  );
};

export default HomeJoinCard;
