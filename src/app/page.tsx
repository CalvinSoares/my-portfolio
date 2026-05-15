"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ReactTyped } from "react-typed";
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";
import Header from "../components/Header";
import ParticleField from "../components/ParticlesField";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion]);

  const downloadPDF = () => {
    const pdfUrl = "/images/CalvinSoares.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "calvinsoares.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateParallax = (depth = 10) => {
    if (!containerRef.current || shouldReduceMotion) return { x: 0, y: 0 };

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (mousePosition.x - centerX) / depth;
    const offsetY = (mousePosition.y - centerY) / depth;

    return { x: offsetX, y: offsetY };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
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

  const parallax1 = calculateParallax(20);
  const parallax2 = calculateParallax(50);

  const socialLinks = [
    {
      name: "GitHub",
      icon: "/images/github.svg",
      url: "https://github.com/CalvinSoares",
      color: "hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: "/images/linkedin.svg",
      url: "https://www.linkedin.com/in/calvinsoares/",
      color: "hover:bg-blue-600",
    },
    {
      name: "TikTok",
      icon: "/images/tiktok.svg",
      url: "https://www.tiktok.com/@pato_programador?lang=pt-BR",
      color: "hover:bg-black",
    },
  ];

  const metrics = [
    {
      label: t("hero.metrics_experience_label"),
      value: t("hero.metrics_experience_value"),
    },
    {
      label: t("hero.metrics_stack_label"),
      value: t("hero.metrics_stack_value"),
    },
    {
      label: t("hero.metrics_delivery_label"),
      value: t("hero.metrics_delivery_value"),
    },
  ];

  const highlights = [
    t("hero.highlight_1"),
    t("hero.highlight_2"),
    t("hero.highlight_3"),
  ];

  return (
    <section
      id="Home"
      className="relative min-h-screen w-full overflow-hidden bg-[#121212]"
      ref={containerRef}
    >
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      <motion.div
        className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/10 blur-3xl"
        style={{ x: parallax2.x, y: parallax2.y }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 h-96 w-96 rounded-full bg-gradient-to-r from-violet-700/10 to-fuchsia-700/20 blur-3xl"
        style={{ x: -parallax2.x, y: -parallax2.y }}
      />

      <div className="pt-0 md:pt-8 relative z-50">
        <Header />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col justify-center px-6 py-16 md:px-12 lg:flex-row lg:items-center lg:gap-16 lg:px-20">
        <motion.div
          className="w-full lg:w-[56%]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-6"
            variants={itemVariants}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">{t("hero.role")}</span>
          </motion.div>

          <motion.div
            className="mb-6"
            variants={itemVariants}
            style={{ x: parallax1.x / 3, y: parallax1.y / 3 }}
          >
            <p className="mb-2 text-base text-gray-400 md:text-xl">
              {t("hero.greeting")}
            </p>
            <h1 className="mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              <ReactTyped
                strings={["Calvin Soares"]}
                typeSpeed={100}
                backSpeed={20}
                showCursor={true}
                cursorChar="|"
                className="text-4xl md:text-7xl"
              />
            </h1>
            <p className="max-w-2xl text-2xl font-semibold leading-tight text-white md:text-4xl">
              {t("hero.headline")}
            </p>
          </motion.div>

          <motion.p
            className="mb-4 max-w-2xl text-lg leading-relaxed text-gray-300"
            variants={itemVariants}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
            variants={itemVariants}
          >
            <BriefcaseBusiness className="h-4 w-4" />
            <span>{t("hero.availability")}</span>
          </motion.div>

          <motion.div
            className="mb-8 grid gap-4 sm:grid-cols-3"
            variants={itemVariants}
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400">
                  {metric.label}
                </p>
                <p className="text-base font-semibold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mb-8 flex flex-col gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <Link href="/projects" className="sm:flex-1 md:flex-none">
              <motion.span
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-[#583ebc] px-6 py-3 font-medium text-white gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.primary_cta")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </motion.span>
            </Link>

            <Link href="/Contact" className="sm:flex-1 md:flex-none">
              <motion.span
                className="group relative flex items-center justify-center overflow-hidden rounded-full border border-[#583ebc] px-6 py-3 font-medium text-[#c2b5ff] gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                  {t("hero.secondary_cta")}
                </span>
                <span className="absolute inset-0 translate-y-full bg-[#583ebc] transition-transform duration-300 group-hover:translate-y-0"></span>
              </motion.span>
            </Link>

            <motion.button
              onClick={downloadPDF}
              className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-white gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-5 w-5" />
                {t("hero.download_cv")}
              </span>
            </motion.button>
          </motion.div>

          <motion.div
            className="mb-10 rounded-3xl border border-white/10 bg-[#171717]/80 p-5 backdrop-blur-sm"
            variants={itemVariants}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#a48eff]">
              {t("hero.highlights_title")}
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm leading-relaxed text-gray-300"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
            variants={itemVariants}
          >
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1e1e1e]/60 text-white backdrop-blur-sm transition-colors duration-300 ${link.color}`}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`${t("hero.social_label")} ${link.name}`}
                >
                  <Image
                    src={link.icon || "/placeholder.svg"}
                    alt={`${link.name} Icon`}
                    width={24}
                    height={24}
                    className="h-5 w-5"
                  />
                </motion.a>
              ))}
            </div>

            <Link href="/About">
              <motion.button
                className="group flex items-center gap-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="flex items-center gap-2">
                  {t("hero.about_me")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-12 hidden w-full lg:mt-0 lg:flex lg:w-[44%] lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ x: parallax2.x / 2, y: parallax2.y / 2 }}
        >
          <div className="relative w-full max-w-[460px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#583ebc]/20 to-[#7c5ce6]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#171717]/90 p-6 shadow-2xl shadow-[#583ebc]/10 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-400">
                  system-profile.ts
                </span>
              </div>

              <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#21164c] to-[#121212] p-5">
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c2b5ff]">
                  {t("hero.role")}
                </p>
                <p className="text-2xl font-semibold text-white">
                  {t("hero.metrics_delivery_value")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  {t("hero.description")}
                </p>
              </div>

              <pre className="overflow-x-auto rounded-3xl border border-white/10 bg-[#101010] p-5 text-sm leading-7 text-gray-300">
                <code>{`const calvin = {
  role: "Full Stack Engineer",
  focus: ["Distributed Systems", "Product Engineering"],
  stack: ["React", "Node.js", "Java", "Spring Boot"],
  delivery: "Architecture, performance and scalable products",
};`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
