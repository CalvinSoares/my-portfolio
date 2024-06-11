import React from "react";
import TiktokIcon from "../../../public/images/tiktok.svg";
import GithubIcon from "../../../public/images/github.svg";
import LinkedinIcon from "../../../public/images/linkedin.svg";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import CopyText from "../../components/CopyText";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function EmailSection() {
  return (
    <section id="Contact" className="bg-[#121212] ">
      <div className="pt-0 md:pt-8">
        <Header />
      </div>
      <ToastContainer />
      <div className="flex justify-center items-center min-w-screen min-h-screen ">
        <div className="hidden md:flex">
          <div className="absolute top-40 left-32 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute top-40 left-28 h-8 w-2 bg-[#583ebc]" />
        </div>
        <div className="hidden md:flex">
          <div className="absolute top-40 right-32 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute top-40 right-28 h-8 w-2 bg-[#583ebc]" />
        </div>
        <div className="flex flex-col justify-center text-center items-center h-full w-full mx-8 md:mx-2">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold text-[white] my-2 hover:text-[#583ebc] duration-500 cursor-pointer">
              Contact Me
            </h1>
            <p className="text-[#ADB7BE] text-sm md:text-md max-w-sm  md:max-w-md">
              {" "}
              I&apos;m currently looking for new opportunities, my inbox is
              always open. Whether you have a question or just wanto to say hi,
              I&apos;ll try my best to get back to you!
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mt-12">
            <h1 className="self-start text-xl text-[#583ebc] font-bold ">
              Email
            </h1>
            <CopyText text="calvinsoares19@gmail.com" />
          </div>
          <div className="flex flex-col justify-center items-center my-12">
            <h1 className="self-start text-xl text-[#583ebc] font-bold ">
              Telephone
            </h1>
            <CopyText text="+55 (21) 992303043" />
          </div>

          <div className="flex gap-2 mt-4">
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
        </div>
      </div>

      <div className="hidden md:flex">
        <div className="absolute -bottom-20 right-32 h-32 w-2 bg-[#583ebc]" />
        <div className="absolute -bottom-20 right-28 h-8 w-2 bg-[#583ebc]" />
      </div>
      <div className="hidden md:flex">
        <div className="absolute -bottom-20 left-32 h-32 w-2 bg-[#583ebc]" />
        <div className="absolute -bottom-20 left-28 h-8 w-2 bg-[#583ebc]" />
      </div>
    </section>
  );
}
