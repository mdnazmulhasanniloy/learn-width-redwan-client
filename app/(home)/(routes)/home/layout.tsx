import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LWR -> Home",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default layout;
