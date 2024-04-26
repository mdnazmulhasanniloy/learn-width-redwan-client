"use client";
import { MdFacebook } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
// import { googleLogin, githubLogin } from "@/actions/register";

const Social = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between items-center gap-5">
        <div
          onClick={() => {}}
          className="text-xl px-10 py-3 text-[#1877F2] border  border-gray-200 shadow-lg rounded-lg cursor-pointer hover:bg-red-50"
        >
          <MdFacebook />
        </div>
        <div
          className="text-xl px-10 py-3 border border-gray-200 shadow-lg rounded-lg cursor-pointer hover:bg-red-50"
          onClick={() => {}}
        >
          <FaGithub />
        </div>
        <div
          className="text-xl px-10 py-3 border border-gray-200 shadow-lg rounded-lg cursor-pointer hover:bg-red-50"
          onClick={() => {}}
        >
          <FcGoogle />
        </div>
      </div>
    </div>
  );
};

export default Social;
