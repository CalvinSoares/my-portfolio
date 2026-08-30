"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Maximize2,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

interface CompactProjectCardProps {
  title: string;
  description: string;
  imgUrl: string;
  images?: string[];
  hoverImage?: string;
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
  images,
  hoverImage,
  tags,
  gitUrl,
  previewUrl,
  tecnologias,
  onDetails,
}: CompactProjectCardProps) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [isHoveringMedia, setIsHoveringMedia] = useState(false);

  const gallery: string[] = useMemo(() => {
    const list = images && images.length > 0 ? images : [imgUrl];
    return list.filter(Boolean);
  }, [images, imgUrl]);

  // Hover-swap mode: single-image card with a dedicated hover image.
  const useHoverSwap = gallery.length === 1 && Boolean(hoverImage);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverSwapped, setIsHoverSwapped] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!isHoveringMedia) return;
    if (useHoverSwap) return;
    if (gallery.length < 2) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 1600);
    return () => clearInterval(timer);
  }, [isHoveringMedia, gallery.length, shouldReduceMotion, useHoverSwap]);

  const handleMediaEnter = () => {
    setIsHoveringMedia(true);
    if (useHoverSwap) setIsHoverSwapped(true);
  };

  const handleMediaLeave = () => {
    setIsHoveringMedia(false);
    if (useHoverSwap) setIsHoverSwapped(false);
    setActiveIndex(0);
  };

  const goPrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  };

  // Cursor-follow tilt.
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
      tiltX.set((py - 0.5) * -4);
      tiltY.set((px - 0.5) * 6);
    }
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    handleMediaLeave();
  };

  const showArrows = !useHoverSwap && gallery.length > 1;
  const currentImage = isHoverSwapped
    ? (hoverImage ?? gallery[0])
    : (gallery[activeIndex] ?? "/placeholder.svg");

  const hiddenTechCount = tecnologias.length - TECH_LIMIT;
  const stop = (event: React.MouseEvent) => event.stopPropagation();

  const oneLiner = useMemo(() => {
    const trimmed = description.trim();
    const max = 100;
    if (trimmed.length <= max) return trimmed;
    const lastSpace = trimmed.slice(0, max).lastIndexOf(" ");
    return `${trimmed.slice(0, lastSpace > 40 ? lastSpace : max).replace(/[.,;:]$/, "")}…`;
  }, [description]);

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
      onMouseEnter={handleMediaEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${t("projects.view_details_for")} ${title}`}
      className="group relative flex h-full min-h-[300px] cursor-pointer flex-col justify-end overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#171717] outline-none transition-colors duration-300 hover:border-[#a48eff]/35 focus-visible:border-[#a48eff] focus-visible:ring-2 focus-visible:ring-[#583ebc]/60"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top badges */}
      <div className="absolute left-3 top-3 z-[3] flex flex-wrap gap-1.5">
        {tags
          .filter((tag) => tag !== "All")
          .map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-black/55 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Image layer */}
      <div className="absolute inset-0" onMouseEnter={handleMediaEnter}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={currentImage}
              alt={
                gallery.length > 1
                  ? `${title} — ${activeIndex + 1} de ${gallery.length}`
                  : title
              }
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0d0d0f]/70 via-[#0d0d0f]/20 to-transparent" />

        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(164,142,255,0.15), transparent 45%)",
          }}
        />

        {/* Arrows — only when there's 2+ images */}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("projects.previous_image")}
              className="absolute left-2 top-1/2 z-[3] inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-[#583ebc] hover:text-white focus-visible:opacity-100 focus-visible:outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t("projects.next_image")}
              className="absolute right-2 top-1/2 z-[3] inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-[#583ebc] hover:text-white focus-visible:opacity-100 focus-visible:outline-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 right-2 z-[3] rounded-full border border-white/10 bg-black/55 px-2 py-0.5 font-mono text-[9px] text-white/80 backdrop-blur-md">
              {activeIndex + 1}/{gallery.length}
            </div>
          </>
        )}
      </div>

      {/* Text panel — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 z-[3] translate-y-[calc(100%-4rem)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0">
        <div className="border-t border-white/10 bg-gradient-to-b from-[rgba(14,14,17,0.94)] to-[rgba(11,11,13,0.98)] p-4 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-3">
            <h3 className="truncate text-base font-semibold text-white">{title}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#c2b5ff]" />
          </div>
          <p className="line-clamp-2 text-[12px] leading-relaxed text-gray-300">
            {oneLiner}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {tecnologias.slice(0, TECH_LIMIT).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] text-gray-200"
              >
                {tech}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span className="rounded-full bg-[#583ebc]/30 px-2 py-0.5 text-[9px] font-medium text-[#d4c9ff]">
                +{hiddenTechCount}
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                className="inline-flex items-center gap-1 rounded-full bg-[#583ebc] px-3 py-1 text-[10px] font-medium text-white transition-colors hover:bg-[#4a32a0]"
              >
                {t("projects.website")}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
            {gitUrl && (
              <a
                href={gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-medium text-white transition-colors hover:bg-white/15"
              >
                <Github className="h-3 w-3" />
                {t("projects.code")}
              </a>
            )}
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium text-white/45 transition-colors group-hover:text-white">
              <Maximize2 className="h-3 w-3" />
              {t("projects.details")}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
