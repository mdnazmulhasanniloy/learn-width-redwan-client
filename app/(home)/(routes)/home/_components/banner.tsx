"use client";
import React from "react";
import image_1 from "@/assets/homeImage/1.webp";
import image_2 from "@/assets/homeImage/2.webp";
import image_3 from "@/assets/homeImage/3.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import { HoverButton, HoverOutlineButton } from "@/components/ui/hover-button";
import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

const Banner = () => {
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
    <section className="pt-10 bg-sky-50 h-screen w-screen flex justify-between items-center flex-col lg:flex-row mx-auto px-5 gap-10">
      <div className="w-full flex align-middle justify-center">
        <motion.div
          className="m-auto"
          variants={variants}
          initial="initial"
          whileInView="animate"
        >
          <motion.div variants={variants} className="text-animate">
            <h2 className="sm:text-lg md:text-2xl lg:text-6xl font-bold">
              Learn New Skills Online <br /> with Top
              <span className="text-sky-400 underline">Education</span>.
            </h2>
          </motion.div>
          <motion.p
            variants={variants}
            className="sm:text-sm md:text-md lg:text-lg m-[2rem 0 4rem]  my-5"
          >
            Build skills with courses, certificates, and degrees online from{" "}
            <br /> world-class universities and companies.
          </motion.p>
          <div className="flex gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              variants={variants}
              whileInView="animate"
            >
              <Link href={"/sign-in"}>
                <HoverOutlineButton>Join For Free</HoverOutlineButton>
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              variants={variants}
              whileInView="animate"
            >
              <Link href={"/courses"}>
                <HoverButton>Find Course</HoverButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex gap-10 lg:gap-20 items-center">
          <motion.div
            variants={variants}
            initial={{ x: -20, opacity: 0 }}
            whileInView="animate"
            className="relative"
          >
            <Image
              src={image_1}
              loading="lazy"
              decoding="async"
              alt=""
              className="sm:w-[200px] md:w-[200px] lg:w-[300px] sm:h-[200px] md:h-[300px] lg:h-[400px] object-cover"
            />

            <div className="-bottom-3 right-8  p-[10px] lg:p-[20px] w-[180px] md:w-[200px] lg:w-[300px] shadow-lg rounded-md absolute bg-gray-50 flex items-center gap-5 border border-sky-400">
              <div className="flex justify-center items-center  p-2 md:p-3 rounded-full bg-sky-200 text-sky-600 border border-sky-400">
                <BriefcaseBusiness />
              </div>
              <div className="">
                <p className="text-sky-400 text-sm">3.000+</p>
                <p className="text-sm">Free Courses</p>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-col gap-10 lg:gap-20">
            <motion.div
              variants={variants}
              initial={{ y: -20, opacity: 0 }}
              whileInView="animate"
            >
              <Image
                src={image_2}
                height={200}
                width={200}
                loading="lazy"
                decoding="async"
                alt=""
                className="sm:h-[100px] md:h-[150px] lg:h-[200px] sm:w-[100px] md:w-[150px] lg:w-[200px] object-cover"
              ></Image>
            </motion.div>

            <motion.div
              variants={variants}
              initial={{ y: 20, opacity: 0 }}
              whileInView="animate"
            >
              <Image
                src={image_3}
                height={200}
                width={200}
                loading="lazy"
                alt=""
                className="sm:h-[100px] md:h-[150px] lg:h-[200px] sm:w-[100px] md:w-[150px] lg:w-[200px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

{
  /* <section className="-type-1 js-mouse-move-container flex items-center  h-screen w-screen  p-[0 9%]">
      {/* <div className="image">
        <Image
          width={1920}
          height={810}
          decoding="async"
          src={bg_image}
          alt=""
        />
      </div> */
}
{
  /*<div className="flex gap-4 items-center mx-auto">
        <motion.div
          className="max-w-[60rem] z-5 absolute top-0 left-0"
          variants={variants}
          initial="initial"
          whileInView="animate"
        >
          <motion.div variants={variants} className="text-animate">
            <h2 className="text-[4rem] font-bold text-white">
              Learn New Skills Online with Top{" "}
              <span className="text-green-400 underline">Education</span>
            </h2>
          </motion.div>
          <motion.p
            variants={variants}
            className="text-lg m-[2rem 0 4rem] text-white my-5"
          >
            Build skills with courses, certificates, and degrees online from{" "}
            <br /> world-class universities and companies.
          </motion.p>
          <div className="btn-box">
            <HoverButton>Learn More</HoverButton>
          </div>
        </motion.div>
      </div>
    </section> */
}
