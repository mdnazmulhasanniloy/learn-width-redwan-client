"use client";
import React, { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "@/lib/redux/features/courses/coursesApi";
import { ICourse } from "../../../home/_components/constants";
import { HashLoader } from "react-spinners";
import { formatPrice } from "@/lib/format";

const CourseDetailsPage = ({ params }: { params: { id: string } }) => {
  const [course, setCourse] = useState<ICourse>();
  const [errors, setError] = useState<string>();

  const { data, isLoading, isSuccess, isError, error } = useGetCourseByIdQuery({
    id: params?.id,
  });

  useEffect(() => {
    if (isSuccess) {
      if (data?.success) {
        setCourse(data?.data);
      } else {
        let errorMessage = data?.message || "An error occurred";
        // Check if there are individual error messages
        if (data?.errorMessages) {
          // Format the individual error message
          const individualErrorMessage = data?.errorMessages?.map(
            (error: { path: string; message: string }) =>
              `${error.path}: ${error.message} \n`
          );
          errorMessage = `${errorMessage}: \n ${individualErrorMessage}`;
        }
        setError(errorMessage);
      }
    }

    if (isError) {
      setError("something went wrong");
    }
  }, [isLoading, isSuccess, isError, data, error]);

  if (isLoading) {
    return (
      <>
        <HashLoader color="#005be6" /> <h1>welcome To Learn With Redan</h1>
      </>
    );
  }
  return (
    <section className="w-[90%] mx-auto  min-h-[70vh]">
      {course ? (
        <>
          <div className="w-full sm:px-10 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">
                Check your items. And Payment method.
              </p>
              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div className="grid grid-cols-2 justify-between gap-3">
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className=" w-full h-full md:w-28 md:h-24 rounded-md border object-cover"
                      src={course?.thumbnail}
                      loading="lazy"
                      decoding="async"
                      alt={course.name}
                    />
                  }
                  <div className="flex flex-col md:flex-row items:start md:justify-between md:items-center  gap-4">
                    <span className="text-lg font-semibold">
                      {course?.name}
                    </span>
                    <span className="float-right">
                      {course?.duration} months
                    </span>
                    <p className="font-bold">
                      {formatPrice(course?.regularPrice)}
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-5 w-full group relative py-3 px-4 overflow-hidden rounded-lg bg-transparent text-lg shadow border border-sky-400">
                <div className="absolute inset-0 w-0 bg-sky-400 transition-all duration-300 ease-out group-hover:w-full"></div>
                <span className="relative text-sky-400 group-hover:text-white font-poppins font-medium">
                  Pay Now
                </span>
              </button>
            </div>
          </div>
          <div className=""></div>
        </>
      ) : (
        <>{errors}</>
      )}
    </section>
  );
};

export default CourseDetailsPage;
