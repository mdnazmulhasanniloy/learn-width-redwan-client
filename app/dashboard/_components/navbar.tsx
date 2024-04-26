import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
// import { auth } from "@/auth";

const Navbar = async () => {
  // const session = await auth();
  // console.log("auth", session);
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes session={""} />
    </div>
  );
};

export default Navbar;
