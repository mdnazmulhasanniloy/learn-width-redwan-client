import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LWR -> About",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default layout;
