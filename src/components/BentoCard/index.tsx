"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
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
  medium: "min-h-[280px]",
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
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  // Live hover preview: mount the demo iframe only after the first hover so we
  // never load an iframe per card on page load.
  const [hasHovered, setHasHovered] = useState(false);

  // Cursor-follow tilt (springed) + spotlight position via CSS vars.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 220, damping: 22 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
    if (!shouldReduceMotion) {
      tiltX.set((py - 0.5) * -5);
      tiltY.set((px - 0.5) * 7);
    }
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

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
      ref={cardRef}
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${t("projects.view_details_for")} ${title}`}
      className={`group relative flex h-full cursor-pointer flex-col justify-end overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#171717] outline-none transition-colors duration-300 hover:border-[#a48eff]/35 focus-visible:border-[#a48eff] focus-visible:ring-2 focus-visible:ring-[#583ebc]/60 ${sizeStyles[size]}`}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Media layer — full bleed, no text competes with it */}
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
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
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

        {/* Light scrim only — legibility comes from the glass panel below */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0d0d0f]/60 via-transparent to-[#0d0d0f]/25" />
      </div>

      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(164,142,255,0.16), transparent 45%)",
        }}
      />

      {/* Top badges */}
      <div className="absolute left-4 top-4 z-[3] flex flex-wrap gap-2">
        {tags
          .filter((tag) => tag !== "All")
          .map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
      </div>
      <div className="absolute right-4 top-4 z-[3] flex items-center gap-2">
        {demoUrl && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("projects.demo")}
          </span>
        )}
        {/* Expand affordance — slides in on hover */}
        <span className="inline-flex h-7 w-7 -translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/80 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Slide-up reveal panel: at rest only the title bar shows, keeping the
          screenshot visible; hover/focus slides the full details up over a
          solid background so text never fights the image. */}
      <div
        className={`absolute inset-x-0 bottom-0 z-[3] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 ${
          size === "large"
            ? "translate-y-[calc(100%-4.25rem)]"
            : "translate-y-[calc(100%-3.5rem)]"
        }`}
      >
        <div
          className={`border-t border-white/10 bg-gradient-to-b from-[rgba(14,14,17,0.92)] to-[rgba(11,11,13,0.97)] backdrop-blur-md ${
            size === "large" ? "p-5 pt-0" : "p-4 pt-0"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-3 ${
              size === "large" ? "h-[4.25rem]" : "h-14"
            }`}
          >
            <h3
              className={`truncate font-semibold text-white ${
                size === "large" ? "text-2xl md:text-[1.7rem]" : "text-lg"
              }`}
            >
              {title}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#c2b5ff]" />
          </div>
          <p
            className={`leading-relaxed text-gray-300 ${
              size === "large"
                ? "line-clamp-2 max-w-xl text-sm md:text-[15px]"
                : "line-clamp-2 text-[13px]"
            }`}
          >
            {oneLiner}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[10px] text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              >
                {tech}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span className="rounded-full bg-[#583ebc]/30 px-2.5 py-1 text-[10px] font-medium text-[#d4c9ff]">
                +{hiddenTechCount}
              </span>
            )}
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
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
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/15"
                aria-label={`${t("projects.open_repository")} ${title}`}
              >
                <Github className="h-3.5 w-3.5" />
                {t("projects.code")}
              </a>
            )}
            <span className="ml-auto hidden items-center gap-1.5 text-xs font-medium text-white/45 transition-colors group-hover:text-white sm:inline-flex">
              <Maximize2 className="h-3.5 w-3.5" />
              {t("projects.details")}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
