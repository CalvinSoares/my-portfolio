"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

interface ProjectCardProps {
  title: string;
  description: string;
  role?: string;
  imgUrl: string;
  tags: string[];
  gitUrl?: string;
  previewUrl?: string;
  tecnologias: string[];
}

export default function ProjectCard({
  title,
  description,
  role,
  imgUrl,
  tags,
  gitUrl,
  previewUrl,
  tecnologias,
}: ProjectCardProps) {
  const { t } = useLanguage();
  const [isRoleExpanded, setIsRoleExpanded] = useState(false);
  const summarizeRole = (text: string) => {
    const predefined = text
      .replace(
        "Atuei de ponta a ponta no produto, combinando um front-end altamente personalizável com um backend em Spring Boot para autenticação, segurança, pagamentos e integrações centrais.",
        "Atuei de ponta a ponta no produto com front-end altamente personalizável e backend em Spring Boot.",
      )
      .replace(
        "Worked across the product, combining a customizable front-end with a Spring Boot backend for authentication, security, payments and core integrations.",
        "Worked across the product with a customizable front-end and Spring Boot backend.",
      );

    if (predefined !== text) return predefined;

    const firstSentence = text.split(". ")[0].trim();
    if (firstSentence.length <= 204) {
      return firstSentence;
    }

    const firstChunks = text.split(",").slice(0, 2).join(",").trim();
    return firstChunks;
  };

  const summarizeDescription = (text: string) => {
    const predefined = text
      .replace(
        "Uma plataforma premium de link na bio para criadores e marcas centralizarem sua presença digital com personalização, analytics e recursos prontos para monetização.",
        "Plataforma premium de link na bio para criadores e marcas, com personalização, analytics e recursos prontos para monetização.",
      )
      .replace(
        "A premium link-in-bio platform built for creators and brands to centralize their digital presence with customization, analytics and monetization-ready features.",
        "Premium link-in-bio platform for creators and brands, with customization, analytics and monetization-ready features.",
      );

    if (predefined !== text) return predefined;

    const firstSentence = text.split(". ")[0].trim();
    if (firstSentence.length <= 240) {
      return firstSentence;
    }

    const firstChunks = text.split(",").slice(0, 3).join(",").trim();
    return firstChunks;
  };

  const compactRole = useMemo(
    () => (role ? summarizeRole(role) : undefined),
    [role],
  );
  const compactDescription = useMemo(
    () => summarizeDescription(description),
    [description],
  );
  const hasExpandableRole = Boolean(role && compactRole !== role);
  const displayedRole =
    isRoleExpanded && role && hasExpandableRole ? role : compactRole;
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#171717]/82 backdrop-blur-md transition-colors duration-300 hover:border-white/15"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 210, damping: 22 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={contentVariants}
    >
      <motion.div className="relative overflow-hidden" variants={itemVariants}>
        <Image
          src={imgUrl || "/placeholder.svg"}
          alt={title}
          width={800}
          height={520}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {tags
            .filter((tag) => tag !== "All")
            .map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
        </div>
      </motion.div>

      <div className="flex flex-grow flex-col p-5 md:p-6">
        <motion.h3
          className="text-[1.35rem] font-semibold text-white"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
        {displayedRole && (
          <>
            <motion.p
              className="mt-3 text-sm leading-relaxed text-gray-400"
              variants={itemVariants}
            >
              {displayedRole}
            </motion.p>

            {hasExpandableRole && (
              <motion.button
                type="button"
                className="mt-2 inline-flex w-fit items-center text-sm font-medium text-[#c2b5ff] transition-colors duration-200 hover:text-white"
                onClick={() => setIsRoleExpanded((current) => !current)}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
              >
                {isRoleExpanded ? "Ver menos" : "Ver mais"}
              </motion.button>
            )}
          </>
        )}
        <motion.p
          className="mt-4 flex-grow text-sm leading-relaxed text-gray-300"
          variants={itemVariants}
        >
          {compactDescription}
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap gap-2"
          variants={itemVariants}
        >
          {tecnologias.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-7 flex flex-wrap gap-2.5"
          variants={itemVariants}
        >
          {previewUrl && (
            <motion.a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/button inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#583ebc] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a32a0]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`${t("projects.open_preview")} ${title}`}
            >
              <span>{t("projects.website")}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
            </motion.a>
          )}

          {gitUrl && (
            <motion.a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/button inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`${t("projects.open_repository")} ${title}`}
            >
              <Github className="h-4 w-4" />
              <span>{t("projects.code")}</span>
            </motion.a>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
