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
  MonitorPlay,
  Download,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

interface BentoFeatureCardProps {
  title: string;
  description: string;
  imgUrl: string;
  images?: string[];
  hoverImage?: string;
  tags: string[];
  gitUrl?: string;
  previewUrl?: string;
  demoUrl?: string;
  desktopUrl?: string;
  tecnologias: string[];
  onDetails: () => void;
}

/**
 * The "feature" tier of the highlights grid. Two columns on desktop:
 * - Left  → sticky text block (title, description, tech, CTAs). Stays put
 *           while the user scrolls past the card, so the headline reads
 *           even when the screenshot scrolls out of view.
 * - Right → media column with carousel / hover-swap:
 *             • 1 image + hoverImage  → simple swap on hover (no arrows)
 *             • 2+ images + hoverImage → swap to 2nd image on hover (no arrows)
 *             • 3+ images            → full carousel with arrows + auto-cycle
 */
export default function BentoFeatureCard({
  title,
  description,
  imgUrl,
  images,
  hoverImage,
  tags,
  gitUrl,
  previewUrl,
  demoUrl,
  desktopUrl,
  tecnologias,
  onDetails,
}: BentoFeatureCardProps) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHoveringMedia, setIsHoveringMedia] = useState(false);

  const gallery: string[] = useMemo(() => {
    const list = images && images.length > 0 ? images : [imgUrl];
    return list.filter(Boolean);
  }, [images, imgUrl]);

  // Hover-swap: when the card has a `hoverImage` available AND:
  //   - it has 1 gallery image, OR
  //   - it has 2+ gallery images
  // → show the 2nd image on hover instead of cycling. Clean reveal, no arrows.
  const useHoverSwap = gallery.length >= 1 && Boolean(hoverImage);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverSwapped, setIsHoverSwapped] = useState(false);

  // Auto-advance on hover only when NOT in hover-swap mode AND 3+ images.
  // (2 images uses the swap instead; 1 image uses swap or is static.)
  useEffect(() => {
    if (shouldReduceMotion) return;
    if (!isHoveringMedia) return;
    if (useHoverSwap) return;
    if (gallery.length < 3) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 1500);
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

  const stop = (event: React.MouseEvent) => event.stopPropagation();

  // Subtle tilt for the right pane only — keeps the sticky text rock steady.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 200, damping: 24 });
  const rotateY = useSpring(tiltY, { stiffness: 200, damping: 24 });

  const handleMediaMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
    if (!shouldReduceMotion) {
      tiltX.set((py - 0.5) * -3);
      tiltY.set((px - 0.5) * 4);
    }
  };

  const handleMediaMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    handleMediaLeave();
  };

  // Arrows only for 3+ images (2-image cards use hover-swap instead).
  const showArrows = !useHoverSwap && gallery.length >= 3;
  // currentImage: if swamped on hover show 2nd image (or hoverImage), else carousel.
  const currentImage = isHoverSwapped
    ? (gallery[1] ?? hoverImage ?? gallery[0])
    : (gallery[activeIndex] ?? "/placeholder.svg");

  return (
    <div
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
      aria-label={`${t("projects.view_details_for")} ${title}`}
      className="group relative grid h-full min-h-[520px] cursor-pointer grid-cols-1 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#161617] outline-none transition-colors duration-300 hover:border-[#a48eff]/35 focus-visible:border-[#a48eff] focus-visible:ring-2 focus-visible:ring-[#583ebc]/60 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
    >
      {/* LEFT — sticky text pane */}
      <div className="relative flex flex-col justify-between p-6 md:p-8">
        <div className="sticky top-6">
          <div className="flex flex-wrap items-center gap-2">
            {tags
              .filter((tag) => tag !== "All")
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80"
                >
                  {tag}
                </span>
              ))}
            {demoUrl && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8d62f7] bg-[#2d2044] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#f6c744]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6c744]/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f6c744]" />
                </span>
                {t("projects.demo")}
              </span>
            )}
          </div>

          <h3 className="mt-5 text-3xl font-semibold text-white md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-gray-300">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {tecnologias.slice(0, 7).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] text-gray-200 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
              >
                {tech}
              </span>
            ))}
            {tecnologias.length > 7 && (
              <span className="rounded-full bg-[#583ebc]/30 px-2.5 py-1 text-[10px] font-medium text-[#d4c9ff]">
                +{tecnologias.length - 7}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {desktopUrl && (
              <a
                href={desktopUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#8d62f7] bg-[#2d2044] px-3.5 py-2 text-xs font-semibold text-[#f6c744] transition-colors hover:border-[#f6c744]"
              >
                <Download className="h-3.5 w-3.5" />
                {t("projects.download_desktop")}
              </a>
            )}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f6c744] px-3.5 py-2 text-xs font-semibold text-[#211734] transition-colors hover:bg-[#ffe89d]"
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
                className="inline-flex items-center gap-1.5 rounded-full bg-[#583ebc] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#4a32a0]"
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
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/15"
              >
                <Github className="h-3.5 w-3.5" />
                {t("projects.code")}
              </a>
            )}
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/45 transition-colors group-hover:text-white">
              <Maximize2 className="h-3.5 w-3.5" />
              {t("projects.details")}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — media column */}
      <motion.div
        className="relative h-[320px] overflow-hidden border-t border-white/5 bg-[#121212] lg:h-auto lg:min-h-[520px] lg:border-l lg:border-t-0"
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        onMouseEnter={handleMediaEnter}
        onMouseLeave={handleMediaMouseLeave}
        onMouseMove={handleMediaMouseMove}
      >
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
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Spotlight + scrim */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(164,142,255,0.18), transparent 45%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#161617]/40" />

        {/* Carousel arrows — only for 3+ images */}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("projects.previous_image")}
              className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-[#583ebc] hover:text-white focus-visible:opacity-100 focus-visible:outline-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={t("projects.next_image")}
              className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black text-white/90 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-105 hover:bg-[#583ebc] hover:text-white focus-visible:opacity-100 focus-visible:outline-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-black px-3 py-1 font-mono text-[11px] text-white/85">
              {activeIndex + 1} / {gallery.length}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
