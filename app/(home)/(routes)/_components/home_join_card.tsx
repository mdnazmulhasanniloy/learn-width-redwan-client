"use Client";

import React from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeJoinCard = () => {
  return (
    <section className="w-11/12 mx-auto flex flex-col md:flex-row p-5 md:p-10 bg-sky-400 my-20 ">
      <div className="w-full md:w-[50%] flex flex-col md:align-middle">
        <h2 className="text-3xl font-semibold text-white">Ready to join?</h2>
        <p className="text-white text-md text-start font-medium font-Poppins mt-5">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      <div className="w-full md:w-[50%] flex md:items-center md:justify-center mt-5">
        <Link href={"/sign-in"}>
          <button className="px-4 py-3 text-lg md:text-xl bg-white  hover:cursor-pointer hover:border hover:border-black rounded-md">
            Register Now
          </button>
        </Link>
        {/* <Button variant="outline">Register Now</Button>{" "} */}
      </div>
    </section>
  );
};

export default HomeJoinCard;
