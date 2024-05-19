import Banner from "./_components/banner";
import HomePageCourses from "./_components/home_courses";
import HomeExplore from "./_components/home_explore";
import HomeJoinCard from "./_components/home_join_card";
import SuccessfulStudents from "./_components/successful-students";

export default function Home() {
  return (
    <main>
      <Banner />
      <HomePageCourses />
      <HomeExplore />
      <HomeJoinCard />
      <SuccessfulStudents />
    </main>
  );
}
