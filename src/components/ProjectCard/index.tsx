"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, MonitorPlay, Maximize2 } from "lucide-react";
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
  demoUrl?: string;
  tecnologias: string[];
  onDetails?: () => void;
}

export default function ProjectCard({
  title,
  description,
  role,
  imgUrl,
  tags,
  gitUrl,
  previewUrl,
  demoUrl,
  tecnologias,
  onDetails,
}: ProjectCardProps) {
  const { t } = useLanguage();
  const [isRoleExpanded, setIsRoleExpanded] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  // Live hover preview: mount the demo iframe only after the first hover so we
  // never load an iframe per card on page load.
  const [hasHovered, setHasHovered] = useState(false);

  const TECH_LIMIT = 6;
  const visibleTech = showAllTech
    ? tecnologias
    : tecnologias.slice(0, TECH_LIMIT);
  const hiddenTechCount = tecnologias.length - TECH_LIMIT;

  // Shorten copy at a natural boundary: prefer the first sentence, then fall
  // back to a word-boundary cut with an ellipsis. Language-agnostic, so copy
  // edits never silently break the summary.
  const summarize = (text: string, maxLength: number) => {
    const trimmed = text.trim();
    if (trimmed.length <= maxLength) return trimmed;

    const firstSentence = trimmed.split(/(?<=[.!?])\s/)[0].trim();
    if (firstSentence.length <= maxLength && firstSentence.length > 0) {
      return firstSentence;
    }

    const slice = trimmed.slice(0, maxLength);
    const lastSpace = slice.lastIndexOf(" ");
    const cut = slice.slice(0, lastSpace > 40 ? lastSpace : maxLength).trim();
    return `${cut.replace(/[.,;:]$/, "")}…`;
  };

  const compactRole = useMemo(
    () => (role ? summarize(role, 204) : undefined),
    [role],
  );
  const compactDescription = useMemo(
    () => summarize(description, 240),
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
      <motion.div
        className="relative h-56 overflow-hidden"
        variants={itemVariants}
        onMouseEnter={() => demoUrl && setHasHovered(true)}
      >
        <Image
          src={imgUrl || "/placeholder.svg"}
          alt={title}
          width={800}
          height={520}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {demoUrl && hasHovered && (
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <iframe
              src={demoUrl}
              title={`${title} — ${t("projects.demo_live")}`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              sandbox="allow-scripts allow-same-origin"
              className="h-full w-full border-0 bg-[#121212]"
              style={{
                width: "200%",
                height: "200%",
                transform: "scale(0.5)",
                transformOrigin: "top left",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-transparent to-transparent" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
        <div className="absolute left-5 top-5 z-[3] flex flex-wrap gap-2">
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
        {demoUrl && (
          <span className="absolute right-5 top-5 z-[3] inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("projects.demo")}
          </span>
        )}
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
                {isRoleExpanded
                  ? t("projects.show_less")
                  : t("projects.show_more")}
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
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              {tech}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAllTech((current) => !current)}
              className="rounded-full bg-[#583ebc]/20 px-2.5 py-1 text-[11px] font-medium text-[#c2b5ff] shadow-[0_0_0_1px_rgba(88,62,188,0.3)] transition-colors hover:bg-[#583ebc]/30 hover:text-white"
              aria-label={
                showAllTech ? t("projects.show_less") : t("projects.show_more")
              }
            >
              {showAllTech ? t("projects.show_less") : `+${hiddenTechCount}`}
            </button>
          )}
        </motion.div>

        {demoUrl && (
          <motion.a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/demo relative mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-shadow hover:shadow-emerald-500/40"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`${t("projects.open_demo")} ${title}`}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/demo:translate-x-full" />
            <MonitorPlay className="relative h-4 w-4" />
            <span className="relative">{t("projects.demo_live")}</span>
          </motion.a>
        )}

        <motion.div
          className={`flex flex-wrap gap-2.5 ${demoUrl ? "mt-3" : "mt-7"}`}
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

          {onDetails && (
            <motion.button
              type="button"
              onClick={onDetails}
              className="group/button inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`${t("projects.view_details_for")} ${title}`}
            >
              <Maximize2 className="h-4 w-4" />
              <span>{t("projects.details")}</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
