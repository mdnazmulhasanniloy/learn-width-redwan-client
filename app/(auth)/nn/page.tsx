"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Nnn from "./_component/nnn";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const variants = {
    open: { opacity: 0, x: "-250px" },
    closed: { opacity: 1, x: 0 },
  };

  const handleClickToOpen = () => {
    console.log("open");
    setIsOpen(true);
    setTimeout(() => {
      setIsRegisterOpen(true);
    }, 500);
  };

  const handleClickToClose = () => {
    console.log("close");
    setIsRegisterOpen(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="w-11/12 mx-auto flex items-center justify-center">
      <div className="relative h-[700px] w-[500px] bg-white border-2 border-gray-200 rounded-xl shadow-lg">
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          onClick={handleClickToOpen}
          className="absolute top-20 -right-10 h-20 w-20 bg-white text-sky-400 border border-sky-400 rounded-full shadow-lg flex items-center justify-center hover:cursor-pointer hover:bg-sky-400 hover:text-white transition-colors duration-300 ease-in-out"
        >
          <Plus />
        </motion.div>
        <Nnn
          isOpen={isOpen}
          isRegisterOpen={isRegisterOpen}
          handleClickToClose={handleClickToClose}
        />
      </div>
    </div>
  );
};

export default Page;
