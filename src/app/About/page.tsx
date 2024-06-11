import Header from "../../components/Header";
import Link from "next/link";
import Image from "next/image";
import TiktokIcon from "../../../public/images/tiktok.svg";
import GithubIcon from "../../../public/images/github.svg";
import LinkedinIcon from "../../../public/images/linkedin.svg";
import { GetDATA } from "../loading";

export default async function AboutSection() {
  const erick = await GetDATA();
  return (
    <section id="About" className="text-gray-200 bg-[#121212]">
      <div className="pt-0 md:pt-8">
        <Header />
      </div>

      <div className="flex flex-col justify-center items-center min-w-screen min-h-screen ">
        <div className="hidden md:flex">
          <div className="absolute top-40 left-32 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute top-40 left-28 h-8 w-2 bg-[#583ebc]" />
        </div>
        <div className="hidden md:flex">
          <div className="absolute top-40 right-32 h-32 w-2 bg-[#583ebc]" />
          <div className="absolute top-40 right-28 h-8 w-2 bg-[#583ebc]" />
        </div>

        <div className="flex justify-center items-center h-[480px] my-24 md:my-2">
          <div className="flex flex-col justify-center items-center max-w-full md:max-w-[60%] mx-12 md:mx-6">
            <h2 className="flex justify-center items-center text-xl w-32 h-12 text-center font-semibold border-2 border-slate-200 rounded-full text-slate-200 mb-8">
              About Me
            </h2>
            <p className="text-xl text-center md:text-lg ">
              My name is Calvin Soares, I simply love everything related to
              technology, especially when it comes to programming. I have a
              strong focus on{" "}
              <span className="font-bold text-purple-300">front-end</span> and{" "}
              <span className="font-bold text-purple-300">back-end</span>, with
              experience in creating{" "}
              <span className="font-bold text-purple-300">fullstack</span>{" "}
              applications.
            </p>
            <p className="text-xl text-center md:text-lg mt-12">
              I started my journey in the world of programming when I was around
              11 years old, I enjoyed creating pixel art style games. Today
              I&apos;m focused on{" "}
              <span className="font-bold text-purple-300">
                Back-end Development
              </span>
              .
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl py-2 px-4 font-semibold border-2 border-slate-200 bg- rounded-full text-slate-200 mb-8">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:flex">
            <div className="col-span- flex flex-col items-center cursor-pointer hover:text-blue-700 hover:scale-95 duration-200 mx-4">
              <Image
                src="/ts.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Typescript</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-sky-500 hover:scale-95 duration-200 mx-4">
              <Image
                src="/react.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">React</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-teal-400 hover:scale-95 duration-200 mx-4">
              <Image
                src="/tailwind.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Tailwindcss</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-emerald-500 hover:scale-95 duration-200 mx-4">
              <Image
                src="/node.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Node</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-gray-900 hover:scale-95 duration-200 mx-4">
              <Image
                src="/next.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Next</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-green-600 hover:scale-95 duration-200 mx-4">
              <Image
                src="/mongo.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">MongoDB</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-800 hover:scale-95 duration-200 mx-4">
              <Image
                src="/postgresql.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">PostreSQL</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-red-700 hover:scale-95 duration-200 mx-4">
              <Image
                src="/nest.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Nest</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-red-500 hover:scale-95 duration-200 mx-4">
              <Image
                src="git.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Git</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-sky-500 hover:scale-95 duration-200 mx-4">
              <Image
                src="docker.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Docker</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:text-orange-600 hover:scale-95 duration-200 mx-4">
              <Image
                src="/jest.svg"
                alt=""
                width={200}
                height={200}
                style={{ marginInline: 12 }}
                className="mb-4 w-6 h-6 md:w-12 md:h-12"
              />
              <span className="text-lg font-bold">Jest</span>
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
          <div className="flex text-center items-center justify-center mt-24">
            <Link
              href="/projects"
              className="border border-gray-200  rounded-full text-[#583ebc] mt-3 w-64 h-12 flex items-center justify-center hover:text-[#583ebc] hover:bg-gray-300 font-bold duration-200 hover:scale-110"
            >
              See Some of my projects
            </Link>
          </div>
          <div className="sociais flex flex-row gap-2 mt-4 mb-12">
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
    </section>
  );
}
