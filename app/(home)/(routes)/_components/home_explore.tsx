"use client ";
import working from "@/assets/homeImage/working.png";
import { HoverButton } from "@/components/ui/hover-button";
import Image from "next/image";
import React from "react";

const HomeExplore = () => {
  return (
    <section className="my-10 w-11/12 mx-auto flex flex-col md:flex-row border border-gray-200 rounded-md overflow-hidden shadow-md items-center justify-center">
      <div className="w-full md:w-[30%]">
        <Image
          src={working}
          height={400}
          width={0}
          loading="lazy"
          decoding="async"
          alt=""
          className="w-full object-cover"
        ></Image>
      </div>

      <div className="w-full md:w-[70%] p-5 md:p-20 flex flex-col justify-between items-baseline">
        <h2 className="text-2xl md:text-3xl font-semibold md:text-center mt-5">
          Explore The E-Learning Institute
        </h2>
        <p className="sm:text-sm md:text-lg text-black my-10">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure.{" "}
          <span className="my-3 block">
            Anything embarrassing hidden in the middle of text. All the Lorem
            Ipsum generators on the Internet tend to repeat predefined.
          </span>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div className="flex flex-col">
            <h1 className="text-lg text-start font-bold">2.12k+</h1>
            <p className="text-sm">Online Course</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg text-start font-bold">600+</h1>
            <p className="text-sm">Expert member</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg text-start font-bold">1k+</h1>
            <p className="text-sm">Rating & Review</p>
          </div>
        </div>
        <div className="mt-10">
          <HoverButton>Read More</HoverButton>
        </div>
      </div>
    </section>
  );
};

export default HomeExplore;
