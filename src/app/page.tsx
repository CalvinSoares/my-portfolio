"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactTyped } from "react-typed";
import TiktokIcon from "../../public/images/tiktok.svg";
import GithubIcon from "../../public/images/github.svg";
import LinkedinIcon from "../../public/images/linkedin.svg";
import Header from "../components/Header";
import { motion } from "framer-motion";
import { GetDATA } from "./loading";

export default async function Home() {
  const downloadPDF = () => {
    const pdfUrl = "/images/CalvinSoares.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "calvinsoares.pdf";
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };
  const erick = await GetDATA();
  return (
    <section id="Home" className="h-screen w-screen bg-[#121212] ">
      <div className="pt-0 md:pt-8">
        <Header />
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: -100, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hidden md:flex">
          <div className="absolute top-40 left-20 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute top-40 left-16 h-8 w-2 bg-[#583ebc]" />
        </div>
        <div className="hidden md:flex">
          <div className="absolute top-40 right-20 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute top-40 right-16 h-8 w-2 bg-[#583ebc]" />
        </div>
      </motion.div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around items-center px-12 md:px-0 ">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col mt-12 text-center sm:text-left">
            <h1 className="text-gray-200 mb-4 text-6xl sm:text-5xl lg:text-8xl font-extrabold">
              <span className="text-[20px] md:text-[28px] md:pr-0 pl-0 md:pl-2 text-gray-200 md:text-[#583ebc]">
                Hi, I&apos;m{" "}
              </span>
              <br />
              <ReactTyped
                strings={["Calvin Soares"]}
                typeSpeed={100}
                backSpeed={20}
                showCursor={false}
                className="text-4xl md:text-8xl md:text-gray-200 text-[#583ebc]"
              />
              <br />
              <span className="text-[20px] md:text-[28px]  items-center justify-center md:items-end md:justify-end flex  pb-8 text-gray-200 md:text-[#583ebc]">
                A Fullstack Developer{" "}
              </span>
            </h1>

            <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
              Welcome to my personal portfolio, feel free to contact me.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center ">
              <button
                onClick={downloadPDF}
                className=" bg-[#583ebc] rounded-full text-white mt-3 mr-0 md:mr-6 w-36 h-12 flex items-center justify-center hover:text-[#583ebc] hover:bg-gray-300 font-bold duration-200 hover:scale-110"
              >
                Download CV
              </button>
              <Link
                href="/About"
                className=" border border-gray-200  rounded-full text-[#583ebc] mt-3 w-36 h-12 flex items-center justify-center hover:text-[#583ebc] hover:bg-gray-300 font-bold duration-200 hover:scale-110"
              >
                About Me
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center items-center md:flex md:flex-col gap-2 mt-12 md:mt-4">
            <Link target="_blank" href="https://github.com/CalvinSoares">
              <Image
                src={GithubIcon}
                alt="Github Icon"
                className="hover:bg-[#583ebc] hover:translate-y-2 hover:rounded-full transition-all ease-in-out duration-500"
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/calvinsoares/"
            >
              <Image
                src={LinkedinIcon}
                alt="Linkedin Icon"
                className="hover:bg-[#583ebc] hover:translate-y-2 hover:rounded-md transition-all ease-in-out duration-500"
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.tiktok.com/@pato_programador?lang=pt-BR"
            >
              <Image
                className="w-12 h-12 text-white hover:bg-[#583ebc] hover:translate-y-2 hover:rounded-md transition-all ease-in-out duration-500"
                src={TiktokIcon}
                alt="Tiktok Icon"
              />
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 240, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hidden md:flex">
          <div className="absolute bottom-[40px] right-20 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute bottom-[40px] right-16 h-8 w-2 bg-[#583ebc]" />
        </div>
        <div className="hidden md:flex">
          <div className="absolute bottom-[40px] left-20 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute bottom-[40px] left-16 h-8 w-2 bg-[#583ebc]" />
        </div>
      </motion.div>
    </section>
  );
}
