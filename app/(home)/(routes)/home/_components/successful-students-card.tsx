import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const SuccessfulStudentsCard = ({ student }: { student: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3 * 1000);
  }, []);

  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            {/* <Skeleton height={400} width={"100%"} /> */}
            {/* 
            //todo: when dummy data load and then use  it
            <Image
              src={student?.img}
              alt={student.name}
              fill
              loading="lazy"
              placeholder="empty"
              unoptimized
              onLoad={() => setIsLoading(false)}
              className={`${
                isLoading ? "hidden" : "block"
              } w-full object-cover`}
            /> */}

            {isLoading ? (
              <Skeleton height={310} width={330} className="mt-3 rounded-2xl" />
            ) : (
              <Image
                src={student?.img}
                height={400}
                loading="lazy"
                decoding="async"
                alt=""
                className="w-full object-cover"
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            {isLoading ? (
              <Skeleton height={25} width="200px" />
            ) : (
              <span className="text-3xl font-semibold">{student.name}</span>
            )}
            {isLoading ? (
              <Skeleton height={10} width={120} />
            ) : (
              <h4 className="text-sky-400 text-md">{student?.role}</h4>
            )}
          </CardFooter>
        </Card>
      </div>
    </CarouselItem>
    // <div className="card card-compact w-96 bg-white border border-gray-200 rounded-lg shadow">
    //   <figure>
    //     <Image
    //       src={student?.img}
    //       height={400}
    //       loading="lazy"
    //       decoding="async"
    //       alt=""
    //       className="w-full object-cover"
    //     ></Image>
    //   </figure>
    //   <div className="card-body flex flex-col justify-end p-4">
    //     <h3 className=" font-bold text-lg">{student?.name}</h3>

    //     <h4 className="text-sky-400 text-md">{student?.role}</h4>
    //   </div>
    // </div>
  );
};

export default SuccessfulStudentsCard;
