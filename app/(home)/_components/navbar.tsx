import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import NevItem from "./nev-item";
import Logo from "@/app/dashboard/_components/logo";
// import { auth } from "@/auth";

const Navbar = async () => {
  // const session = await auth();
  // console.log("auth", session);
  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
      <MobileSidebar />
      <Logo />
      <NevItem />
      {/* <NavbarRoutes session={""} /> */}
    </div>
  );
};

export default Navbar;
