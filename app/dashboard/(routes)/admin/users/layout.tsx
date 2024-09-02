import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard -> Admin -> All Users",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default layout;
