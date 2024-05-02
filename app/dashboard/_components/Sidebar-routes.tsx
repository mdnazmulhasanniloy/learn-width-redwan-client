"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaIdCard } from "react-icons/fa";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const adminRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/dashboard/admin/courses",
  },
  {
    icon: BarChart,
    label: "Batch",
    href: "/dashboard/admin/batch",
  },
  {
    icon: BarChart,
    label: "Module",
    href: "/dashboard/admin/module",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics",
  },
];
const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.includes("/admin");
  const routes = isAdmin ? adminRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-ful">
      {routes?.map((route) => (
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
