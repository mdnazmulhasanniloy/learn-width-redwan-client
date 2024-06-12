import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastProvider } from "@/components/providers/toaster-providers";
import ReduxStoreProvider from "@/components/providers/store-provider";

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
    <ReduxStoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/Logo.svg" className="h-[150px] w-[150px]" />
        </head>
        <body className={inter.className}>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ReduxStoreProvider>
  );
}
