"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import { ArrowRight, Sparkles } from "lucide-react";
import ParticleField from "../../components/ParticlesField";
// 1. Importar o hook de tradução
import { useLanguage } from "../../context/LanguageContext";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // 2. Inicializar o hook
  const { t } = useLanguage();

  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Skills data
  const skills = [
    { name: "TypeScript", icon: "/ts.svg", color: "hover:text-blue-700" },
    { name: "React", icon: "/react.svg", color: "hover:text-sky-500" },
    {
      name: "Tailwind CSS",
      icon: "/tailwind.svg",
      color: "hover:text-teal-400",
    },
    { name: "Next.js", icon: "/next.svg", color: "hover:text-gray-900" },
    { name: "Node.js", icon: "/node.svg", color: "hover:text-emerald-500" },
    { name: "NestJS", icon: "/nest.svg", color: "hover:text-red-700" },
    { name: "MongoDB", icon: "/mongo.svg", color: "hover:text-green-600" },
    {
      name: "PostgreSQL",
      icon: "/postgresql.svg",
      color: "hover:text-blue-800",
    },
    { name: "Git", icon: "/git.svg", color: "hover:text-red-500" },
    { name: "Docker", icon: "/docker.svg", color: "hover:text-sky-500" },
    { name: "Jest", icon: "/jest.svg", color: "hover:text-orange-600" },
  ];

  // Social links
  const socialLinks = [
    {
      name: "GitHub",
      icon: "/images/github.svg",
      url: "https://github.com/CalvinSoares",
    },
    {
      name: "LinkedIn",
      icon: "/images/linkedin.svg",
      url: "https://www.linkedin.com/in/calvinsoares/",
    },
    {
      name: "TikTok",
      icon: "/images/tiktok.svg",
      url: "https://www.tiktok.com/@pato_programador?lang=pt-BR",
    },
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.05,
      },
    }),
    hover: {
      y: -8,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="About"
      className="relative min-h-screen w-full overflow-hidden bg-[#121212]"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Decorative Gradient Orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/10 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-violet-700/10 to-fuchsia-700/20 blur-3xl"
        style={{ y: y2 }}
      />

      {/* Header */}
      <div className="pt-0 md:pt-8 relative z-50">
        <Header />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* About Me Section */}
        <div className="max-w-6xl mx-auto mb-24" ref={aboutRef}>
          <motion.div
            className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
            variants={containerVariants}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
          >
            {/* Profile Image */}
            <motion.div
              className="w-48 h-48 md:w-64 md:h-64 relative"
              variants={itemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] rounded-full blur-md opacity-70"></div>
              <div className="absolute inset-2 bg-[#1e1e1e] rounded-full overflow-hidden border-4 border-[#583ebc]">
                <Image
                  src="/images/devImg.jpg"
                  alt="Calvin Soares"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1e1e1e]"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 2,
                  repeatDelay: 1,
                }}
              />
            </motion.div>

            {/* About Text */}
            <motion.div className="flex-1" variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-4"
                variants={itemVariants}
              >
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-sm font-medium">{t("about.role")}</span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                Calvin Soares
              </motion.h1>

              <motion.div
                className="prose prose-invert max-w-none"
                variants={itemVariants}
              >
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  {t("about.p1_start")}{" "}
                  <span className="text-[#a48eff] font-semibold">
                    front-end
                  </span>{" "}
                  {t("about.and")}{" "}
                  <span className="text-[#a48eff] font-semibold">back-end</span>
                  {t("about.p1_mid")}{" "}
                  <span className="text-[#a48eff] font-semibold">
                    fullstack
                  </span>{" "}
                  {t("about.applications")}
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div className="mt-8 flex gap-4" variants={itemVariants}>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1e1e1e]/60 backdrop-blur-sm rounded-full text-white hover:bg-[#583ebc] transition-colors duration-300 border border-white/10"
                    whileHover={{ y: -8, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image
                      src={link.icon || "/placeholder.svg"}
                      alt={`${link.name} Icon`}
                      width={24}
                      height={24}
                      className="w-5 h-5"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto mb-24" ref={skillsRef}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-4">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-medium">
                {t("about.expertise")}
              </span>
            </motion.div>
            <h2 className="text-3xl font-bold text-white">
              {t("about.skills")}
            </h2>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={isSkillsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`flex flex-col items-center cursor-pointer ${skill.color} transition-colors duration-300`}
                custom={index}
                variants={skillVariants}
                initial="hidden"
                animate={isSkillsInView ? "visible" : "hidden"}
                whileHover="hover"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-[#1e1e1e]/60 backdrop-blur-sm p-3 md:p-4 flex items-center justify-center mb-3 border border-[#2a2a2a] hover:border-[#583ebc] transition-colors">
                  <Image
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden md:block">
          <div className="absolute left-32 top-1/3 h-32 w-2 bg-[#583ebc]/30"></div>
          <div className="absolute left-28 top-1/3 h-8 w-2 bg-[#583ebc]/30"></div>
          <div className="absolute right-32 bottom-1/3 h-32 w-2 bg-[#583ebc]/30"></div>
          <div className="absolute right-28 bottom-1/3 h-8 w-2 bg-[#583ebc]/30"></div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ delay: 0.8 }}
        >
          <Link href="/projects">
            <motion.button
              className="group relative overflow-hidden rounded-full px-8 py-3 bg-transparent border border-[#583ebc] text-[#583ebc] font-medium flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                {t("about.cta_projects")}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-[#583ebc] translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
