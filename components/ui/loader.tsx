import React from "react";
import { MoonLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <MoonLoader color="#0889f1" />
    </div>
  );
};

export default Loader;
