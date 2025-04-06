"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Eye, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SpaceshipBackground from "../SpaceShips";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    imgUrl: string;
    gitUrl?: string;
    previewUrl?: string;
    tecnologias: string[];
  };
}

export default function ProjectDetailsModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailsModalProps) {
  const [mounted, setMounted] = useState(false);

  // Only mount the portal on the client side
  useEffect(() => {
    setMounted(true);

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const detailsVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  // Don't render anything on the server
  if (!mounted) return null;

  // Use createPortal to render the modal at the document body level
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden"
          onClick={onClose}
        >
          {/* Spaceship background effect */}
          <div className="absolute inset-0 overflow-hidden">
            <SpaceshipBackground />
          </div>

          <motion.div
            className="bg-[#1e1e1e]/90 backdrop-blur-md rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#583ebc]/50 relative z-10"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={project.imgUrl || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={400}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-[#583ebc] transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            <div className="p-6">
              <motion.h2
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

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Technologies
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
                    <span className="font-medium">View Source Code</span>
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
                    <span className="font-medium">Visit Website</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px]" />
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
