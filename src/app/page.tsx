"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Mail, Sparkles } from "lucide-react";
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
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  const calculateParallax = (depth = 10) => {
    if (!containerRef.current || shouldReduceMotion) return { x: 0, y: 0 };

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return {
      x: (mousePosition.x - centerX) / depth,
      y: (mousePosition.y - centerY) / depth,
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 22, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const parallax1 = calculateParallax(22);
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

  return (
    <section
      id="Home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#121212]"
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

      <div className="relative z-50 pt-0 md:pt-8">
        <Header />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl flex-col justify-center px-6 py-16 text-center md:px-12 lg:px-20">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 self-center rounded-full border border-[#583ebc]/30 bg-[#583ebc]/20 px-4 py-1.5 text-[#a48eff]"
            variants={itemVariants}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">{t("hero.role")}</span>
          </motion.div>

          <motion.div
            className="mb-6"
            variants={itemVariants}
            style={{ x: parallax1.x / 5, y: parallax1.y / 5 }}
          >
            <p className="mb-2 text-base text-gray-400 md:text-xl">
              {t("hero.greeting")}
            </p>
            <h1 className="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Calvin Soares
            </h1>
            <p className="mx-auto max-w-4xl text-2xl font-semibold leading-tight text-white md:text-5xl">
              {t("hero.headline")}
            </p>
          </motion.div>

          <motion.p
            className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg"
            variants={itemVariants}
          >
            {t("hero.metrics_delivery_value")}
          </motion.p>

          <motion.div
            className="mt-6 inline-flex items-center gap-2 self-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
            variants={itemVariants}
          >
            <BriefcaseBusiness className="h-4 w-4" />
            <span>{t("hero.availability")}</span>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            variants={itemVariants}
          >
            <Link href="/projects">
              <motion.span
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#583ebc] px-6 py-3 font-medium text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.primary_cta")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.span>
            </Link>

            <Link href="/Contact">
              <motion.span
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#583ebc] px-6 py-3 font-medium text-[#c2b5ff]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  <Mail className="h-5 w-5" />
                  {t("hero.secondary_cta")}
                </span>
                <span className="absolute inset-0 translate-y-full bg-[#583ebc] transition-transform duration-300 group-hover:translate-y-0" />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col items-center gap-5 border-t border-white/10 pt-6"
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
                className="group relative overflow-hidden rounded-full border border-[#583ebc]/40 bg-[#171717]/70 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#583ebc]/10"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  {t("hero.about_me")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
