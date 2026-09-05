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
import BentoFeatureCard from "../../components/BentoFeatureCard";
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
import { getProjectImages } from "../../lib/projectImages";

type ProjectFilter = "All" | "Web" | "Mobile";
type Project = (typeof projectData)[number];

// Tiered layout for the highlights grid (calm mosaic):
//   row 1 → 1 feature (full width, lg:col-span-6, lg:row-span-2) with sticky text + carousel
//   row 2 → 3 wide cards side by side (lg:col-span-2 each)
//   row 3 → 2 wide cards (lg:col-span-3 each)
//   row 4 → 1 wide + CTA placeholder (handled outside this fn)
//
// Adapts gracefully when the filtered list shrinks — the first card always
// gets the feature treatment, the rest spread out so the row never feels
// half-empty.
type BentoVariant = "feature" | "wide";

interface BentoSlot {
  span: string;
  size: "large" | "medium" | "wide";
  variant: BentoVariant;
}

const bentoSlotFor = (index: number, total: number): BentoSlot => {
  // First card: feature. Always.
  if (index === 0) {
    return {
      span: "lg:col-span-6 lg:row-span-2",
      size: "large",
      variant: "feature",
    };
  }
  // 1 card only (after the feature) — wide.
  if (total === 2) {
    return { span: "lg:col-span-6", size: "wide", variant: "wide" };
  }
  // 2-4 cards total: feature on top, the rest split into one row of 3 (or 2 + center).
  if (total <= 4) {
    return { span: "lg:col-span-2", size: "medium", variant: "wide" };
  }
  // 5-7 cards: 1 feature + row of 3 + row of 2 (or 1).
  // The remainder after the feature fills 3 per row, then 2 per row.
  const positionFromFeature = index - 1; // 0-based among the wide tier
  const isFirstRow = positionFromFeature < 3;
  if (isFirstRow) {
    return { span: "lg:col-span-2", size: "medium", variant: "wide" };
  }
  // Second row + beyond: pair them up (col-span-3 each).
  return { span: "lg:col-span-3", size: "wide", variant: "wide" };
};

