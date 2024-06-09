"use client";

// import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SignOut } from "@/actions/login";

const NavbarRoutes = ({ session }: any) => {
  // const router = useRouter();
  const user = session?.user;
  // const pathname = usePathname();
  // const isAdminPage = pathname?.startsWith("/teacher");
  // const isCoursePage = pathname?.includes("/courses");
  // const isSearchPage = pathname === "/search";

  return (
    <div className="flex gap-x2 ml-auto">
      {user?.email ? (
        <Button onClick={() => {}} size="sm" variant="ghost">
          <LogOut className="h-4 w-4 mr-2" /> Exit
        </Button>
      ) : (
        <Link href="/admin/courses">
          <Button size="sm" variant="ghost">
            Login
          </Button>
        </Link>
      )}
      {/* {isAdminPage || isCoursePage ? (
        
      ) : (
        
      )} */}
      <Avatar className="border border-sky-500">
        <AvatarImage src={user?.image} alt={user?.name} />
        <AvatarFallback>LW</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavbarRoutes;
