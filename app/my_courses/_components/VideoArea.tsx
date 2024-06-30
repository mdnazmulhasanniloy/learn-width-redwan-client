/** @format */
"use client";
import Video from "next-video";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function VideoArea() {
  const [blur, setBlur] = useState(false);
  useEffect(() => {
    const handleBlur = () => {
      setBlur(true);
      // Add your logic to blur or hide content
      //   document.getElementById("video-container")?.classList.add("blur");
    };

    const handleFocus = () => {
      setBlur(false);
      // Add your logic to restore content
      document.getElementById("video-container")?.classList.remove("blur");
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <Card className="md:w-[70%] bg-white shadow-md rounded-md py-4">
      <CardContent className="relative pb-9/16">
        <Video
          src={"/videos/video.mp4"}
          className={cn(blur && "blur-3xl")}
          accentColor="#38bdf8"
          // className="rounded-lg w-full"
        />
      </CardContent>
      <CardDescription className="mt-4 p-4">
        <h2 className="text-lg font-bold">Instructor: Eng. Mahmud Ibrahim</h2>
        <p className="mt-2">
          Tailwind CSS is a CSS framework that provides a utility-first approach
          to the developer. It is gaining popularity day by day in the
          developers' community. It is a massive collection of tiny CSS utility
          classes for quickly and consistently building good-looking websites.
          Course video recordings are still in progress. We will learn the
          basics of tailwind and then do some mini and large website projects
          using Tailwind CSS 3.0.
        </p>
      </CardDescription>
    </Card>
  );
}
