"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import ProjectTag from "../../components/ProjectTag";
import ProjectCard from "../../components/ProjectCard";
import { ArrowUpRight, Filter, Sparkles } from "lucide-react";
import ParticleBackground from "../../components/particleBackground";
import { useLanguage } from "../../context/LanguageContext";

type ProjectFilter = "All" | "Web" | "Mobile";

const projectData = [
  {
    id: 1,
    title: "QuackLinks",
    descriptionEn:
      "A premium link-in-bio platform built for creators and brands to centralize their digital presence with customization, analytics and monetization-ready features.",
    descriptionPt:
      "Uma plataforma premium de link na bio para criadores e marcas centralizarem sua presença digital com personalização, analytics e recursos prontos para monetização.",
    roleEn:
      "Worked across the product, combining a customizable front-end with a Spring Boot backend for authentication, security, payments and core integrations.",
    rolePt:
      "Atuei de ponta a ponta no produto, combinando um front-end altamente personalizável com um backend em Spring Boot para autenticação, segurança, pagamentos e integrações centrais.",
    impactEn:
      "Delivered a stronger product foundation with a polished experience, secure APIs and an architecture ready to evolve premium features.",
    impactPt:
      "Entregou uma base mais sólida para o produto, com experiência refinada, APIs seguras e uma arquitetura pronta para evoluir recursos premium.",
    image: "/images/projects/quacklinks.png",
    tag: ["All", "Web"],
    previewUrl: "https://quacklinks.duckdns.org/",
    tecnologias: [
      "Vue.js",
      "TypeScript",
      "Tailwind",
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Stripe",
      "Cloudflare R2",
    ],
  },
  {
    id: 2,
    featured: true,
    title: "PagLemon",
    descriptionEn:
      "A payment platform connected to the PIX ecosystem, focused on charge creation, QR Code generation and real-time transaction updates via postbacks and webhooks.",
    descriptionPt:
      "Uma plataforma de pagamentos conectada ao ecossistema PIX, com foco em geracao de cobrancas, QR Code e atualizacoes em tempo real via postbacks e webhooks.",
    roleEn:
      "Led the technical evolution of the payment solution, redesigning integrations, asynchronous flows and infrastructure to support reliable processing and operational visibility.",
    rolePt:
      "Liderei a evolucao tecnica da solucao de pagamentos, redesenhando integracoes, fluxos assincronos e infraestrutura para suportar processamento confiavel e visibilidade operacional.",
    impactEn:
      "Helped automate collections, reduce checkout friction and improve reconciliation and end-to-end transaction traceability for the business.",
    impactPt:
      "Ajudou a automatizar recebimentos, reduzir a friccao no checkout e melhorar a conciliacao e a rastreabilidade ponta a ponta das transacoes.",
    image: "/images/projects/paglemon.png",
    tag: ["All", "Web"],
    previewUrl: "https://app.paglemon.org/",
    tecnologias: [
      "Next.js",
      "TypeScript",
      "Redis",
      "Amazon SQS",
      "Amazon RDS",
      "Amazon EC2",
      "Kubernetes",
      "ArgoCD",
      "CI/CD",
      "Docker",
    ],
  },
  {
    id: 3,
    title: "Arcade Lunar",
    descriptionEn: "Web-Site presentation of Arcade Lunar",
    descriptionPt: "Web-Site de apresentação do Arcade Lunar",
    roleEn: "Landing page and visual presentation of the brand.",
    rolePt: "Landing page e apresentação visual da marca.",
    impactEn:
      "Improved brand perception with a stronger visual identity and clearer digital presence.",
    impactPt:
      "Melhorou a percepção da marca com identidade visual forte e presença digital mais clara.",
    image: "/images/projects/arcadelunar.png",
    tag: ["All", "Web"],
    previewUrl: "https://arcadelunar.com.br",
    tecnologias: ["Next", "Typescript", "Tailwind", "I18n", "Framer-Motion"],
  },
  {
    id: 4,
    title: "Logistic Dashboard",
    descriptionEn: "Logistic management system",
    descriptionPt: "Sistema de gerenciamento logístico",
    roleEn:
      "Dashboard front-end focused on data visibility and operational flow.",
    rolePt:
      "Front-end do dashboard com foco em visibilidade de dados e fluxo operacional.",
    impactEn:
      "Centralized operational information and improved daily monitoring.",
    impactPt:
      "Centralizou informações operacionais e facilitou o monitoramento do dia a dia.",
    image: "/images/projects/logistic.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/CalvinSoares/logistic-system",
    previewUrl:
      "https://www.linkedin.com/posts/calvinsoares_eae-rede-tranquilos-hoje-vim-divulgar-activity-7262563262469210113-hd2L?utm_source=share&utm_medium=member_desktop",
    tecnologias: ["React", "TypeScript", "Node", "Tailwind", "MongoDB"],
  },
  {
    id: 5,
    title: "Search Game (freelancer)",
    descriptionEn: "Word search app",
    descriptionPt: "Aplicativo de caça-palavras",
    roleEn:
      "Freelance mobile app delivery for an interactive word search experience.",
    rolePt:
      "Entrega mobile freelance para uma experiência interativa de caça-palavras.",
    impactEn: "Turned a game concept into a published mobile experience.",
    impactPt:
      "Transformou um conceito de jogo em uma experiência mobile publicada.",
    image: "/images/projects/searchGame.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/CalvinSoares/word-search-game",
    previewUrl:
      "https://play.google.com/store/apps/details?id=wordl.searc.game&pcampaignid=web_share",
    tecnologias: ["React-Native", "Javascript", "Style Components"],
  },
  {
    id: 6,
    title: "Dashboard Page",
    descriptionEn: "Data management system",
    descriptionPt: "Sistema de gerenciamento de dados",
    roleEn: "Dashboard UI with charts and data organization.",
    rolePt: "UI de dashboard com gráficos e organização de dados.",
    impactEn:
      "Improved readability of business information with a cleaner analytics interface.",
    impactPt:
      "Melhorou a leitura de informações de negócio com uma interface analítica mais clara.",
    image: "/images/projects/dashboard.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/CalvinSoares/dashboardEcharts",
    previewUrl: "https://dashboard-echarts.vercel.app/",
    tecnologias: ["Next", "TypeScript", "Node", "Tailwind", "MongoDB"],
  },
  {
    id: 7,
    title: "Banco Bet",
    descriptionEn:
      "Front-end of an internal system for bank management of affiliate accounts.",
    descriptionPt:
      "Front-end de um sistema interno para gestão bancária de contas de afiliados.",
    roleEn:
      "Internal front-end focused on financial workflow and operational support.",
    rolePt:
      "Front-end interno com foco em fluxo financeiro e suporte operacional.",
    impactEn: "Supported faster account management for internal teams.",
    impactPt: "Apoiou uma gestão mais rápida de contas para equipes internas.",
    image: "/images/projects/bank1.png",
    tag: ["All", "Web"],
    previewUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7181364631100088320/",
    tecnologias: ["React", "JavaScript", "Node", "Tailwind"],
  },
  {
    id: 8,
    title: "React Notes Web Site",
    descriptionEn: "Creation of notes application",
    descriptionPt: "Criação de aplicação de notas",
    roleEn: "Notes experience focused on usability and simple productivity.",
    rolePt:
      "Experiência de notas com foco em usabilidade e produtividade simples.",
    impactEn:
      "Delivered a lightweight product with a straightforward note-taking flow.",
    impactPt:
      "Entregou um produto leve com fluxo direto para criação de notas.",
    image: "/images/projects/duNotes.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/CalvinSoares/DuNotes",
    previewUrl: "https://du-notes.vercel.app/",
    tecnologias: ["React", "Typescript", "Node", "Tailwind"],
  },
];

