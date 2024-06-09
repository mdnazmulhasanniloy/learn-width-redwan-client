"use client";
import {
  BarChart,
  BookOpen,
  Compass,
  Component,
  GraduationCap,
  Home,
  Layout,
  List,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
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
    icon: GraduationCap,
    label: "Batch",
    href: "/dashboard/admin/batch",
  },
  {
    icon: Component,
    label: "Module",
    href: "/dashboard/admin/module",
  },
  {
    icon: BookOpen,
    label: "lecture",
    href: "/dashboard/admin/lecture",
  },
  {
    icon: Home,
    label: "Home",
    href: "/",
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
