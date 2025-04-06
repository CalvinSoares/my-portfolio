"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "../MenuOverlay";
import devImg from "../../../public/images/devImg.jpg";
import Link from "next/link";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleMenuOpen = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className=" bg-[#242424] rounded-none md:rounded-full mx-auto w-screen md:w-[90%]  hover:shadow-[#583ebc] hover:shadow-md duration-500 cursor-pointer">
      <div className="flex container flex-wrap items-center justify-around mx-auto py-4 px-2">
        <div className="md:hidden">
          <button
            onClick={toggleMenuOpen}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <div className="flex text-white items-center md:p-0 md:flex-row md:space-x-8 ">
            <Link
              className="items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer"
              href="/"
            >
              Home
            </Link>

            <Link
              className="items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer"
              href="/About"
            >
              About
            </Link>
            <div>
              <Image
                src={devImg}
                alt="hero image"
                className="rounded-full w-[50px] h-[50px] mx-6 sm:mx-12 md:mx-12 lg:mx-24"
                priority
              />
            </div>

            <Link
              className="items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer"
              href="/projects"
            >
              Project
            </Link>
            <Link
              className="items-center flex justify-center w-32 h-12 rounded-3xl hover:bg-[#583ebc] duration-300 cursor-pointer"
              href="/Contact"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <MenuOverlay isOpen={navbarOpen} onClose={toggleMenuOpen} />
    </nav>
  );
}
