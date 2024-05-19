import React from "react";

const HoverButton = ({ children }: { children: string }) => {
  return (
    <button className="group relative py-3 px-4 overflow-hidden rounded-lg bg-sky-400 text-lg shadow border border-sky-400">
      <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
      <span className="relative text-white group-hover:text-sky-400 font-poppins font-medium">
        {children}
      </span>
    </button>
  );
};
const HoverOutlineButton = ({ children }: { children: string }) => {
  return (
    <button className="group relative py-3 px-4 overflow-hidden rounded-lg bg-transparent text-lg shadow border border-sky-400">
      <div className="absolute inset-0 w-0 bg-sky-400 transition-all duration-300 ease-out group-hover:w-full"></div>
      <span className="relative text-sky-400 group-hover:text-white font-poppins font-medium">
        {children}
      </span>
    </button>
  );
};

export { HoverButton, HoverOutlineButton };
