"use client";
import React, { useEffect, useState } from "react";
// import { useGetCourseQuery } from "@/lib/redux/features/courses/coursesApi";
import HomeCoursesCard from "./home_courses_card";
import { ICourse } from "./constants";
import { HoverOutlineButton } from "@/components/ui/hover-button";
import Title from "@/components/ui/title";
import { motion } from "framer-motion";
import LoadingCard from "./loadingCard";
import { useGetAllCourseQuery } from "@/redux/api/courseApi";

const HomePageCourses = () => {
  const query: Record<string, any> = {};
  const [limit, SetLimit] = useState(6);
  const [page, SetPage] = useState(1);
  const [total, SetTotal] = useState(5);

  query["limit"] = limit;
  query["page"] = page;
  // query["sortBy"]=sortBy
  // query["sortOrder"]=sortOrder
  // const [meta, setMeta] = React.useState({ limit: 6, page: 1, total: 5 });
  const [search, setSearch] = React.useState("");
  const [courses, setCourses] = React.useState<ICourse[] | []>([]);
  const { data, isLoading, isSuccess } = useGetAllCourseQuery({ ...query });
  // const { data, isLoading, isError, isSuccess } = useGetCourseQuery({
  //   meta,
  //   search,
  // });
  console.log(data);
  useEffect(() => {
    if (isSuccess) {
      setCourses(data?.data);
    }
  }, [data, isSuccess]);

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
    <section className="my-20">
      {/* <LoadingCard variants={variants} /> */}

      <div className="w-screen flex flex-col justify-center items-center mb-20">
        <motion.div
          variants={variants}
          initial="initial"
          whileInView="animate"
          className=""
        >
          <Title className="text-2xl md:text-5xl font-semibold text-center">
            Discover Our Popular Course
          </Title>
        </motion.div>

        <motion.p
          variants={variants}
          initial="initial"
          whileInView="animate"
          className="text-md text-center mt-4"
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </motion.p>
      </div>

      <motion.div
        className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 w-11/12 mx-auto"
        variants={variants}
      >
        {courses?.length > 0 &&
          courses?.map((course: ICourse) => (
            <HomeCoursesCard
              key={course?._id}
              course={course}
              variants={variants}
            />
          ))}
      </motion.div>
      <div className="my-10 flex items-center justify-center">
        <HoverOutlineButton>All Courses</HoverOutlineButton>
      </div>
    </section>
  );
};

export default HomePageCourses;
