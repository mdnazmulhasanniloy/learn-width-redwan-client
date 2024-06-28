import React from "react";
import Banner from "./_components/banner";
import HomePageCourses from "./_components/home_courses";
import HomeExplore from "./_components/home_explore";
import HomeJoinCard from "./_components/home_join_card";
import SuccessfulStudents from "./_components/successful-students";
import StudentReview from "./_components/student-review";
import FAQ from "./_components/faq";

const HomePage = () => {
  return (
    <main>
      <Banner />
      {/* <HomePageCourses />
      <HomeExplore />
      <HomeJoinCard />
      <SuccessfulStudents />
      <StudentReview /> */}
      <FAQ />
    </main>
  );
};

export default HomePage;
