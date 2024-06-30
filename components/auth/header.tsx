/** @format */

"use client";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface IHeaderProps {
  label: string;
  title?: any;
}
const Header = ({ label, title }: IHeaderProps) => {
  return (
    <div className="absolute top-[-56px] left-[35%] rounded-full h-28 w-28 shadow-lg flex items-center justify-center bg-white border border-sky-400">
      {title ? title : "🔐"}
    </div>
  );
};
// w-full flex flex-col gap-y-4 items-center justify-center
export default Header;
