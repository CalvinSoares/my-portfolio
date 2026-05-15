import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calvin Soares | Full Stack Engineer",
  description:
    "Portfolio de Calvin Soares com foco em full stack engineering, arquitetura de sistemas, performance e evolução de produtos digitais.",
  keywords: [
    "Calvin Soares",
    "portfolio",
    "fullstack developer",
    "next.js",
    "react",
    "node.js",
  ],
  openGraph: {
    title: "Calvin Soares | Full Stack Engineer",
    description:
      "Projetos, experiência e contato com foco em engenharia full stack, arquitetura, performance e produtos digitais.",
    url: "https://calvinsoares.vercel.app/",
    siteName: "Calvin Soares Portfolio",
    images: [
      {
        url: "/images/devImg.jpg",
        width: 1200,
        height: 630,
        alt: "Calvin Soares Portfolio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calvin Soares | Full Stack Engineer",
    description:
      "Portfolio com foco em engenharia full stack, arquitetura, performance e produtos digitais.",
    images: ["/images/devImg.jpg"],
  },
  metadataBase: new URL("https://calvinsoares.vercel.app/"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="20" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