export default function ProjectsSection() {
  const [tag, setTag] = useState<ProjectFilter>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const filterLabels: Record<ProjectFilter, string> = {
    All: t("projects.filter_all"),
    Web: t("projects.filter_web"),
    Mobile: t("projects.filter_mobile"),
  };

  const handleTagChange = (newTag: ProjectFilter) => {
    setTag(newTag);
    setIsFilterOpen(false);
  };

  const filteredProjects = projectData.filter((project) =>
    project.tag.includes(tag),
  );
  const featuredProject =
    filteredProjects.find((project) => project.featured) ?? filteredProjects[0];
  const gridProjects = filteredProjects.filter(
    (project) => project.id !== featuredProject?.id,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
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
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="Projects"
      className="min-w-full min-h-screen flex flex-col justify-center bg-[#121212] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticleBackground />
      </div>

      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-700/30 to-indigo-700/20 blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, -30, 0], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-violet-700/20 to-fuchsia-700/30 blur-3xl"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, 30, 0], opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
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
            <span className="text-sm font-medium">
              {t("projects.portfolio_showcase")}
            </span>
          </motion.div>

          <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {t("projects.section_title")}
          </h2>

          <motion.p
            className="text-gray-400 text-center max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("projects.subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative mb-12">
          <div className="flex justify-center items-center">
            <motion.div
              className="hidden md:flex flex-row justify-center items-center gap-3 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ProjectTag
                onClick={() => handleTagChange("All")}
                name={filterLabels.All}
                isSelected={tag === "All"}
              />
              <ProjectTag
                onClick={() => handleTagChange("Web")}
                name={filterLabels.Web}
                isSelected={tag === "Web"}
              />
              <ProjectTag
                onClick={() => handleTagChange("Mobile")}
                name={filterLabels.Mobile}
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
              <span>
                {t("projects.filter_label")}: {filterLabels[tag]}
              </span>
            </motion.button>
          </div>

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
                    {filterLabels.All}
                  </button>
                  <button
                    className={`text-left px-4 py-2 rounded-md ${tag === "Web" ? "bg-[#583ebc] text-white" : "text-white hover:bg-[#2a2a2a]"}`}
                    onClick={() => handleTagChange("Web")}
                  >
                    {filterLabels.Web}
                  </button>
                  <button
                    className={`text-left px-4 py-2 rounded-md ${tag === "Mobile" ? "bg-[#583ebc] text-white" : "text-white hover:bg-[#2a2a2a]"}`}
                    onClick={() => handleTagChange("Mobile")}
                  >
                    {filterLabels.Mobile}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {featuredProject && (
          <motion.div
            className="mb-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[#171717]/85 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[320px] overflow-hidden">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/55 to-transparent" />
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[#583ebc]/30 bg-[#583ebc]/20 px-4 py-1.5 text-sm font-medium text-[#c2b5ff]">
                  <Sparkles size={16} className="animate-pulse" />
                  <span>{t("projects.featured_badge")}</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#a48eff]">
                  {t("projects.featured_title")}
                </p>
                <h3 className="mb-4 text-3xl font-bold text-white">
                  {featuredProject.title}
                </h3>
                <p className="mb-6 text-gray-300 leading-relaxed">
                  {language === "pt"
                    ? featuredProject.descriptionPt
                    : featuredProject.descriptionEn}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400">
                      {t("projects.featured_role")}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-200">
                      {language === "pt"
                        ? featuredProject.rolePt
                        : featuredProject.roleEn}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-400">
                      {t("projects.featured_impact")}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-200">
                      {language === "pt"
                        ? featuredProject.impactPt
                        : featuredProject.impactEn}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredProject.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-[#221a43] px-3 py-1 text-xs text-[#ddd6ff]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {featuredProject.previewUrl && (
                    <Link
                      href={featuredProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#583ebc] px-5 py-3 font-medium text-white transition-colors hover:bg-[#4a32a0]"
                    >
                      {t("projects.visit_website")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                  {featuredProject.gitUrl && (
                    <Link
                      href={featuredProject.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition-colors hover:bg-white/10"
                    >
                      {t("projects.view_source_code")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.45 }}
        >
          <h3 className="text-2xl font-semibold text-white">
            {t("projects.all_projects_title")}
          </h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {gridProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <ProjectCard
                  title={project.title}
                  description={
                    language === "pt"
                      ? project.descriptionPt
                      : project.descriptionEn
                  }
                  role={language === "pt" ? project.rolePt : project.roleEn}
                  imgUrl={project.image}
                  tags={project.tag}
                  gitUrl={project?.gitUrl}
                  previewUrl={project?.previewUrl}
                  tecnologias={project.tecnologias}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
                {t("projects.contact_me")}
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