const projectData = [
  {
    id: 1,
    highlight: true,
    title: "QuackLinks",
    descriptionEn:
      "A premium link-in-bio platform designed for creators and brands to centralize their digital presence, with deep visual customization, real-time analytics, and integrated monetization tools.",
    descriptionPt:
      "Plataforma de link na bio para criadores e marcas centralizarem sua presença digital, com personalização visual avançada, métricas em tempo real e ferramentas de monetização.",
    roleEn:
      "Engineered the full application, combining an interactive Vue.js interface with a Java 21 and Spring Boot API, covering Spring Security authentication, Stripe payments, and Cloudflare R2 media storage.",
    rolePt:
      "Desenvolvi a solução completa, unindo uma interface interativa em Vue.js a uma API em Java 21 e Spring Boot, com autenticação via Spring Security, pagamentos pelo Stripe e armazenamento no Cloudflare R2.",
    impactEn:
      "Built a scalable foundation for user subscriptions and public profile pages, delivering fast load times and reliable payment processing.",
    impactPt:
      "Estruturei uma base escalável para assinaturas e gestão de perfis públicos, garantindo carregamento rápido das páginas e segurança no processamento financeiro.",
    image: "/images/projects/quacklinks.png",
    images: ["/images/projects/quacklinks.png"],
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
      "An interactive learning platform for software architecture, design patterns, and distributed systems, featuring gamified tracks, quizzes, and a visual architecture simulator.",
    descriptionPt:
      "Plataforma interativa para estudo de arquitetura de software, design patterns e sistemas distribuídos, com jornada gamificada, quizzes e simulador visual de infraestrutura.",
    roleEn:
      "Architected and built the full platform, including 79 in-depth concept guides, 5 interactive graph roadmaps, an architectural request flow simulator with ADR export, and annotated real incident postmortems. Implemented the backend using Next.js 16 App Router, Auth.js v5, Drizzle ORM on Neon Postgres, and Upstash Redis for weekly leagues and leaderboards.",
    rolePt:
      "Arquitetei e construí a plataforma completa, incluindo catálogo de 79 conceitos técnicos, 5 trilhas de roadmaps em grafo, simulador de fluxo de requisições no Construtor de arquitetura e postmortems de incidentes reais. Desenvolvi o backend no Next.js 16 App Router com Auth.js v5, Drizzle ORM sobre Neon Postgres e Upstash Redis para ligas semanais e cache.",
    impactEn:
      "Turned abstract architecture theory into hands-on simulations. The application works offline-first for immediate exploration and synchronizes with a relational backend for XP progression, leagues, and cross-device persistence when authenticated.",
    impactPt:
      "Transformei conceitos complexos de engenharia em aprendizado prático e visual. O sistema opera tanto offline quanto integrado a uma infraestrutura com banco relacional, gamificação com XP e sincronização entre dispositivos.",
    image: "/images/projects/devatlas3.png",
    images: [
      "/images/projects/devatlas3.png",
      "/images/projects/devatlas2.png",
      "/images/projects/devatlas1.png",
      "/images/projects/devatlas.png",
    ],
    hoverImage: "/images/projects/devatlas2.png",
    tag: ["All", "Web"],
    previewUrl: "https://devmappa.vercel.app/",
    tecnologias: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "Drizzle ORM",
      "PostgreSQL",
      "Upstash Redis",
      "Auth.js v5",
      "React Flow",
      "Mermaid",
      "dnd-kit",
      "Shiki",
      "Vitest",
    ],
  },
  {
    id: 2,
    highlight: true,
    title: "PagLemon",
    descriptionEn:
      "A payment platform integrated with the Brazilian PIX ecosystem, supporting dynamic charge generation, instant QR codes, and real-time transaction status updates via webhooks.",
    descriptionPt:
      "Plataforma de pagamentos conectada ao ecossistema PIX, com geração dinâmica de cobranças, emissão de QR Codes e notificações de status em tempo real via webhooks e postbacks.",
    roleEn:
      "Led the architectural evolution of the payment engine, redesigning asynchronous message flows with Redis and Amazon SQS, and managing Kubernetes infrastructure through ArgoCD and automated CI/CD pipelines.",
    rolePt:
      "Liderei a arquitetura e a evolução técnica da solução, redesenhando fluxos assíncronos com Redis e Amazon SQS, e estruturando a infraestrutura em Kubernetes com ArgoCD e CI/CD automatizado.",
    impactEn:
      "Achieved high processing availability, lowered transaction confirmation latency, and streamlined financial reconciliation across all accounts.",
    impactPt:
      "Garanti alta disponibilidade no processamento de pagamentos, reduzindo o tempo de confirmação das transações e facilitando a conciliação financeira das operações.",
    image: "/images/projects/paglemon.png",
    images: ["/images/projects/paglemon.png"],
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
      "A monitoring service that tracks São Paulo's Official Gazette and alerts non-profit organizations by email whenever relevant public funding notices, grants, or tenders are published.",
    descriptionPt:
      "Serviço que monitora diariamente as publicações do Diário Oficial de São Paulo e notifica organizações sociais por e-mail quando editais, chamamentos públicos ou termos de fomento do seu interesse são abertos.",
    roleEn:
      "Built the entire platform using Astro 5 SSR, creating automated scraping and ingestion pipelines with Zod validation, keyword matching algorithms, passwordless magic-link authentication, and scheduled email dispatch.",
    rolePt:
      "Desenvolvi a plataforma completa em Astro 5 SSR, implementando jobs automáticos de coleta de dados com validação Zod, motor de correspondência por palavras-chave, autenticação por magic link e envio imediato de alertas.",
    impactEn:
      "Automated the tedious process of tracking government gazettes, helping grassroots organizations spot grant opportunities well before deadlines.",
    impactPt:
      "Automatizou a varredura de diários oficiais para pequenas entidades, permitindo identificar oportunidades de captação de recursos com antecedência e sem custos.",
    image: "/images/projects/edital-radar.png",
    images: ["/images/projects/edital-radar.png"],
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
    id: 13,
    highlight: true,
    title: "Certidão Zero",
    descriptionEn:
      "A fast public lookup tool for Brazilian corporate registries (CNPJ), consolidating registration status and federal sanctions into a clear overview for due diligence meetings and preliminary audits.",
    descriptionPt:
      "Ferramenta de consulta rápida de CNPJ para ONGs e gestores públicos, reunindo situação cadastral e sanções federais em uma visualização direta para reuniões e checagens preliminares.",
    roleEn:
      "Developed the application using Astro 5 and TypeScript, integrating BrasilAPI lookups with an aggressive caching layer, federal sanctions from the Transparency Portal, and clear source attributions.",
    rolePt:
      "Desenvolvi a aplicação em Astro 5 e TypeScript, integrando consultas à BrasilAPI com camada de cache, dados de sanções do Portal da Transparência e formatação clara das informações públicas com registro de data e fonte.",
    impactEn:
      "Sped up preliminary compliance checks for prospective partners and suppliers, presenting disparate official records in a single instant report without login requirements.",
    impactPt:
      "Agilizou a verificação prévia de conformidade de fornecedores e parceiros, consolidando múltiplos dados públicos em um relatório instantâneo e sem necessidade de cadastro.",
    image: "/images/projects/certidao-zero.png",
    images: ["/images/projects/certidao-zero.png"],
    tag: ["All", "Web"],
    previewUrl: "https://certidao-zero.vercel.app/",
    tecnologias: [
      "Astro 5",
      "TypeScript",
      "Tailwind v4",
      "Zod",
      "BrasilAPI",
      "Portal da Transparência",
      "SSR",
      "Cache",
    ],
  },
  {
    id: 14,
    highlight: true,
    title: "Plenavis",
    descriptionEn:
      "A public transparency portal covering the Brazilian National Congress, organizing legislative proposals, roll-call voting records, and parliamentary allowance expenses in an objective interface.",
    descriptionPt:
      "Portal de transparência pública sobre o Congresso Nacional brasileiro, reunindo projetos de lei, votações nominais e gastos da cota parlamentar de deputados e senadores em uma plataforma neutra.",
    roleEn:
      "Built the solution with Nuxt 4, Vue 3, and Tailwind on the frontend, powered by a Nitro API and Prisma on PostgreSQL. Created automated ETL jobs to ingest open data from both legislative chambers and the electoral court, coupled with interactive Chart.js graphs.",
    rolePt:
      "Desenvolvi a solução com Nuxt 4, Vue 3 e Tailwind no frontend, apoiado por uma API em Nitro e Prisma sobre PostgreSQL. Criei rotinas ETL para coletar e sincronizar dados da Câmara, Senado e TSE, além de gráficos interativos com Chart.js.",
    impactEn:
      "Consolidated millions of open government records into a coherent platform, making it simple to track legislative activity and compare representatives side by side.",
    impactPt:
      "Centralizou milhões de registros públicos em um único ambiente navegável, facilitando o acompanhamento da atividade parlamentar e a comparação direta entre representantes.",
    image: "/images/projects/plenavis.png",
    images: ["/images/projects/plenavis.png"],
    tag: ["All", "Web"],
    previewUrl: "https://plenavis.vercel.app/",
    tecnologias: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Tailwind",
      "Nitro",
      "Prisma",
      "PostgreSQL",
      "Chart.js",
      "ETL Jobs",
    ],
  },
  {
    id: 11,
    highlight: true,
    title: "Prefeitura Quer",
    descriptionEn:
      "A municipal procurement alert service that connects micro and small businesses with local government purchasing notices tailored to the goods and services they supply.",
    descriptionPt:
      "Serviço de alertas de compras públicas municipais, conectando micro e pequenos empreendedores a editais e dispensas de licitação alinhados aos produtos e serviços que oferecem.",
    roleEn:
      "Developed the full-stack platform using Next.js 15, tRPC, TypeScript, and Drizzle ORM with PostgreSQL, featuring passwordless magic-link onboarding, preference filters, and automated notification pipelines.",
    rolePt:
      "Desenvolvi a plataforma full stack utilizando Next.js 15, tRPC, TypeScript e Drizzle ORM sobre PostgreSQL, incluindo fluxos de cadastro por magic link, gestão de categorias comerciais e rotinas de triagem e envio de e-mails.",
    impactEn:
      "Connected small local suppliers with relevant municipal contracting opportunities, delivering actionable alerts in time for bid preparation.",
    impactPt:
      "Aproximou pequenos fornecedores de contratos públicos da sua região, enviando notificações diretas e no prazo para participação nos processos de compra.",
    image: "/images/projects/prefeituraquer.png",
    images: ["/images/projects/prefeituraquer.png"],
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
      "A comprehensive financial management platform providing cash flow tracking, accounts payable/receivable, bank reconciliation, and expense analytics.",
    descriptionPt:
      "Sistema web para gestão financeira empresarial, com controle de contas a pagar e receber, conciliação bancária, fluxo de caixa e relatórios analíticos de despesas.",
    roleEn:
      "Handled full-stack development with Next.js, React, and TypeScript, building interactive analytics with Recharts, reusable interface components, and API routes handling business calculations and balance consolidation.",
    rolePt:
      "Atuei no desenvolvimento full stack com Next.js, React e TypeScript, criando os dashboards financeiros com Recharts, componentes modulares de interface e rotas de API para regras de negócio e consolidação de saldos.",
    impactEn:
      "Centralized financial operations for the business, offering clear insights into cash reserves, overdue payments, and budget forecasts.",
    impactPt:
      "Centralizou o controle operacional das contas da empresa, proporcionando relatórios claros sobre saúde financeira, contas atrasadas e previsão orçamentária.",
    image: "/images/projects/financeiro.png",
    images: ["/images/projects/financeiro.png"],
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
      "An AI-powered culinary platform generating tailored recipes from available pantry ingredients, featuring meal planning, community discussions, and cross-platform mobile access.",
    descriptionPt:
      "Plataforma culinária com inteligência artificial para geração personalizada de receitas a partir de ingredientes disponíveis, com planejamento de cardápio, comunidade e aplicativo mobile.",
    roleEn:
      "Built the Next.js web application and the React Native (Expo) mobile client, backed by a NestJS API with PostgreSQL and Redis, integrating Stripe subscription billing and OpenAI APIs.",
    rolePt:
      "Desenvolvi a interface web em Next.js e o aplicativo mobile em React Native com Expo, integrando ambos a uma API em NestJS, PostgreSQL e Redis, com pagamentos via Stripe e geração de conteúdo via API da OpenAI.",
    impactEn:
      "Delivered a responsive cross-platform experience with fast AI generation times, multilingual support, and seamless monetization workflows.",
    impactPt:
      "Criei uma experiência fluida e sincronizada entre web e mobile, com respostas de IA rápidas, suporte a múltiplos idiomas e planos de assinatura integrados.",
    image: "/images/projects/ichef-web.png",
    images: ["/images/projects/ichef-web.png", "/images/projects/ichef24.png"],
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
    descriptionEn:
      "Operations dashboard for real-time fleet monitoring and delivery logistics management.",
    descriptionPt:
      "Painel para monitoramento e gestão operacional de frotas e entregas em tempo real.",
    roleEn:
      "Engineered the React and TypeScript UI connected to Node.js and MongoDB endpoints, prioritizing clear metrics and dispatch visibility.",
    rolePt:
      "Desenvolvi a interface do dashboard em React e TypeScript integrada a serviços em Node.js e MongoDB, com foco em métricas operacionais e status de rotas.",
    impactEn:
      "Streamlined daily fleet tracking and sped up operational response times for delayed dispatches.",
    impactPt:
      "Otimizou o acompanhamento diário de frotas e facilitou a resolução rápida de pendências na distribuição de cargas.",
    image: "/images/projects/logistic.png",
    images: ["/images/projects/logistic.png"],
    tag: ["All", "Web"],
    gitUrl: "https://github.com/CalvinSoares/logistic-system",
    previewUrl:
      "https://www.linkedin.com/posts/calvinsoares_eae-rede-tranquilos-hoje-vim-divulgar-activity-7262563262469210113-hd2L?utm_source=share&utm_medium=member_desktop",
    tecnologias: ["React", "TypeScript", "Node", "Tailwind", "MongoDB"],
  },
  {
    id: 6,
    title: "Search Game (freelancer)",
    descriptionEn:
      "Interactive mobile word search game with dynamic grid generation and multiple difficulty levels.",
    descriptionPt:
      "Jogo mobile de caça-palavras interativo com geração procedural de tabuleiros e múltiplos níveis de dificuldade.",
    roleEn:
      "Developed the mobile app in React Native with Styled Components for a freelance client, implementing puzzle logic, touch gestures, and animations.",
    rolePt:
      "Desenvolvi o aplicativo em React Native com Styled Components para cliente freelance, cuidando da lógica do jogo, animações e responsividade em diferentes telas.",
    impactEn:
      "Successfully launched on the Google Play Store, offering smooth gameplay across various Android devices.",
    impactPt:
      "Publicado na Google Play Store, entregando uma experiência de jogo fluida e sem travamentos para os usuários.",
    image: "/images/projects/searchGame.png",
    images: ["/images/projects/searchGame.png"],
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/CalvinSoares/word-search-game",
    previewUrl:
      "https://play.google.com/store/apps/details?id=wordl.searc.game&pcampaignid=web_share",
    tecnologias: ["React-Native", "Javascript", "Style Components"],
  },
  {
    id: 7,
    title: "Dashboard Page",
    descriptionEn:
      "Analytics dashboard interface designed for visual exploration and management of business datasets.",
    descriptionPt:
      "Interface analítica para visualização gráfica e gerenciamento de grandes volumes de dados de negócio.",
    roleEn:
      "Built the Next.js and Tailwind CSS frontend with interactive Apache ECharts visualizations, connected to a Node.js and MongoDB backend.",
    rolePt:
      "Construí a aplicação frontend em Next.js e Tailwind CSS integrada a gráficos interativos com Apache ECharts e backend em Node.js com MongoDB.",
    impactEn:
      "Improved data accessibility with fast render times and intuitive interactive charts.",
    impactPt:
      "Permitiu análise ágil de indicadores comerciais por meio de visualizações interativas e filtros rápidos.",
    image: "/images/projects/dashboard.png",
    images: ["/images/projects/dashboard.png"],
    tag: ["All", "Web"],
    gitUrl: "https://github.com/CalvinSoares/dashboardEcharts",
    previewUrl: "https://dashboard-echarts.vercel.app/",
    tecnologias: ["Next", "TypeScript", "Node", "Tailwind", "MongoDB"],
  },
  {
    id: 8,
    title: "Banco Bet",
    descriptionEn:
      "Internal administrative portal for managing affiliate accounts and verifying banking transactions.",
    descriptionPt:
      "Sistema administrativo interno para gestão bancária e conferência de repasses a contas de afiliados.",
    roleEn:
      "Developed the React and Tailwind CSS frontend, implementing dynamic data tables, transaction auditing, and internal API integrations.",
    rolePt:
      "Desenvolvi a interface web em React e Tailwind CSS, implementando tabelas dinâmicas, validação de transações e integração com APIs internas.",
    impactEn:
      "Accelerated back-office review workflows for financial settlements and partner account tracking.",
    impactPt:
      "Agilizou a rotina das equipes operacionais no controle e liquidação de repasses financeiros.",
    image: "/images/projects/bank1.png",
    images: ["/images/projects/bank1.png"],
    tag: ["All", "Web"],
    previewUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7181364631100088320/",
    tecnologias: ["React", "JavaScript", "Node", "Tailwind"],
  },
  {
    id: 9,
    title: "React Notes Web Site",
    descriptionEn:
      "A clean web application for capturing notes and ideas, featuring instant search, tag organization, and persistent storage.",
    descriptionPt:
      "Aplicação web para organização de notas e ideias, com suporte a busca rápida, marcação por tags e persistência segura.",
    roleEn:
      "Built the application using React, TypeScript, and Tailwind CSS backed by Node.js, emphasizing clean ergonomics and minimal latency.",
    rolePt:
      "Desenvolvi o frontend em React, TypeScript e Tailwind CSS integrado a serviços Node.js, com foco em simplicidade de uso e resposta imediata.",
    impactEn:
      "Delivered a lightweight, distraction-free tool for drafting and organizing daily technical notes.",
    impactPt:
      "Ofereceu uma ferramenta leve e direta para criação e consulta de notas sem distrações.",
    image: "/images/projects/duNotes.png",
    images: ["/images/projects/duNotes.png"],
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

              <div className="grid grid-cols-1 gap-5 lg:auto-rows-[minmax(260px,auto)] lg:grid-cols-6">
                {highlightProjects.map((project, index) => {
                  const slot = bentoSlotFor(index, highlightProjects.length);
                  const description =
                    language === "pt"
                      ? project.descriptionPt
                      : project.descriptionEn;
                  const sharedProps = {
                    title: project.title,
                    description,
                    imgUrl: project.image,
                    images: getProjectImages(project),
                    hoverImage: project.hoverImage,
                    tags: project.tag,
                    gitUrl: project.gitUrl,
                    previewUrl: project.previewUrl,
                    demoUrl: project.demoUrl,
                    tecnologias: project.tecnologias,
                    onDetails: () => setSelectedProject(project),
                  };
                  return (
                    <div
                      key={`${tag}-${project.id}`}
                      className={`${slot.span} ${
                        index === 0 ? "min-h-[520px]" : ""
                      }`}
                    >
                      {slot.variant === "feature" ? (
                        <BentoFeatureCard {...sharedProps} />
                      ) : (
                        <BentoCard {...sharedProps} size={slot.size} />
                      )}
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
                  images={getProjectImages(project)}
                  hoverImage={project.hoverImage}
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
          images: selectedProject ? getProjectImages(selectedProject) : [],
          gitUrl: selectedProject?.gitUrl,
          previewUrl: selectedProject?.previewUrl,
          demoUrl: selectedProject?.demoUrl,
          tecnologias: selectedProject?.tecnologias ?? [],
        }}
      />
    </section>
  );
}
