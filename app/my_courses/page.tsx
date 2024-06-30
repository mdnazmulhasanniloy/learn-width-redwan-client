/** @format */
"use client";
import React, { useEffect, useState } from "react";
import VideoArea from "./_components/VideoArea";
import LecturesPage from "./_components/LecturesPage";

export default function MyCourses() {
  return (
    // <div className="w-full flex items-center justify-center gap-3">
    //   <VideoArea />
    //   <SidebarClasses />
    // </div>

    <div className="w-[90%] mx-auto p-4">
      {/* <!-- Header Section --> */}
      <div className="bg-white p-4 rounded shadow-md mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Course Intro Video</h1>
          <span className="text-green-700 font-bold text-lg">500 TK</span>
        </div>
        <div className="flex justify-end mt-2">
          <button className="bg-green-600 text-white py-2 px-4 rounded-md mr-2">
            Lifetime
          </button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md mr-2">
            Buy Now
          </button>
          <button className="bg-yellow-600 text-white py-2 px-4 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="md:flex md:space-x-4">
        <VideoArea />
        <LecturesPage />
      </div>

      {/* <!-- Content Section -->
      <div className="md:flex md:space-x-4">
        {/* <!-- Video and Description --> */}
      {/* <div className="md:w-[30%] bg-white p-4 rounded shadow-md mb-4 md:mb-0"> */}
      {/* <div className="mt-4">
            <h2 className="text-lg font-bold">
              Instructor: Eng. Mahmud Ibrahim
            </h2>
            <p className="mt-2">
              Tailwind CSS is a CSS framework that provides a utility-first
              approach to the developer. It is gaining popularity day by day in
              the developers' community. It is a massive collection of tiny CSS
              utility classes for quickly and consistently building good-looking
              websites. Course video recordings are still in progress. We will
              learn the basics of tailwind and then do some mini and large
              website projects using Tailwind CSS 3.0.
            </p>
          </div>
        </div>  */}

      {/* <!-- Course Curriculum --> */}
      {/* </div> */}
    </div>
  );
}
