// import { useEffect, useState } from "react";
import Navbar from "./_components/navbar";
import NevItem from "./_components/nev-item";
import { HashLoader } from "react-spinners";

const HomePageLayout = async ({ children }: { children: React.ReactNode }) => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 8000);
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="spanner">
  //       <HashLoader color="#005be6" /> <h1>welcome To Learn With Redwan</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="h-full flex flex-col">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="mt-[80px]">{children}</main>
    </div>
  );
};

export default HomePageLayout;
