// import { auth } from "@/auth";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[82px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
