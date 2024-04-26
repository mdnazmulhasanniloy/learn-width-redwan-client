"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DefaultRoutes } from "./routes";

const NevItem = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex h-full items-center px-4">
      <div className="flex gap-5">
        {DefaultRoutes.map((item, i) => (
          <Link
            key={i}
            className={cn(
              " font-bold text-sm uppercase hover:text-sky-400 transition-colors duration-500",
              pathname === item.href && "text-sky-400"
            )}
            href={item?.href}
          >
            {item?.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NevItem;
