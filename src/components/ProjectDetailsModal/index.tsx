"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Github,
  MonitorPlay,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SpaceshipBackground from "../SpaceShips";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { getProjectImages } from "../../lib/projectImages";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    role?: string;
    impact?: string;
    imgUrl: string;
    images?: string[];
    gitUrl?: string;
    previewUrl?: string;
    demoUrl?: string;
    tecnologias: string[];
  };
}

export default function ProjectDetailsModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  // Build the gallery from the explicit `images` array when present, falling
  // back to the cover image so the modal works for legacy data.
  const gallery: string[] = useMemo(() => {
    const list = getProjectImages({
      images: project.images,
      image: project.imgUrl,
    });
    return list.length > 0 ? list : ["/placeholder.svg"];
  }, [project.images, project.imgUrl]);

  // Reset to the cover whenever a new project is opened.
  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen, project.title]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goPrev, goNext]);

  const detailsVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  // Drag-to-swipe the gallery on touch devices.
  const dragX = useMotionValue(0);
  const swipeThreshold = 80;

  if (!mounted) return null;

  const showArrows = gallery.length > 1;
  const currentImage = gallery[activeIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-details-title"
        >
          <div className="absolute inset-0 overflow-hidden">
            {!shouldReduceMotion && <SpaceshipBackground />}
          </div>

          <motion.div
            className="scrollbar-thin bg-[#1e1e1e]/90 backdrop-blur-md rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#583ebc]/50 relative z-10"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div
                className="relative h-64 sm:h-[360px] w-full overflow-hidden rounded-t-xl bg-[#121212]"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentImage}
                    className="absolute inset-0"
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: 24 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -24 }
                    }
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    drag={shouldReduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    style={{ x: dragX }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -swipeThreshold) {
                        goNext();
                      } else if (info.offset.x > swipeThreshold) {
                        goPrev();
                      }
                    }}
                  >
                    <Image
                      src={currentImage}
                      alt={
                        gallery.length > 1
                          ? `${project.title} — ${activeIndex + 1} de ${gallery.length}`
                          : project.title
                      }
                      width={800}
                      height={400}
                      className="w-full h-64 sm:h-[360px] object-cover"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Close button — above everything */}
                <motion.button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full hover:bg-[#583ebc] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={t("projects.close_details")}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                {/* Carousel arrows */}
                {showArrows && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      aria-label={t("projects.previous_image")}
                      className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:bg-[#583ebc] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      aria-label={t("projects.next_image")}
                      className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:bg-[#583ebc] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Counter pill */}
                {showArrows && (
                  <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[11px] text-white/85 backdrop-blur-md">
                    {activeIndex + 1} / {gallery.length}
                  </div>
                )}
              </div>

              {/* Dots — under the image, only when there's more than one */}
              {showArrows && (
                <div
                  className="flex items-center justify-center gap-1.5 bg-[#1e1e1e]/90 px-4 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {gallery.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`${t("projects.image")} ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex
                          ? "w-6 bg-[#a48eff]"
                          : "w-1.5 bg-white/25 hover:bg-white/45"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <motion.h2
                id="project-details-title"
                className="text-2xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h2>

              <motion.p
                className="text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>

              {(project.role || project.impact) && (
                <motion.div
                  className="mb-6 grid gap-5 rounded-xl border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {project.role && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a48eff]">
                        {t("projects.role_label")}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-300">
                        {project.role}
                      </p>
                    </div>
                  )}
                  {project.impact && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f6c744]">
                        {t("projects.featured_impact_short")}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-300">
                        {project.impact}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {t("projects.technologies")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tecnologias.map((tech, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={techBadgeVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-sm px-3 py-1 rounded-full bg-[#2a2a2a] text-gray-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {project.gitUrl && (
                  <Link
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="font-medium">
                      {t("projects.view_source_code")}
                    </span>
                  </Link>
                )}

                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-[#f6c744] px-4 py-2 font-medium text-[#211734] transition-colors hover:bg-[#ffe89d]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <MonitorPlay className="relative h-5 w-5" />
                    <span className="relative">{t("projects.demo_live")}</span>
                  </Link>
                )}

                {project.previewUrl && (
                  <Link
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#583ebc] hover:bg-[#4a32a0] text-white px-4 py-2 rounded-lg transition-colors group"
                  >
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">
                      {t("projects.visit_website")}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
