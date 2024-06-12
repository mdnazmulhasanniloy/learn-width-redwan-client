import Footer from "@/components/footer";
import Navbar from "../_components/navbar";
import { Metadata } from "next";
import React from "react";



const HomePageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <main className="mt-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
