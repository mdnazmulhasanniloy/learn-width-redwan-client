"use client";
import Title from "@/components/ui/title";
import React from "react";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Slider from "react-slick";
import { successStudent } from "./constants";
import SuccessfulStudentsCard from "./successful-students-card";

// const NextArrow = (props: any) => {
//   const { onClick } = props;
//   return (
//     <div className="control-btn" onClick={onClick}>
//       <button
//         className="absolute top-2/4  -right-2 z-30 w-10 h-10
//                   bg-transparent hover:bg-sky-400
//                   text-sky-400 hover:text-white
//                   border-2 border-sky-400 rounded-full
//                   flex justify-center items-center
//                   transition-all duration-300"
//       >
//         <ArrowRight />
//       </button>
//     </div>
//   );
// };

// const PrevArrow = (props: any) => {
//   const { onClick } = props;
//   return (
//     <div className="control-btn" onClick={onClick}>
//       <button
//         className="absolute top-2/4 -left-5 z-30 w-10 h-10
//                  bg-transparent hover:bg-sky-400
//                   text-sky-400 hover:text-white
//                   border-2 border-sky-400 rounded-full
//                    flex justify-center items-center
//                    transition-all duration-300"
//       >
//         <ArrowLeft />
//       </button>
//     </div>
//   );
// };

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

  return (
    <section className="w-11/12 mx-auto my-20">
      <div className="w-screen">
        <h2 className="sm:text-lg md:text-4xl font-semibold text-start">
          Meet Our Successful Students
        </h2>

        <p className="text-sm md:text-md text-start mt-4">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      <div className="w-11/12 mx-auto my-20">
        <Slider {...settings}>
          {successStudent?.map((student, i) => (
            <SuccessfulStudentsCard key={i} student={student} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SuccessfulStudents;
