"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "../MenuOverlay";
import devImg from "../../../public/images/devImg.jpg";
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
    <nav className="bg-[#242424]/95 rounded-none md:rounded-full z-50 mx-auto w-screen md:w-[90%] border-b border-white/10 md:border hover:shadow-[#583ebc] hover:shadow-md duration-500 backdrop-blur-md">
      <div className="flex container flex-wrap items-center justify-around mx-auto py-4 px-2">
        <div className="md:hidden">
          <button
            onClick={toggleMenuOpen}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
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
          <div className="flex text-white items-center md:p-0 md:flex-row md:space-x-8">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                className={`items-center flex justify-center w-32 h-12 rounded-3xl duration-300 cursor-pointer ${
                  pathname === item.href
                    ? "bg-[#583ebc] text-white shadow-lg shadow-[#583ebc]/30"
                    : "hover:bg-[#583ebc]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}

            <div>
              <Image
                src={devImg}
                alt={t("common.profile_name")}
                className="rounded-full w-[50px] h-[50px] mx-6 sm:mx-12 md:mx-12 lg:mx-24"
                priority
              />
            </div>

            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                className={`items-center flex justify-center w-32 h-12 rounded-3xl duration-300 cursor-pointer ${
                  pathname === item.href
                    ? "bg-[#583ebc] text-white shadow-lg shadow-[#583ebc]/30"
                    : "hover:bg-[#583ebc]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setLanguage("pt")}
                className={`p-1 rounded-full transition-all ${language === "pt" ? "ring-2 ring-[#583ebc] scale-110" : "opacity-70 grayscale hover:grayscale-0"}`}
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
                className={`p-1 rounded-full transition-all ${language === "en" ? "ring-2 ring-[#583ebc] scale-110" : "opacity-70 grayscale hover:grayscale-0"}`}
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
