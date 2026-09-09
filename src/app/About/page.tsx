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
} from "lucide-react";
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

  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -46],
  );

  return (
    <section
      id="About"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#120d1d]"
    >
      <div className="relative z-50">
        <Header />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Split hero: copy on the left, brand portrait on the right */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div
              data-about-intro
              className="eyebrow mb-6"
            >
              <span>03 — {t("about.role")}</span>
            </div>

            <p
              data-about-intro
              className="font-technical text-[11px] font-semibold uppercase text-[#a6aaa2]"
            >
              {t("nav.about")}
            </p>
            <h1
              data-about-intro
              className="mt-3 text-5xl font-semibold tracking-[-0.06em] text-[#efeee8] md:text-6xl"
            >
              Calvin Soares
            </h1>
            <p
              data-about-intro
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#d8dad3]"
            >
              {t("about.summary_1")}
            </p>
            <p
              data-about-intro
              className="mt-4 max-w-xl text-base leading-relaxed text-[#a6aaa2]"
            >
              {t("about.summary_2")}
            </p>

            <div
              data-about-intro
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/projects"
                className="pixel-frame group relative inline-flex items-center gap-2 bg-[#f6c744] px-5 py-2.5 text-sm font-bold text-[#211734] transition-colors hover:bg-[#ffe89d]"
              >
                {t("about.cta_projects")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="/images/CalvinSoares.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#8d62f7] bg-[#211734] px-5 py-2.5 text-sm font-semibold text-[#f8f4ff] transition-colors hover:border-[#f6c744]"
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
                    className="flex h-10 w-10 items-center justify-center border border-[#8d62f7] bg-[#2d2044] text-white transition-colors duration-300 hover:border-[#f6c744]"
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
                  className="rounded-2xl border border-[#4c3b66] bg-[#211734] p-4"
                  whileHover={{ y: -4, borderColor: "#f6c744" }}
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
            <motion.div
              style={{ y: portraitY }}
              className="pixel-frame group relative h-[380px] overflow-hidden border border-[#8d62f7] bg-[#211734] transition-transform duration-500 md:h-[460px]"
            >
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-[#4c3b66] text-[#b9accb]">
                <div className="border-b border-r border-[#4c3b66] p-6"><p className="eyebrow">01</p><p className="mt-4 text-sm leading-relaxed">Sistemas que permanecem claros quando o contexto fica complexo.</p></div>
                <div className="border-b border-[#4c3b66] p-6"><p className="eyebrow">02</p><p className="mt-4 text-sm leading-relaxed">Decisões técnicas guiadas por produto, não por tendência.</p></div>
                <div className="border-r border-[#4c3b66] p-6"><p className="eyebrow">03</p><p className="mt-4 text-sm leading-relaxed">Integrações críticas desenhadas para falhar bem.</p></div>
                <div className="p-6"><p className="eyebrow">04</p><p className="mt-4 text-sm leading-relaxed">Interfaces que tornam operações e dados compreensíveis.</p></div>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="border border-[#52584e] bg-[#0f100f] px-6 py-4 text-center">
                  <p className="font-technical text-xs uppercase text-[#f6c744]">
                    {"<"}Calvin{" />"}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#efeee8]">
                    {t("hero.role")}
                  </p>
                </div>
              </div>
              <p className="absolute bottom-4 left-4 border-l-2 border-[#f6c744] pl-3 font-technical text-[10px] font-bold uppercase text-[#f8f4ff]">{t("hero.availability")}</p>
            </motion.div>
          </div>
        </div>

        {/* Focus areas */}
        <div data-about-focus-group className="mt-20">
          <div className="mb-8">
            <p className="eyebrow">{t("hero.highlights_title")}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {focusAreas.map((item, index) => (
              <motion.div
                key={item.title}
                data-about-focus
                className="group relative overflow-hidden rounded-2xl border border-[#4c3b66] bg-[#211734] p-6 transition-colors duration-300 hover:border-[#f6c744] md:p-7"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#8d62f7] text-[#f6c744]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-technical text-sm font-semibold text-[#a6aaa2]">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-5 font-technical text-xs font-semibold uppercase text-[#efeee8]">
                  {item.title}
                </p>
                <p className="mt-3 leading-relaxed text-[#a6aaa2]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured experience spotlight */}
        <div
          data-about-exp
          className="mt-16 overflow-hidden border border-[#353a33] bg-[#171917]"
        >
          <div className="grid gap-0 md:grid-cols-[260px_1fr]">
            <div className="relative border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
              <p className="eyebrow">
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
                  className="border border-[#353a33] bg-[#20231f] px-3 py-1.5 text-xs text-[#d8dad3]"
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
            <p className="eyebrow mb-4">{t("about.expertise")}</p>
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
