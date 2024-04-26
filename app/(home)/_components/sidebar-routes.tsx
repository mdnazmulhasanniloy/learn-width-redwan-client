"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { DefaultRoutes } from "./routes";

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-ful">
      {DefaultRoutes?.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
