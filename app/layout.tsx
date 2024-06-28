import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "react-loading-skeleton/dist/skeleton.css";
import Providers from "@/lib/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "HomePage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.svg" className="h-[150px] w-[150px]" />
      </head>
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
