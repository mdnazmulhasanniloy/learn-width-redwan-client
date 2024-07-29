import React from "react";
import imag from "@/assets/404page/empty-data.svg";
import Image from "next/image";

const EmptyData = () => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <Image src={imag} alt="No Data Found!" />
    </div>
  );
};

export default EmptyData;
