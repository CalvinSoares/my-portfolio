"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

interface CompactProjectCardProps {
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
  gitUrl?: string;
  previewUrl?: string;
  tecnologias: string[];
  onDetails: () => void;
}

const TECH_LIMIT = 3;

export default function CompactProjectCard({
  title,
  description,
  imgUrl,
  tags,
  gitUrl,
  previewUrl,
  tecnologias,
  onDetails,
}: CompactProjectCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const hiddenTechCount = tecnologias.length - TECH_LIMIT;
  const stop = (event: React.MouseEvent) => event.stopPropagation();

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      "--spot-x",
      `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`,
    );
    el.style.setProperty(
      "--spot-y",
      `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`,
    );
  };

  return (
    <motion.article
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onDetails}
      onMouseMove={handleMouseMove}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDetails();
        }
      }}
      aria-label={`${t("projects.view_details_for")} ${title}`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161617]/85 outline-none backdrop-blur-md transition-colors duration-300 hover:border-[#a48eff]/35 focus-visible:border-[#a48eff] focus-visible:ring-2 focus-visible:ring-[#583ebc]/60"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(164,142,255,0.12), transparent 45%)",
        }}
      />
      <div className="relative h-36 overflow-hidden">
        <Image
          src={imgUrl || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />
        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
          {tags
            .filter((tag) => tag !== "All")
            .map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1.5 line-clamp-2 flex-grow text-xs leading-relaxed text-gray-400">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tecnologias.slice(0, TECH_LIMIT).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              {tech}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <span className="rounded-full bg-[#583ebc]/20 px-2 py-0.5 text-[10px] font-medium text-[#c2b5ff]">
              +{hiddenTechCount}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-3">
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-[#583ebc] hover:text-white"
              aria-label={`${t("projects.open_preview")} ${title}`}
              title={t("projects.website")}
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {gitUrl && (
            <a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-white/15 hover:text-white"
              aria-label={`${t("projects.open_repository")} ${title}`}
              title={t("projects.code")}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/55 transition-colors group-hover:text-white">
            <Maximize2 className="h-3.5 w-3.5" />
            {t("projects.details")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
