import Banner from "./_components/banner";
import FAQ from "./_components/faq";
import HomePageCourses from "./_components/home_courses";
import HomeExplore from "./_components/home_explore";
import HomeJoinCard from "./_components/home_join_card";
import StudentReview from "./_components/student-review";
import SuccessfulStudents from "./_components/successful-students";

export default function Home() {
  return (
    <main>
      <Banner />
      <HomePageCourses />
      <HomeExplore />
      <HomeJoinCard />
      <SuccessfulStudents />
      <StudentReview />
      <FAQ />
    </main>
  );
}
