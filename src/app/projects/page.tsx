"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import ProjectTag from "../../components/ProjectTag";
import ProjectCard from "../../components/ProjectCard";
import { ArrowUpRight, Filter, Sparkles } from "lucide-react";
import ParticleBackground from "../../components/particleBackground";

// Project data remains the same
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
    previewUrl: "https://arcadelunar.com.br",
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

export default function ProjectsSection() {
  const [tag, setTag] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
    setIsFilterOpen(false);
  };

  const filteredProjects = projectData.filter((project) =>
    project.tag.includes(tag)
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const filterVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1 },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="Projects"
      className="min-w-full min-h-screen flex flex-col justify-center bg-[#121212] relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticleBackground />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-700/30 to-indigo-700/20 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-violet-700/20 to-fuchsia-700/30 blur-3xl"
        style={{ y: y2 }}
      />

      <div className="pt-0 md:pt-8 relative z-50">
        <Header />
      </div>

      <div className="p-6 md:p-12 relative z-10" ref={ref}>
        <motion.div
          className="flex flex-col items-center justify-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Portfolio Showcase</span>
          </motion.div>

          <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            My Projects
          </h2>

          <motion.p
            className="text-gray-400 text-center max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore my latest work and creative solutions across web and mobile
            platforms
          </motion.p>
        </motion.div>

        {/* Filter section with mobile toggle */}
        <div className="relative mb-12">
          <div className="flex justify-center items-center">
            <motion.div
              className="hidden md:flex flex-row justify-center items-center gap-3 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ProjectTag
                onClick={handleTagChange}
                name="All"
                isSelected={tag === "All"}
              />
              <ProjectTag
                onClick={handleTagChange}
                name="Web"
                isSelected={tag === "Web"}
              />
              <ProjectTag
                onClick={handleTagChange}
                name="Mobile"
                isSelected={tag === "Mobile"}
              />
            </motion.div>

            {/* Mobile filter toggle */}
            <motion.button
              className="md:hidden flex items-center gap-2 text-white bg-[#1e1e1e]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#583ebc]"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Filter size={16} />
              <span>Filter: {tag}</span>
            </motion.button>
          </div>

          {/* Mobile filter dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                className="md:hidden absolute z-20 mt-2 w-full bg-[#1e1e1e]/90 backdrop-blur-md rounded-lg border border-[#583ebc] overflow-hidden"
                variants={filterVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="p-4 flex flex-col gap-2">
                  <button
                    className={`text-left px-4 py-2 rounded-md ${tag === "All" ? "bg-[#583ebc] text-white" : "text-white hover:bg-[#2a2a2a]"}`}
                    onClick={() => handleTagChange("All")}
                  >
                    All
                  </button>
                  <button
                    className={`text-left px-4 py-2 rounded-md ${tag === "Web" ? "bg-[#583ebc] text-white" : "text-white hover:bg-[#2a2a2a]"}`}
                    onClick={() => handleTagChange("Web")}
                  >
                    Web
                  </button>
                  <button
                    className={`text-left px-4 py-2 rounded-md ${tag === "Mobile" ? "bg-[#583ebc] text-white" : "text-white hover:bg-[#2a2a2a]"}`}
                    onClick={() => handleTagChange("Mobile")}
                  >
                    Mobile
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ opacity }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover="hover"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="relative"
              >
                {/* Connection lines between projects */}
                {index < filteredProjects.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 right-0 w-8 h-px bg-[#583ebc]/30 hidden lg:block"
                    initial={{ width: 0 }}
                    animate={{ width: hoveredProject === project.id ? 40 : 20 }}
                    style={{
                      zIndex: 1,
                      opacity: hoveredProject === project.id ? 1 : 0.3,
                      translateX: "100%",
                    }}
                  />
                )}

                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  tags={project.tag}
                  gitUrl={project?.gitUrl}
                  previewUrl={project?.previewUrl}
                  tecnologias={project.tecnologias}
                  isHovered={hoveredProject === project.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact and Social Links */}
        <motion.div
          className="flex flex-col text-center items-center justify-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/Contact"
            className="group relative overflow-hidden rounded-full mt-3 w-48 h-12 flex items-center justify-center font-bold"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-80"></span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 group-hover:opacity-80 transition-opacity duration-300"></span>
            <span className="absolute inset-0 w-full h-full border border-white/20 rounded-full"></span>
            <span className="relative z-10 flex items-center gap-2 text-white">
              <span className="transition-transform duration-300 group-hover:translate-x-[-4px]">
                Contact Me
              </span>
              <ArrowUpRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-[-4px]" />
            </span>
          </Link>

          <div className="sociais flex gap-4 mt-8 mb-12">
            <motion.div
              whileHover={{ y: -8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                target="_blank"
                href="https://github.com/CalvinSoares"
                className="block p-3 bg-[#1e1e1e]/60 backdrop-blur-sm rounded-full hover:bg-[#583ebc] transition-colors duration-300 border border-white/10"
              >
                <Image
                  src="/images/github.svg"
                  alt="Github Icon"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/calvinsoares/"
                className="block p-3 bg-[#1e1e1e]/60 backdrop-blur-sm rounded-full hover:bg-[#583ebc] transition-colors duration-300 border border-white/10"
              >
                <Image
                  src="/images/linkedin.svg"
                  alt="Linkedin Icon"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                target="_blank"
                href="https://www.tiktok.com/@pato_programador?lang=pt-BR"
                className="block p-3 bg-[#1e1e1e]/60 backdrop-blur-sm rounded-full hover:bg-[#583ebc] transition-colors duration-300 border border-white/10"
              >
                <Image
                  src="/images/tiktok.svg"
                  alt="Tiktok Icon"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
