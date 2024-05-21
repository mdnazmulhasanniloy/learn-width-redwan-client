"use client";
import React from "react";
import { Facebook, Github, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/Logo/white Logo.svg";

const Footer = () => {
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
    <footer>
      <div className="bg-gray-800 py-4 text-gray-400">
        <div className="container px-4 mx-auto">
          <div className="-mx-4 flex flex-wrap justify-between">
            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
              className="px-4 my-4 w-full xl:w-1/5"
            >
              <a href="/" className="block w-56 mb-10">
                <Image
                  src={Logo}
                  height={0}
                  width={0}
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </a>
              <motion.p
                variants={variants}
                initial={{ x: 20, opacity: 0 }}
                whileInView="animate"
                className="text-justify"
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum,
                similique. Dolores minus, aut nisi, explicabo, dolor porro
                suscipit quia error alias ratione laborum eaque recusandae earum
                quod doloribus nesciunt repellendus!
              </motion.p>
            </motion.div>

            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
              className="px-4 my-4 w-full sm:w-auto"
            >
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-sky-400">
                  Company
                </h2>
              </div>
              <ul className="leading-8">
                <motion.li
                  variants={variants}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView="animate"
                >
                  <a href="#" className="hover:text-sky-400">
                    About Us
                  </a>
                </motion.li>
                <motion.li
                  variants={variants}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView="animate"
                >
                  <a href="#" className="hover:text-sky-400">
                    Terms &amp; Conditions
                  </a>
                </motion.li>
                <motion.li
                  variants={variants}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView="animate"
                >
                  <a href="#" className="hover:text-sky-400">
                    Privacy Policy
                  </a>
                </motion.li>
                <motion.li
                  variants={variants}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView="animate"
                >
                  <a href="#" className="hover:text-sky-400">
                    Contact Us
                  </a>
                </motion.li>
              </ul>
            </motion.div>
            {/* <div className="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">
                  Blog
                </h2>
              </div>
              <ul className="leading-8">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Getting Started With HTML and CSS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    What Is Flex And When to Use It?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    How TailwindCSS Can Help Your Productivity?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    5 Tips to Make Responsive Website
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    See More
                  </a>
                </li>
              </ul>
            </div> */}
            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
              className="px-4 my-4 w-full sm:w-auto xl:w-1/5"
            >
              <div>
                <motion.h2
                  variants={variants}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView="animate"
                  className="inline-block text-2xl pb-4 mb-4 border-b-4 border-sky-400"
                >
                  Connect With Us
                </motion.h2>
              </div>
              <motion.div
                variants={variants}
                initial={{ x: 20, opacity: 0 }}
                whileInView="animate"
                className="flex items-center gap-4"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center h-8 w-8 border border-white rounded-full mr-1 hover:text-sky-400 hover:border-sky-400"
                >
                  <Facebook />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center h-8 w-8 border border-white rounded-full mr-1 hover:text-sky-400 hover:border-sky-400"
                >
                  <Youtube />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center h-8 w-8 border border-white rounded-full mr-1 hover:text-sky-400 hover:border-sky-400"
                >
                  <Instagram />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center h-8 w-8 border border-white rounded-full mr-1 hover:text-sky-400 hover:border-sky-400"
                >
                  <Github />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        className="bg-sky-400 py-4 text-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Copyright © 2024 MD Nazmul Hasan
            </div>
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Made with ❤️ by IT-Somadan.
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
