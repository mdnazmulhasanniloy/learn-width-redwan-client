"use client";

import React from "react";
import { motion } from "framer-motion";
import Title from "@/components/ui/title";
import comma from "@/assets/homeImage/comma.png";
import Image from "next/image";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentReview = () => {
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
    <section className="my-20 w-11/12 mx-auto ">
      {/* <LoadingCard variants={variants} /> */}

      <div className="flex flex-col justify-center items-center mb-20">
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className=""
        >
          <Title className="text-2xl md:text-5xl font-semibold text-center">
            Some Students Feedback
          </Title>
        </motion.div>

        <motion.p
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="text-md text-center mt-4"
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </motion.p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="w-full p-8 border border-gray-200 text-black rounded-md"
        >
          <div className="flex justify-between items-center">
            <motion.div
              variants={variants}
              initial={{ x: -20, opacity: 0 }}
              whileInView="animate"
              className=""
            >
              <Image
                src={comma}
                height={0}
                width={0}
                loading="lazy"
                decoding="async"
                alt="comma"
                className="w-[60px] h-[45px] object-cover"
              />
            </motion.div>
            <motion.div
              variants={variants}
              initial={{ x: 20, opacity: 0 }}
              whileInView="animate"
              className="flex items-center text-lg gap-2"
            >
              4.5 <Star className="text-yellow-400" />
            </motion.div>
          </div>

          <motion.p
            initial="initial"
            whileInView="animate"
            className="text-md text-black justify-start my-10"
          >
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which don&apos;t look even slightly
            believable. If you are going to use a passage of Lorem.
          </motion.p>
          <motion.div
            initial="initial"
            whileInView="animate"
            className="flex items-center gap-3"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-md font-bold">Nazmul Hasan</h2>
              <p className="text-sm">Web Developer</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="w-full p-8 border border-gray-200 text-black rounded-md"
        >
          <div className="flex justify-between items-center">
            <motion.div
              variants={variants}
              initial={{ x: -20, opacity: 0 }}
              whileInView="animate"
              className=""
            >
              <Image
                src={comma}
                height={0}
                width={0}
                loading="lazy"
                decoding="async"
                alt="comma"
                className="w-[60px] h-[45px] object-cover"
              />
            </motion.div>
            <motion.div
              variants={variants}
              initial={{ x: 20, opacity: 0 }}
              whileInView="animate"
              className="flex items-center text-lg gap-2"
            >
              4.5 <Star className="text-yellow-400" />
            </motion.div>
          </div>

          <motion.p
            initial="initial"
            whileInView="animate"
            className="text-md text-black justify-start my-10"
          >
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which don&apos;t look even slightly
            believable. If you are going to use a passage of Lorem.
          </motion.p>
          <motion.div
            initial="initial"
            whileInView="animate"
            className="flex items-center gap-3"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-md font-bold">Nazmul Hasan</h2>
              <p className="text-sm">Web Developer</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentReview;
