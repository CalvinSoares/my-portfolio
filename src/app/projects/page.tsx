"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Header from "../../components/Header";
import ProjectTag from "../../components/ProjectTag";
import BentoCard from "../../components/BentoCard";
import CompactProjectCard from "../../components/CompactProjectCard";
import ProjectDetailsModal from "../../components/ProjectDetailsModal";
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
type Project = (typeof projectData)[number];
type BentoSlot = {
  span: string;
  size: "large" | "medium" | "wide";
};

// Mosaic pattern for the highlights tier: one hero cell, two stacked medium
// cells beside it, then wide cells below. Adapts when filters shrink the list.
const bentoSlotFor = (index: number, total: number): BentoSlot => {
  if (total === 1) return { span: "lg:col-span-6", size: "large" };
  if (total === 2) return { span: "lg:col-span-3", size: "wide" };
  const pattern: BentoSlot[] = [
    { span: "lg:col-span-4 lg:row-span-2", size: "large" },
    { span: "lg:col-span-2", size: "medium" },
    { span: "lg:col-span-2", size: "medium" },
    { span: "lg:col-span-3", size: "wide" },
    { span: "lg:col-span-3", size: "wide" },
  ];
  return pattern[index % pattern.length];
};

const projectData = [
  {
    id: 1,
    highlight: true,
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
    id: 10,
    highlight: true,
    title: "DevMappa",
    descriptionEn:
      "A front-only study and visualization system for design patterns, principles and software architecture — lean roadmaps, richly illustrated concept entries and an interactive architecture playground.",
    descriptionPt:
      "Um sistema front-only de estudo e visualização de design patterns, princípios e arquitetura de software — roadmaps enxutos, verbetes ilustrados e um playground de arquitetura interativo.",
    roleEn:
      "Designed and built the product end-to-end: 33 typed concept entries (the 23 GoF patterns, SOLID, CQS and 4 architecture styles) with TL;DR, navigable layers, real use cases and pitfalls; 4 markable roadmaps with measured bezier connectors; and a 'Constructor' playground where users drag layers, patterns and technologies while an engine explains each choice, suggests the next step and simulates the request flow, including failure scenarios.",
    rolePt:
      "Concebi e construí o produto de ponta a ponta: 33 verbetes tipados (os 23 padrões GoF, SOLID, CQS e 4 estilos de arquitetura) com TL;DR, camadas navegáveis, casos de uso reais e armadilhas; 4 roadmaps marcáveis com conectores bezier medidos; e um 'Construtor' onde o usuário arrasta camadas, padrões e tecnologias enquanto um motor explica cada escolha, sugere o próximo passo e simula a requisição, incluindo cenários de falha.",
    impactEn:
      "Turned abstract architecture theory into something you can see and manipulate — three complementary views of the same idea (concept, roadmap, playground). No backend: all content is typed in the repo and validated by the compiler, with user progress persisted in localStorage and shareable via URL.",
    impactPt:
      "Transformou teoria abstrata de arquitetura em algo visível e manipulável — três visões complementares da mesma ideia (conceito, roadmap, playground). Sem backend: todo o conteúdo é tipado no repositório e validado pelo compilador, com progresso salvo em localStorage e compartilhável por URL.",
    image: "/images/projects/devatlas.png",
    tag: ["All", "Web"],
    previewUrl: "https://devmappa.vercel.app/",
    tecnologias: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "React Flow",
      "Mermaid",
      "Shiki",
      "dnd-kit",
      "next-themes",
      "Radix",
      "SSG",
    ],
  },
  {
    id: 2,
    highlight: true,
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
    id: 12,
    highlight: true,
    title: "Edital Radar",
    descriptionEn:
      "A daily alert service for NGOs: it reads São Paulo’s Official Gazette every business day and emails organizations when a matching call, funding notice or collaboration term is published — with the excerpt and source link.",
    descriptionPt:
      "Um alerta diário para ONGs: lê o Diário Oficial de SP todo dia útil e avisa por e-mail quando sai chamamento, fomento ou termo compatível com a entidade — com o trecho e o link da publicação.",
    roleEn:
      "Designed and built the product end-to-end: Astro SSR landing and account flows, DOE-SP ingestion job with Zod validation, keyword/profile matching, magic-link auth, admin tooling and same-day email alerts — prioritizing accuracy and punctuality over jargon-heavy UI.",
    rolePt:
      "Concebi e construí o produto de ponta a ponta: landing e fluxos de conta em Astro SSR, job diário de coleta do DOE-SP com validação Zod, match por palavra-chave/perfil, autenticação por magic link, painel admin e alertas por e-mail no mesmo dia — priorizando precisão e pontualidade, sem jargão de Diário Oficial na UI.",
    impactEn:
      "Gives small NGOs a free, no-password signal so funding opportunities stop being discovered late on WhatsApp — after the deadline.",
    impactPt:
      "Dá a ONGs pequenas um sinal grátis e sem senha para que editais de fomento deixem de ser descobertos atrasado no WhatsApp — depois do prazo.",
    image: "/images/projects/edital-radar.png",
    tag: ["All", "Web"],
    previewUrl: "https://edital-radar.vercel.app/",
    tecnologias: [
      "Astro 5",
      "TypeScript",
      "Tailwind v4",
      "Drizzle ORM",
      "PostgreSQL",
      "Zod",
      "Astro Actions",
      "Cron Jobs",
      "Magic Link Auth",
    ],
  },
  {
    id: 11,
    highlight: true,
    title: "Prefeitura Quer",
    descriptionEn:
      "A notification service that watches city-hall procurement notices and alerts small businesses by email when a public purchase matches what they sell — plain language, no legalese, no card required.",
    descriptionPt:
      "Um serviço de avisos que acompanha anúncios de compras de prefeituras e avisa negócios pequenos por e-mail quando aparece algo que combina com o que eles vendem — em português claro, sem juridiquês e sem cartão.",
    roleEn:
      "Designed and built the product end-to-end: public landing and signup with magic-link auth, subscriber preferences (what they sell, where, and capacity), admin tooling, and the pipeline that reads official notices and sends short, actionable alerts.",
    rolePt:
      "Concebi e construí o produto de ponta a ponta: landing e cadastro públicos com autenticação por magic link, preferências do assinante (o que vende, onde e capacidade), painel admin e o fluxo que lê os anúncios oficiais e dispara avisos curtos e acionáveis.",
    impactEn:
      "Turns opaque public procurement into a daily signal for micro and small businesses — they learn about reserved opportunities in time to bid, without having to monitor government portals themselves.",
    impactPt:
      "Transforma compras públicas opacas em um sinal diário para micro e pequenas empresas — elas ficam sabendo de oportunidades reservadas a tempo de disputar, sem precisar vigiar portais de governo.",
    image: "/images/projects/prefeituraquer.png",
    tag: ["All", "Web"],
    previewUrl: "https://prefeitura-quer.vercel.app/",
    tecnologias: [
      "Next.js 15",
      "TypeScript",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "TanStack Query",
      "Zod",
      "Vitest",
      "Magic Link Auth",
    ],
  },
  {
    id: 3,
    highlight: true,
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
    demoUrl: "https://finance-demo-jade.vercel.app/",
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
    highlight: true,
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const filterLabels: Record<ProjectFilter, string> = {
    All: t("projects.filter_all"),
    Web: t("projects.filter_web"),
    Mobile: t("projects.filter_mobile"),
  };

  // Hydrate the filter from the URL on mount so a shared/reloaded link keeps
  // its selection (e.g. /projects?filter=Mobile).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("filter");
    if (fromUrl === "Web" || fromUrl === "Mobile" || fromUrl === "All") {
      setTag(fromUrl);
    }
  }, []);

  const handleTagChange = (newTag: ProjectFilter) => {
    setTag(newTag);
    setIsFilterOpen(false);

    const params = new URLSearchParams(window.location.search);
    if (newTag === "All") {
      params.delete("filter");
    } else {
      params.set("filter", newTag);
    }
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  };

  const filteredProjects = projectData.filter((project) =>
    project.tag.includes(tag),
  );
  const highlightProjects = filteredProjects.filter(
    (project) => project.highlight,
  );
  const otherProjects = filteredProjects.filter(
    (project) => !project.highlight,
  );

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

  const { scrollY } = useScroll();

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

        <motion.div
          key={tag}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {highlightProjects.length > 0 && (
            <div className="mx-auto max-w-6xl">
              <motion.div
                className="mb-6"
                variants={sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <h3 className="text-2xl font-semibold text-white">
                  {t("projects.highlights_title")}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-gray-400">
                  {t("projects.highlights_subtitle")}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-5 lg:auto-rows-[minmax(250px,auto)] lg:grid-cols-6">
                {highlightProjects.map((project, index) => {
                  const slot = bentoSlotFor(index, highlightProjects.length);
                  return (
                    <div key={`${tag}-${project.id}`} className={slot.span}>
                      <BentoCard
                        title={project.title}
                        description={
                          language === "pt"
                            ? project.descriptionPt
                            : project.descriptionEn
                        }
                        imgUrl={project.image}
                        tags={project.tag}
                        gitUrl={project.gitUrl}
                        previewUrl={project.previewUrl}
                        demoUrl={project.demoUrl}
                        tecnologias={project.tecnologias}
                        size={slot.size}
                        onDetails={() => setSelectedProject(project)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mx-auto mt-16 max-w-6xl">
            <motion.div
              className="mb-6"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-white">
                {t("projects.all_projects_title")}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">
                {t("projects.other_projects_subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <CompactProjectCard
                  key={`${tag}-${project.id}`}
                  title={project.title}
                  description={
                    language === "pt"
                      ? project.descriptionPt
                      : project.descriptionEn
                  }
                  imgUrl={project.image}
                  tags={project.tag}
                  gitUrl={project.gitUrl}
                  previewUrl={project.previewUrl}
                  tecnologias={project.tecnologias}
                  onDetails={() => setSelectedProject(project)}
                />
              ))}

              <motion.div
                key={`cta-${tag}`}
                className="flex h-full min-h-[300px] flex-col justify-between rounded-2xl border border-dashed border-[#583ebc]/40 bg-[#141416]/85 p-5 [background-image:radial-gradient(circle_at_top_left,rgba(88,62,188,0.16),transparent_55%)]"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : { y: [0, -6, 0], opacity: [0.75, 1, 0.75] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 4.5,
                      ease: "easeInOut",
                    }}
                    className="inline-flex"
                  >
                    <Gem className="h-8 w-8 text-[#a48eff]" />
                  </motion.div>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    {t("projects.cta_card_badge")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {t("projects.cta_card_title")}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-300">
                    {t("projects.cta_card_subtitle")}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-gray-400">
                    {t("projects.cta_card_description")}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="https://github.com/CalvinSoares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </Link>
                  <Link
                    href="/Contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-white/90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {t("projects.contact_me")}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

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

      <ProjectDetailsModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={{
          title: selectedProject?.title ?? "",
          description:
            (language === "pt"
              ? selectedProject?.descriptionPt
              : selectedProject?.descriptionEn) ?? "",
          role:
            language === "pt"
              ? selectedProject?.rolePt
              : selectedProject?.roleEn,
          impact:
            language === "pt"
              ? selectedProject?.impactPt
              : selectedProject?.impactEn,
          imgUrl: selectedProject?.image ?? "",
          gitUrl: selectedProject?.gitUrl,
          previewUrl: selectedProject?.previewUrl,
          demoUrl: selectedProject?.demoUrl,
          tecnologias: selectedProject?.tecnologias ?? [],
        }}
      />
    </section>
  );
}
