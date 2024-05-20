"use client";
import React from "react";
import Slider from "react-slick";
import { successStudent } from "./constants";
import SuccessfulStudentsCard from "./successful-students-card";
import { motion } from "framer-motion";

const SuccessfulStudents = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
    <section className="w-11/12 mx-auto my-20">
      <motion.div
        variants={variants}
        initial={{ y: -20, opacity: 0 }}
        whileInView="animate"
        className="w-screen"
      >
        <h2 className="sm:text-lg md:text-4xl font-semibold text-start">
          Meet Our Successful Students
        </h2>

        <p className="text-sm md:text-md text-start mt-4">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </motion.div>

      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        className="w-11/12 mx-auto my-20"
      >
        <Slider {...settings}>
          {successStudent?.map((student, i) => (
            <SuccessfulStudentsCard key={i} student={student} />
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default SuccessfulStudents;
