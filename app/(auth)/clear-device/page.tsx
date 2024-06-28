"use client";

import Image from "next/image";
import React from "react";
import image from "@/assets/signinImage/device-clear.aff66d28.png";

const ClearDevicePage = () => {
  return (
    <div className="h-full w-[60%] mx-auto flex flex-col items-center justify-center gap-20">
      <h2 className="text-3xl font-bold text-sky-400">Device Limit Exceeded</h2>
      <Image
        src={image}
        alt="Session Limit"
        className="object-fill h-auto w-auto"
      />
      <p className="text-md font-sans first-letter:collapse text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        quis, atque repellat dolorem aut laboriosam voluptatem quas ex rem
        optio.
      </p>
      <div className="flex items-center">
        <button className="px-5 py-3 rounded-lg text-sky-400  ">LogOut</button>
        <button className="px-5 py-3 rounded-lg text-sky-400 border border-sky-400 bg-transparent hover:bg-sky-400 hover:text-white  transition-all duration-300">
          Clear All Device
        </button>
      </div>
    </div>
  );
};

export default ClearDevicePage;
