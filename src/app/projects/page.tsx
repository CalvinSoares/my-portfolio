"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../../components/Header";
import ProjectTag from "../../components/ProjectTag";
import ProjectCard from "../../components/ProjectCard";
import TiktokIcon from "../../../public/images/tiktok.svg";
import GithubIcon from "../../../public/images/github.svg";
import LinkedinIcon from "../../../public/images/linkedin.svg";
import Link from "next/link";
import Image from "next/image";

const projectData = [
	{
		id: 1,
		title: "Banco Bet",
		description:
			"Front-end of an internal system for bank management of affiliate accounts through managing accounts. It included a login system with authentication and account management.",
		image: "/images/projects/bank1.png",
		tag: ["All", "Web"],
		previewUrl:
			"https://www.linkedin.com/feed/update/urn:li:activity:7181364631100088320/",
		tecnologias: ["React", "JavaScript", "Node", "Tailwind"],
	},

	{
		id: 2,
		title: "Arcade Lunar",
		description: "Web-Site apresentation of Arcade Lunar",
		image: "/images/projects/arcadelunar.png",
		tag: ["All", "Web"],
		previewUrl: "https://arcadelunar-two.vercel.app/pt",
		tecnologias: ["Next", "Typescript", "Tailwind", "I18n", "Framer-Motion"],
	},
	{
		id: 3,
		title: "Logistic Dashboard",
		description: "Logistic management system",
		image: "/images/projects/logistic.png",
		tag: ["All", "Web"],
		gitUrl: "https://github.com/CalvinSoares/logistic-system",
		previewUrl:
			"https://www.linkedin.com/posts/calvinsoares_eae-rede-tranquilos-hoje-vim-divulgar-activity-7262563262469210113-hd2L?utm_source=share&utm_medium=member_desktop",
		tecnologias: ["React", "TypeScript", "Node", "Tailwind", "MongoDB"],
	},
	{
		id: 4,
		title: "Search Game (freelancer)",
		description: "word search app",
		image: "/images/projects/searchGame.png",
		tag: ["All", "Mobile"],
		gitUrl: "https://github.com/CalvinSoares/word-search-game",
		previewUrl:
			"https://play.google.com/store/apps/details?id=wordl.searc.game&pcampaignid=web_share",
		tecnologias: ["React-Native", "Javascript", "Style Components"],
	},
	{
		id: 5,
		title: "Dashboard Page",
		description: "Data management system",
		image: "/images/projects/dashboard.png",
		tag: ["All", "Web"],
		gitUrl: "https://github.com/CalvinSoares/dashboardEcharts",
		previewUrl: "https://dashboard-echarts.vercel.app/",
		tecnologias: ["Next", "TypeScript", "Node", "Tailwind", "MongoDB"],
	},
	{
		id: 6,
		title: "React Notes Web Site",
		description: "creation of notes",
		image: "/images/projects/duNotes.png",
		tag: ["All", "Web"],
		gitUrl: "https://github.com/CalvinSoares/DuNotes",
		previewUrl: "https://du-notes.vercel.app/",
		tecnologias: ["React", "Typescript", "Node", "Tailwind"],
	},
];

export default async function ProjectsSection() {
	const [tag, setTag] = useState("All");
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const handleTagChange = (newTag: string) => {
		setTag(newTag);
	};

	const filteredProjects = projectData.filter((project) =>
		project.tag.includes(tag),
	);

	const cardVariants = {
		initial: { y: 50, opacity: 0 },
		animate: { y: 0, opacity: 1 },
	};
	return (
		<section
			id="Projects"
			className="min-w-full min-h-full flex flex-col justify-center bg-[#121212] "
		>
			<div className="pt-0 md:pt-8">
				<Header />
			</div>
			<div className="hidden md:flex">
				<div className="absolute top-40 left-32 h-32 w-2 bg-[#583ebc]" />
				<div className="absolute top-40 left-28 h-8 w-2 bg-[#583ebc]" />
			</div>
			<div className="hidden md:flex">
				<div className="absolute top-40 right-32 h-32 w-2 bg-[#583ebc]" />
				<div className="absolute top-40 right-28 h-8 w-2 bg-[#583ebc]" />
			</div>
			<div className="p-12">
				<h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
					My Projects
				</h2>
				<div className="text-white flex flex-row justify-center items-center gap-2 py-6">
					<ProjectTag
						onClick={handleTagChange}
						name="All"
						isSelected={tag == "All"}
					/>
					<ProjectTag
						onClick={handleTagChange}
						name="Web"
						isSelected={tag == "Web"}
					/>
					<ProjectTag
						onClick={handleTagChange}
						name="Mobile"
						isSelected={tag == "Mobile"}
					/>
				</div>
				<ul
					ref={ref}
					className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 cursor-pointer"
				>
					{filteredProjects.map((project, index) => (
						<motion.li
							key={index}
							variants={cardVariants}
							initial="initial"
							animate={isInView ? "animate" : "inicial"}
							transition={{ duration: 0.3, delay: index * 0.4 }}
						>
							<ProjectCard
								key={project.id}
								title={project.title}
								description={project.description}
								imgUrl={project.image}
								tags={project.tag}
								gitUrl={project?.gitUrl}
								previewUrl={project?.previewUrl}
								tecnologias={project.tecnologias}
							/>
						</motion.li>
					))}
				</ul>
				<div className="flex flex-col text-center items-center justify-center mt-24">
					<Link
						href="/Contact"
						className="border border-gray-200  rounded-full text-[#583ebc] mt-3 w-44 h-12 flex items-center justify-center hover:text-[#583ebc] hover:bg-gray-300 font-bold duration-200 hover:scale-110"
					>
						Contacts
					</Link>
					<div className="sociais flex  gap-2 mt-8 mb-12">
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
