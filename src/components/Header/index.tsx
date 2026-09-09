"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "../MenuOverlay";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/About" },
    { label: t("nav.project"), href: "/projects" },
    { label: t("nav.contact"), href: "/Contact" },
  ];

  const toggleMenuOpen = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="z-50 w-full border-b border-[#4c3b66] bg-[#120d1d]">
      <div className="mx-auto flex min-h-[76px] max-w-6xl flex-wrap items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="hidden items-baseline gap-2 text-[#f8f4ff] md:flex">
          <span className="font-technical text-xs font-bold tracking-[0.18em]">CS</span>
          <span className="text-sm text-[#b9accb]">/ software engineer</span>
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenuOpen}
            className="flex items-center rounded-lg border border-[#8d62f7] bg-[#211734] px-3 py-2 text-[#f8f4ff] hover:border-[#f6c744] hover:text-[#f6c744]"
            aria-label={navbarOpen ? t("nav.close_menu") : t("nav.open_menu")}
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <div className="flex items-center text-white md:flex-row md:gap-1 md:p-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium duration-200 ${
                  pathname === item.href
                    ? "border-[#8d62f7] bg-[#2d2044] text-[#f6c744]"
                    : "border-transparent text-[#b9accb] hover:border-[#4c3b66] hover:text-[#f8f4ff]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-2 border-l border-[#4c3b66] pl-4">
              <button
                onClick={() => setLanguage("pt")}
                className={`rounded-full p-1 transition-all ${language === "pt" ? "ring-2 ring-[#f6c744]" : "opacity-55 grayscale hover:opacity-100 hover:grayscale-0"}`}
                aria-label={t("nav.language_pt")}
              >
                <Image
                  src="https://flagcdn.com/w40/br.png"
                  alt="Português"
                  width={24}
                  height={24}
                  className="rounded-full object-cover h-6 w-6"
                />
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full p-1 transition-all ${language === "en" ? "ring-2 ring-[#f6c744]" : "opacity-55 grayscale hover:opacity-100 hover:grayscale-0"}`}
                aria-label={t("nav.language_en")}
              >
                <Image
                  src="https://flagcdn.com/w40/us.png"
                  alt="English"
                  width={24}
                  height={24}
                  className="rounded-full object-cover h-6 w-6"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MenuOverlay isOpen={navbarOpen} onClose={toggleMenuOpen} />
    </nav>
  );
}
