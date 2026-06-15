"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import { ArrowRight, Sparkles } from "lucide-react";
import ParticleField from "../../components/ParticlesField";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const focusAreas = [
    {
      title: t("about.focus_title_1"),
      text: t("about.focus_text_1"),
    },
    {
      title: t("about.focus_title_2"),
      text: t("about.focus_text_2"),
    },
    {
      title: t("about.focus_title_3"),
      text: t("about.focus_text_3"),
    },
  ];

  const featuredExperienceTags = [
    "Next.js",
    "Redis",
    "Amazon SQS",
    "Amazon RDS",
    "Amazon EC2",
    "Kubernetes",
    "ArgoCD",
    "CI/CD",
  ];

  const skills = [
    { name: "TypeScript", icon: "/ts.svg" },
    { name: "React", icon: "/react.svg" },
    { name: "Tailwind CSS", icon: "/tailwind.svg" },
    { name: "Next.js", icon: "/next.svg" },
    { name: "Node.js", icon: "/node.svg" },
    { name: "NestJS", icon: "/nest.svg" },
    { name: "MongoDB", icon: "/mongo.svg" },
    { name: "PostgreSQL", icon: "/postgresql.svg" },
    { name: "Git", icon: "/git.svg" },
    { name: "Docker", icon: "/docker.svg" },
    { name: "Jest", icon: "/jest.svg" },
  ];
  const skillsCarousel = [...skills, ...skills];

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

  useLayoutEffect(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-about-intro]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from("[data-about-focus]", {
        scrollTrigger: {
          trigger: "[data-about-focus-group]",
          start: "top 80%",
        },
        x: -56,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from("[data-skill-pill]", {
        scrollTrigger: {
          trigger: "[data-skills-grid]",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <section
      id="About"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#121212]"
    >
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      <motion.div
        className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/10 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 h-96 w-96 rounded-full bg-gradient-to-r from-violet-700/10 to-fuchsia-700/20 blur-3xl"
        style={{ y: y2 }}
      />

      <div className="relative z-50 pt-0 md:pt-8">
        <Header />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div ref={overviewRef} className="mx-auto max-w-5xl">
          <div className="text-center">
            <div
              data-about-intro
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#583ebc]/30 bg-[#583ebc]/20 px-4 py-1.5 text-[#a48eff]"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-medium">{t("about.role")}</span>
            </div>

            <p
              data-about-intro
              className="text-sm uppercase tracking-[0.22em] text-gray-500"
            >
              {t("nav.about")}
            </p>
            <h1
              data-about-intro
              className="mt-3 text-4xl font-bold text-white md:text-5xl"
            >
              Calvin Soares
            </h1>
            <p
              data-about-intro
              className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300"
            >
              {t("about.summary_1")}
            </p>
            <p
              data-about-intro
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400"
            >
              {t("about.summary_2")}
            </p>

            <div data-about-intro className="mt-8 flex justify-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1e1e1e]/60 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#583ebc]"
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div
              data-about-intro
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171717] to-[#101010] p-6 text-center md:p-8"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[#a48eff]">
                {t("hero.role")}
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                {t("hero.headline")}
              </h2>
              <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-gray-300">
                {t("hero.description")}
              </p>
            </div>
          </div>

          <div
            data-about-focus-group
            className="mx-auto mt-12 max-w-5xl space-y-5"
          >
            {focusAreas.map((item, index) => (
              <div
                key={item.title}
                data-about-focus
                className="grid gap-4 rounded-[1.8rem] border border-white/10 bg-[#171717]/78 p-6 backdrop-blur-sm md:grid-cols-[88px_1fr] md:items-start md:p-7"
              >
                <span className="text-sm font-semibold text-[#c2b5ff]">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
                    {item.title}
                  </p>
                  <p className="mt-3 max-w-3xl leading-relaxed text-gray-300">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div
              data-about-focus
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171717] to-[#101010] p-6 md:p-8"
            >
              <div className="flex flex-col gap-4 text-center md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#a48eff]">
                    {t("about.featured_experience")}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {t("about.featured_company")}
                  </h2>
                  <p className="mt-1 text-sm text-gray-400">
                    {t("about.featured_role")}
                  </p>
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-gray-300">
                {t("about.featured_summary")}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {featuredExperienceTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={skillsRef} className="mt-20 pt-12">
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#583ebc]/30 bg-[#583ebc]/20 px-4 py-1.5 text-[#a48eff]">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-medium">{t("about.expertise")}</span>
            </div>
            <h2 className="text-3xl font-bold text-white">{t("about.skills")}</h2>
          </div>

          <div
            data-skills-grid
            className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] px-0 py-4"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#121212] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#121212] to-transparent" />
            <div className="marquee-track">
              {skillsCarousel.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  data-skill-pill
                  className="mr-3 inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-3 text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  whileHover={{ y: -4, backgroundColor: "rgba(88,62,188,0.16)" }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/15">
                    <Image
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-16 border-t border-white/10 pt-10 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <Link href="/projects">
            <motion.button
              className="group relative mx-auto overflow-hidden rounded-full border border-[#583ebc]/40 bg-[#171717]/70 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#583ebc]/10"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                {t("about.cta_projects")}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
