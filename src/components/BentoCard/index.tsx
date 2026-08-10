"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Maximize2, MonitorPlay } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

type BentoSize = "large" | "medium" | "wide";

interface BentoCardProps {
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
  gitUrl?: string;
  previewUrl?: string;
  demoUrl?: string;
  tecnologias: string[];
  size?: BentoSize;
  onDetails: () => void;
}

const sizeStyles: Record<BentoSize, string> = {
  large: "min-h-[420px] md:min-h-[480px]",
  medium: "min-h-[260px]",
  wide: "min-h-[300px]",
};

export default function BentoCard({
  title,
  description,
  imgUrl,
  tags,
  gitUrl,
  previewUrl,
  demoUrl,
  tecnologias,
  size = "medium",
  onDetails,
}: BentoCardProps) {
  const { t } = useLanguage();
  // Live hover preview: mount the demo iframe only after the first hover so we
  // never load an iframe per card on page load.
  const [hasHovered, setHasHovered] = useState(false);

  const techLimit = size === "large" ? 5 : 3;
  const visibleTech = tecnologias.slice(0, techLimit);
  const hiddenTechCount = tecnologias.length - techLimit;

  const oneLiner = useMemo(() => {
    const trimmed = description.trim();
    const max = size === "large" ? 160 : 110;
    if (trimmed.length <= max) return trimmed;
    const slice = trimmed.slice(0, max);
    const lastSpace = slice.lastIndexOf(" ");
    return `${slice.slice(0, lastSpace > 40 ? lastSpace : max).replace(/[.,;:]$/, "")}…`;
  }, [description, size]);

  const stop = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClick={onDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onDetails();
        }
      }}
      onMouseEnter={() => demoUrl && setHasHovered(true)}
      aria-label={`${t("projects.view_details_for")} ${title}`}
      className={`group relative flex h-full cursor-pointer flex-col justify-end overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#171717] outline-none transition-colors duration-300 hover:border-white/25 focus-visible:border-[#a48eff] focus-visible:ring-2 focus-visible:ring-[#583ebc]/60 ${sizeStyles[size]}`}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Media layer */}
      <div className="absolute inset-0">
        <Image
          src={imgUrl || "/placeholder.svg"}
          alt={title}
          fill
          sizes={
            size === "large"
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.045]"
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
              className="border-0 bg-[#121212]"
              style={{
                width: "200%",
                height: "200%",
                transform: "scale(0.5)",
                transformOrigin: "top left",
              }}
            />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/45 to-transparent transition-opacity duration-500 group-hover:from-[#0d0d0f] group-hover:via-[#0d0d0f]/60" />
      </div>

      {/* Top badges */}
      <div className="absolute left-5 top-5 z-[3] flex flex-wrap gap-2">
        {tags
          .filter((tag) => tag !== "All")
          .map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
      </div>
      {demoUrl && (
        <span className="absolute right-5 top-5 z-[3] inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t("projects.demo")}
        </span>
      )}

      {/* Content */}
      <div className="relative z-[3] flex flex-col gap-3 p-5 md:p-6">
        <div>
          <h3
            className={`font-semibold text-white ${
              size === "large" ? "text-2xl md:text-[1.9rem]" : "text-xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1.5 leading-relaxed text-gray-300 ${
              size === "large"
                ? "max-w-xl text-sm md:text-[15px]"
                : "text-[13px]"
            }`}
          >
            {oneLiner}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-gray-100 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
          {hiddenTechCount > 0 && (
            <span className="rounded-full bg-[#583ebc]/30 px-2.5 py-1 text-[10px] font-medium text-[#d4c9ff] backdrop-blur-sm">
              +{hiddenTechCount}
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-shadow hover:shadow-emerald-500/40"
              aria-label={`${t("projects.open_demo")} ${title}`}
            >
              <MonitorPlay className="h-3.5 w-3.5" />
              {t("projects.demo_live")}
            </a>
          )}
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#583ebc] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#4a32a0]"
              aria-label={`${t("projects.open_preview")} ${title}`}
            >
              {t("projects.website")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {gitUrl && (
            <a
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
              aria-label={`${t("projects.open_repository")} ${title}`}
            >
              <Github className="h-3.5 w-3.5" />
              {t("projects.code")}
            </a>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-colors group-hover:border-white/30 group-hover:text-white">
            <Maximize2 className="h-3.5 w-3.5" />
            {t("projects.details")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
