import { Compass, HomeIcon, Layout, LogIn } from "lucide-react";

export const DefaultRoutes = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "/about",
    label: "About",
    icon: Layout,
  },
  {
    href: "/courses",
    label: "courses",
    icon: Compass,
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Layout,
  },
  {
    href: "/sign-in",
    label: "Login",
    icon: LogIn,
  },
];
