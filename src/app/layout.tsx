import React, { ReactNode, Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="20" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
