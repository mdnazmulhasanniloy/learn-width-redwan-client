"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IBackButtonProps {
  label: string;
  link: string;
}
const BackButton = ({ label, link }: IBackButtonProps) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={link}>
        {label} <span className="text-blue-400">click hear</span>
      </Link>
    </Button>
  );
};

export default BackButton;
