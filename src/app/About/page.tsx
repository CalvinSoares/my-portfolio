"use client";

import { useLayoutEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import {
  ArrowRight,
  Download,
  Layers,
  Rocket,
  ServerCog,
  Sparkles,
} from "lucide-react";
import ParticleField from "../../components/ParticlesField";
import LetterGlitch from "../../components/LetterGlitch";
import { useLanguage } from "../../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const focusAreas = [
    {
      icon: Layers,
      title: t("about.focus_title_1"),
      text: t("about.focus_text_1"),
    },
    {
      icon: ServerCog,
      title: t("about.focus_title_2"),
      text: t("about.focus_text_2"),
    },
    {
      icon: Rocket,
      title: t("about.focus_title_3"),
      text: t("about.focus_text_3"),
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
  const skillsRowA = [...skills, ...skills];
  const skillsRowB = [...[...skills].reverse(), ...[...skills].reverse()];

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
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from("[data-about-portrait]", {
        x: 48,
        opacity: 0,
        rotate: 4,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from("[data-about-focus]", {
        scrollTrigger: {
          trigger: "[data-about-focus-group]",
          start: "top 82%",
        },
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from("[data-about-exp]", {
        scrollTrigger: {
          trigger: "[data-about-exp]",
          start: "top 82%",
        },
        y: 32,
        opacity: 0,
        duration: 0.75,
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
        stagger: 0.03,
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
  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -46],
  );

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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Split hero: copy on the left, brand portrait on the right */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
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
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300"
            >
              {t("about.summary_1")}
            </p>
            <p
              data-about-intro
              className="mt-4 max-w-xl text-base leading-relaxed text-gray-400"
            >
              {t("about.summary_2")}
            </p>

            <div
              data-about-intro
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#583ebc] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a32a0]"
              >
                {t("about.cta_projects")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="/images/CalvinSoares.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                {t("hero.download_cv")}
              </a>

              <div className="flex items-center gap-2.5">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("hero.social_label")} ${link.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1e1e1e]/60 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#583ebc]"
                    whileHover={{ y: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={link.icon || "/placeholder.svg"}
                      alt={`${link.name} Icon`}
                      width={20}
                      height={20}
                      className="h-4.5 w-4.5"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            <div
              data-about-intro
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {metrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-[#171717]/70 p-4 backdrop-blur-sm"
                  whileHover={{ y: -4, borderColor: "rgba(164,142,255,0.35)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a48eff]">
                    {metric.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-gray-200">
                    {metric.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div data-about-portrait className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#583ebc]/20 blur-3xl" />
            <motion.div
              style={{ y: portraitY }}
              className="group relative h-[380px] rotate-2 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40 transition-transform duration-500 hover:rotate-0 md:h-[460px]"
            >
              <LetterGlitch
                glitchColors={["#2b2158", "#583ebc", "#a48eff"]}
                glitchSpeed={50}
                smooth
                outerVignette
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-2xl border border-white/10 bg-black/45 px-6 py-4 text-center backdrop-blur-md">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#a48eff]">
                    {"<"}Calvin{" />"}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/90">
                    {t("hero.role")}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3.5 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-white/90">
                  {t("hero.availability")}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Focus areas */}
        <div data-about-focus-group className="mt-20">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#583ebc]/30 bg-[#583ebc]/20 px-4 py-1.5 text-[#a48eff]">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-medium">
                {t("hero.highlights_title")}
              </span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {focusAreas.map((item, index) => (
              <motion.div
                key={item.title}
                data-about-focus
                className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#171717]/78 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#583ebc]/45 md:p-7"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#583ebc]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#583ebc]/25" />
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#583ebc]/30 bg-[#583ebc]/15 text-[#c2b5ff] transition-colors duration-300 group-hover:bg-[#583ebc]/30">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-white/25 transition-colors duration-300 group-hover:text-[#c2b5ff]">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                  {item.title}
                </p>
                <p className="mt-3 leading-relaxed text-gray-300">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured experience spotlight */}
        <div
          data-about-exp
          className="mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171717] to-[#101010]"
        >
          <div className="grid gap-0 md:grid-cols-[260px_1fr]">
            <div className="relative border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#583ebc] to-[#7c5ce6]" />
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

            <div className="p-6 md:p-8">
              <p className="max-w-3xl leading-relaxed text-gray-300">
                {t("about.featured_summary")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
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

        {/* Skills — two counter-scrolling marquee rows */}
        <div className="mt-20">
          <div className="mb-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#583ebc]/30 bg-[#583ebc]/20 px-4 py-1.5 text-[#a48eff]">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-sm font-medium">
                {t("about.expertise")}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {t("about.skills")}
            </h2>
          </div>

          <div
            data-skills-grid
            className="marquee-group relative space-y-3 overflow-hidden rounded-[2rem] bg-white/[0.03] px-0 py-5"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#121212] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#121212] to-transparent" />
            <div className="marquee-track">
              {skillsRowA.map((skill, index) => (
                <motion.div
                  key={`a-${skill.name}-${index}`}
                  data-skill-pill
                  className="mr-3 inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-3 text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  whileHover={{
                    y: -4,
                    backgroundColor: "rgba(88,62,188,0.16)",
                  }}
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
            <div className="marquee-track marquee-track-reverse">
              {skillsRowB.map((skill, index) => (
                <motion.div
                  key={`b-${skill.name}-${index}`}
                  className="mr-3 inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-3 text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  whileHover={{
                    y: -4,
                    backgroundColor: "rgba(88,62,188,0.16)",
                  }}
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

        {/* Bottom CTA */}
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
