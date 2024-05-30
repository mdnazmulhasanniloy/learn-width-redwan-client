import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import NevItem from "./nev-item";
import Logo from "@/app/dashboard/_components/logo";

const Navbar = async () => {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
      <MobileSidebar />
      <Logo />
      <NevItem />
    </div>
  );
};

export default Navbar;
