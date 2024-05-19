import { cn } from "@/lib/utils";
import React from "react";

const Title = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}): any => {
  return (
    <div className="flex items-end justify-start gap-2">
      <h1 className={cn("text-3xl", className)}>{children}</h1>
      <div className="h-2 w-2 bg-sky-700"></div>
    </div>
  );
};

export default Title;
