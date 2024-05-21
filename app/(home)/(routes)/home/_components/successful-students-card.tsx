import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const SuccessfulStudentsCard = ({ student }: { student: any }) => {
  return (
    <div className="card card-compact w-96 bg-white border border-gray-200 rounded-lg shadow">
      <figure>
        <Image
          src={student?.img}
          height={400}
          width={0}
          loading="lazy"
          decoding="async"
          alt=""
          className="w-full object-cover"
        ></Image>
      </figure>
      <div className="card-body flex flex-col justify-end p-4">
        <h3 className=" font-bold text-lg">{student?.name}</h3>

        <h4 className="text-sky-400 text-md">{student?.role}</h4>
      </div>
    </div>
  );
};

export default SuccessfulStudentsCard;
