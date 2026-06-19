"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import ProjectTag from "../../components/ProjectTag";
import ProjectCard from "../../components/ProjectCard";
import {
  ArrowUpRight,
  Filter,
  Gem,
  Github,
  MessageCircle,
  Sparkles,
} from "lucide-react";
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
    previewUrl: "https://quacklinks.com.br/",
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
    title: "MCC Financeiro",
    descriptionEn:
      "A full-stack financial management platform built to centralize cash flow, accounts, categories, transactions and operational insights through a modern dashboard, responsive workflows and a structured backend API.",
    descriptionPt:
      "Uma plataforma full stack de gestão financeira criada para centralizar fluxo de caixa, contas, categorias, transações e indicadores operacionais por meio de um dashboard moderno, fluxos responsivos e uma API backend estruturada.",
    roleEn:
      "Worked across both front-end and back-end, building the dashboard, financial management flows, authentication integration, theme system, reusable UI components and the API structure responsible for business rules, data access and financial summaries.",
    rolePt:
      "Atuei tanto no front-end quanto no back-end, construindo o dashboard, os fluxos de gestão financeira, a integração de autenticação, o sistema de temas, componentes reutilizáveis de UI e a estrutura da API responsável por regras de negócio, acesso aos dados e consolidação dos resumos financeiros.",
    impactEn:
      "Delivered a stronger full-stack foundation for the financial product, improving daily operation visibility with secure data flows, organized domain logic and clear monitoring of balances, overdue items, recent transactions and category-based expense analysis.",
    impactPt:
      "Entregou uma base full stack mais sólida para o produto financeiro, melhorando a visibilidade da operação com fluxos seguros de dados, lógica de domínio organizada e acompanhamento claro de saldos, atrasos, lançamentos recentes e análise de despesas por categoria.",
    image: "/images/projects/financeiro.png",
    tag: ["All", "Web"],
    previewUrl: "https://finance.paglemon.org",
    tecnologias: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Context API",
      "Node.js",
      "REST API",
      "Authentication",
      "Responsive Design",
      "Dark/Light Theme",
    ],
  },
  {
    id: 4,
    featured: true,
    title: "iChef24",
    descriptionEn:
      "An AI-powered recipe SaaS that combines personalized recipe generation, recipe management, subscription plans, favorites, history and a culinary community through integrated web, mobile and backend experiences.",
    descriptionPt:
      "Um SaaS de receitas com IA que combina geracao personalizada de receitas, gerenciamento de receitas, planos por assinatura, favoritos, historico e comunidade culinaria em uma experiencia integrada entre web, mobile e backend.",
    roleEn:
      "Worked across the full stack, building the web experience, mobile app flows and backend API architecture responsible for authentication, recipe generation with AI, plan control, payments, community features and real-time updates.",
    rolePt:
      "Atuei de ponta a ponta no produto, construindo a experiencia web, os fluxos do app mobile e a arquitetura da API backend responsavel por autenticacao, geracao de receitas com IA, controle de planos, pagamentos, recursos de comunidade e atualizacoes em tempo real.",
    impactEn:
      "Delivered a stronger product foundation for an AI culinary platform, improving how users create, save and share recipes while supporting subscription monetization, multilingual access and scalable integrations for payments, image handling and user engagement.",
    impactPt:
      "Entregou uma base mais solida para uma plataforma culinaria com IA, melhorando a forma como usuarios criam, salvam e compartilham receitas, ao mesmo tempo em que sustenta monetizacao por assinatura, acesso multilingue e integracoes escalaveis para pagamentos, imagens e engajamento.",
    image: "/images/projects/ichef-web.png",
    tag: ["All", "Web", "Mobile"],
    previewUrl: "https://ichef24.com/",
    tecnologias: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "OpenAI",
      "Socket.IO",
      "Tailwind CSS",
      "Expo / React Native",
    ],
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
  const [showStickyTabs, setShowStickyTabs] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const featuredRef = useRef<HTMLDivElement>(null);
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
    hidden: { y: 56, opacity: 0, scale: 0.96, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 110, damping: 16 },
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

  const sectionReveal = {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const { scrollY } = useScroll();
  const featuredImageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-18, 18],
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowStickyTabs(latest > 260);
  });

  return (
    <section
      id="Projects"
      className="relative flex min-h-screen min-w-full flex-col justify-center overflow-hidden bg-[#121212]"
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

      <AnimatePresence>
        {showStickyTabs && (
          <motion.aside
            className="fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 xl:block"
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0f0f10]/82 p-2 backdrop-blur-xl shadow-2xl shadow-black/30">
              <div className="flex flex-col gap-2">
                <ProjectTag
                  onClick={() => handleTagChange("All")}
                  name={filterLabels.All}
                  isSelected={tag === "All"}
                  className="w-24 justify-center text-[13px]"
                />
                <ProjectTag
                  onClick={() => handleTagChange("Web")}
                  name={filterLabels.Web}
                  isSelected={tag === "Web"}
                  className="w-24 justify-center text-[13px]"
                />
                <ProjectTag
                  onClick={() => handleTagChange("Mobile")}
                  name={filterLabels.Mobile}
                  isSelected={tag === "Mobile"}
                  className="w-24 justify-center text-[13px]"
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6 md:p-12" ref={ref}>
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
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
            className="mx-auto max-w-2xl text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t("projects.subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative mx-auto mb-14 max-w-6xl">
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {(!showStickyTabs || typeof window === "undefined") && (
                <motion.div
                  key="top-tabs"
                  className="hidden rounded-full border border-white/10 bg-[#101011]/75 p-1.5 md:flex md:items-center md:justify-center md:gap-1.5"
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectTag
                    onClick={() => handleTagChange("All")}
                    name={filterLabels.All}
                    isSelected={tag === "All"}
                    className="min-w-[84px]"
                  />
                  <ProjectTag
                    onClick={() => handleTagChange("Web")}
                    name={filterLabels.Web}
                    isSelected={tag === "Web"}
                    className="min-w-[84px]"
                  />
                  <ProjectTag
                    onClick={() => handleTagChange("Mobile")}
                    name={filterLabels.Mobile}
                    isSelected={tag === "Mobile"}
                    className="min-w-[84px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className="flex items-center gap-2 rounded-full border border-[#583ebc] bg-[#1e1e1e]/80 px-4 py-2 text-white backdrop-blur-sm md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
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
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#583ebc] bg-[#1e1e1e]/90 backdrop-blur-md md:hidden"
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

        <AnimatePresence mode="wait">
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            {featuredProject && (
              <motion.div
                ref={featuredRef}
                className="mx-auto mb-16 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#171717]/85 backdrop-blur-md"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
              >
                <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                  <motion.div
                    className="relative min-h-[320px] overflow-hidden"
                    initial={{ opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ y: featuredImageY }}
                    >
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        fill
                        className="object-cover scale-[1.06]"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/55 to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[#583ebc]/20 bg-[#583ebc]/10 px-4 py-1.5 text-sm font-medium text-white/85">
                      <Sparkles size={16} className="animate-pulse" />
                      <span>{t("projects.featured_badge")}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-6 md:p-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.16,
                        },
                      },
                    }}
                  >
                    <motion.p
                      className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-400"
                      variants={itemVariants}
                    >
                      {t("projects.featured_title")}
                    </motion.p>
                    <motion.h3
                      className="mb-4 text-3xl font-bold text-white"
                      variants={itemVariants}
                    >
                      {featuredProject.title}
                    </motion.h3>
                    <motion.p
                      className="mb-6 text-gray-300 leading-relaxed"
                      variants={itemVariants}
                    >
                      {language === "pt"
                        ? featuredProject.descriptionPt
                        : featuredProject.descriptionEn}
                    </motion.p>

                    <motion.div
                      className="grid gap-6 border-y border-white/10 py-6 md:grid-cols-2"
                      variants={itemVariants}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                          {t("projects.featured_role")}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-200">
                          {language === "pt"
                            ? featuredProject.rolePt
                            : featuredProject.roleEn}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                          {t("projects.featured_impact")}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-200">
                          {language === "pt"
                            ? featuredProject.impactPt
                            : featuredProject.impactEn}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="mt-6 flex flex-wrap gap-2"
                      variants={itemVariants}
                    >
                      {featuredProject.tecnologias.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      className="mt-8 flex flex-wrap gap-3"
                      variants={itemVariants}
                    >
                      {featuredProject.previewUrl && (
                        <Link
                          href={featuredProject.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#583ebc] px-5 py-3 font-medium text-white transition-colors hover:bg-[#4a32a0]"
                        >
                          {t("projects.website")}
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
                          {t("projects.code")}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="mx-auto mb-6 flex max-w-6xl items-end justify-between gap-6"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {t("projects.all_projects_title")}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-gray-400">
                  {t("projects.featured_description")}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
            >
              {gridProjects.map((project, index) => (
                <motion.div
                  key={`${tag}-${project.id}`}
                  layout
                  initial={{
                    opacity: 0,
                    x: shouldReduceMotion ? 0 : index % 2 === 0 ? -42 : 42,
                    y: 28,
                    scale: 0.985,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: shouldReduceMotion ? 0 : index % 2 === 0 ? -26 : 26,
                    y: 16,
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.48,
                    delay: shouldReduceMotion ? 0 : 0.04 + index * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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

              <motion.div
                key={`cta-${tag}`}
                layout
                initial={{
                  opacity: 0,
                  x: shouldReduceMotion
                    ? 0
                    : gridProjects.length % 2 === 0
                      ? -42
                      : 42,
                  y: 28,
                  scale: 0.985,
                }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: shouldReduceMotion
                    ? 0
                    : gridProjects.length % 2 === 0
                      ? -26
                      : 26,
                  y: 16,
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.48,
                  delay: shouldReduceMotion
                    ? 0
                    : 0.08 + gridProjects.length * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#151515]/90 backdrop-blur-md">
                  <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#171717] via-[#111111] to-[#090909]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(88,62,188,0.18),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent)]" />
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { y: [0, -10, 0], opacity: [0.7, 1, 0.7] }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 4.5,
                        ease: "easeInOut",
                      }}
                      className="relative z-10 text-center"
                    >
                      <Gem className="mx-auto h-10 w-10 text-white/70" />
                      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
                        {t("projects.cta_card_badge")}
                      </p>
                    </motion.div>
                  </div>

                  <div className="flex flex-grow flex-col p-6 md:p-7">
                    <h3 className="text-3xl font-semibold text-white">
                      {t("projects.cta_card_title")}
                    </h3>
                    <p className="mt-3 text-lg font-medium text-gray-300">
                      {t("projects.cta_card_subtitle")}
                    </p>
                    <p className="mt-5 flex-grow text-[15px] leading-relaxed text-gray-300">
                      {t("projects.cta_card_description")}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {[
                        t("hero.metrics_delivery_value"),
                        t("hero.metrics_stack_value"),
                        t("hero.metrics_experience_value"),
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="https://github.com/CalvinSoares"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </Link>
                      <Link
                        href="/Contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {t("projects.contact_me")}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-10 text-center"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="mb-6 text-gray-300">{t("contact.description")}</p>
          <Link
            href="/Contact"
            className="group relative mt-3 inline-flex items-center justify-center overflow-hidden rounded-full border border-[#583ebc]/40 bg-[#171717]/70 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#583ebc]/10"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2">
              {t("projects.contact_me")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
