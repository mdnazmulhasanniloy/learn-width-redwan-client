"use client";
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { ICourse } from "../../home/_components/constants";
import { CalendarCheck, Users } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { HoverButton } from "@/components/ui/hover-button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CourseCard = ({ course }: { course: ICourse }) => {
  const [SkeletonItems, setSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
    }, 3 * 1000);
  }, []);

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
    <div className="border-2  rounded-2xl overflow-hidden">
      <figure>
        {SkeletonItems ? (
          <Skeleton width="100%" height="200px" />
        ) : (
          <div className="relative w-full h-80">
            <Image
              src={course?.thumbnail}
              alt={course?.name}
              layout="fill"
              loading="lazy"
              unoptimized
              className="object-cover fill-transparent"
            />
          </div>
        )}
      </figure>
      <div className="p-5 ">
        {SkeletonItems ? (
          <>
            <Skeleton width="200px" height="20px" />
          </>
        ) : (
          <h2 className="text-2xl font-semibold">{course?.name}</h2>
        )}

        <p className="my-3 text-md">
          {SkeletonItems ? (
            <>
              <Skeleton width="full" height="20px" />
              <Skeleton width="full" height="20px" />
              <Skeleton width="80px" height="20px" />
            </>
          ) : (
            <>
              {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum cumnatus accusantium. Neque veritatis voluptates eum est obcaecatidolores saepe officia facilis labore ad, nisi maiores placeat laudantium libero asperiores.".slice(
                0,
                140
              )}
              ...
            </>
          )}
        </p>
        <div className="mt-5">
          {SkeletonItems ? (
            <Skeleton width="150px" height="15px" />
          ) : (
            <h3 className="text-lg flex items-center gap-3">
              <strong className="font-bold text-sky-400">Price:</strong>{" "}
              {formatPrice(course?.regularPrice)}
            </h3>
          )}
        </div>

        <div className="flex justify-between items-center my-5">
          {SkeletonItems ? (
            <Skeleton width="50px" height="15px" />
          ) : (
            <div className="flex items-center gap-2">
              <Users className="text-sky-400" /> 120
            </div>
          )}
          {SkeletonItems ? (
            <Skeleton width="80px" height="15px" />
          ) : (
            <p className="flex items-center gap-2 ">
              <CalendarCheck className="text-sky-400" /> {course?.duration}{" "}
              Months
            </p>
          )}
        </div>

        <div className="flex justify-end mt-10">
          {SkeletonItems ? (
            <Skeleton width="150px" height="30px" />
          ) : (
            <Link href={`courses/checkout/${course?._id}`}>
              <HoverButton>Enroll now</HoverButton>
            </Link>
          )}
        </div>
      </div>
    </div>

    // <motion.div
    //   variants={variants}
    //   initial="initial"
    //   whileInView="animate"
    //   className="p-5 border border-gray-200 rounded-md"
    // >
    //   <div className="">
    //     <figure>
    //       {SkeletonItems ? (
    //         <Skeleton width="100%" height="200px" />
    //       ) : (
    //         // eslint-disable-next-line @next/next/no-img-element
    //         <img
    //           src={course?.thumbnail}
    //           height={400}
    //           width={0}
    //           loading="lazy"
    //           decoding="async"
    //           alt={course?.name}
    //           className="w-full object-cover"
    //         />
    //       )}
    //     </figure>
    //     <div className="mt-5">
    //       {SkeletonItems ? (
    //         <>
    //           <Skeleton width="200px" height="20px" />
    //         </>
    //       ) : (
    //         <h2 className="text-2xl font-semibold">{course?.name}</h2>
    //       )}

    //       <p className="my-5 text-md">
    //         {SkeletonItems ? (
    //           <>
    //             <Skeleton width="full" height="20px" />
    //             <Skeleton width="full" height="20px" />
    //             <Skeleton width="80px" height="20px" />
    //           </>
    //         ) : (
    //           <>
    //             {"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum cumnatus accusantium. Neque veritatis voluptates eum est obcaecatidolores saepe officia facilis labore ad, nisi maiores placeat laudantium libero asperiores.".slice(
    //               0,
    //               140
    //             )}
    //             ...
    //           </>
    //         )}
    //       </p>
    //       <div className="mt-5">
    //         {SkeletonItems ? (
    //           <Skeleton width="150px" height="15px" />
    //         ) : (
    //           <h3 className="text-lg flex items-center gap-3">
    //             <strong className="font-bold text-sky-400">Price:</strong>{" "}
    //             {formatPrice(course?.regularPrice)}
    //           </h3>
    //         )}
    //       </div>

    //       <div className="flex justify-between items-center my-5">
    //         {SkeletonItems ? (
    //           <Skeleton width="50px" height="15px" />
    //         ) : (
    //           <div className="flex items-center gap-2">
    //             <Users className="text-sky-400" /> 120
    //           </div>
    //         )}
    //         {SkeletonItems ? (
    //           <Skeleton width="80px" height="15px" />
    //         ) : (
    //           <p className="flex items-center gap-2 ">
    //             <CalendarCheck className="text-sky-400" /> {course?.duration}{" "}
    //             Months
    //           </p>
    //         )}
    //       </div>

    //       <div className="flex justify-end mt-10">
    //         {SkeletonItems ? (
    //           <Skeleton width="150px" height="30px" />
    //         ) : (
    //           <Link href={`courses/checkout/${course?._id}`}>
    //             <HoverButton>Enroll now</HoverButton>
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </motion.div>
  );
};

export default CourseCard;

//  <div className="col-lg-4 col-md-6 col-sm-12">
//    <Card className="course-card shadow-sm mt-2">
//      {SkeletonItems ? (
//        <Skeleton width="100%" height="200px" />
//      ) : (
//        <Card.Img
//          className="card-img-top "
//          variant="top"
//          src={image}
//          alt={name}
//        />
//      )}
//      <Card.Body className="mt-1">
//        {SkeletonItems ? (
//          <Skeleton width="200px" height="20px" />
//        ) : (
//          <Card.Title>{name}</Card.Title>
//        )}
//        <Card.Text>
//          {SkeletonItems ? (
//            <Skeleton width="150px" height="15px" />
//          ) : (
//            <strong className="d-flex align-items-center mt-3">
//              Price: {price}
//              <TbCurrencyTaka />
//            </strong>
//          )}
//          <div className="d-flex justify-content-between mt-3">
//            {SkeletonItems ? (
//              <Skeleton width="80px" height="15px" />
//            ) : (
//              <p>
//                <TfiTimer /> {courses_duration}
//              </p>
//            )}
//            {SkeletonItems ? (
//              <Skeleton width="80px" height="15px" />
//            ) : (
//              <p>
//                <BsCalendarDate /> {courses_Start_date}
//              </p>
//            )}
//          </div>
//          <div className="my-3">
//            {SkeletonItems ? (
//              <Skeleton width="150px" height="30px" />
//            ) : (
//              <Link to={`/course/${id} `} className="spatial-btn">
//                Show Description
//              </Link>
//            )}
//          </div>
//        </Card.Text>
//      </Card.Body>
//    </Card>
//  </div>;
