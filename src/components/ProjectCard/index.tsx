"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye, Info } from "lucide-react";
import Image from "next/image";
import ProjectDetailsModal from "../ProjectDetailsModal";

interface ProjectCardProps {
  title: string;
  description: string;
  imgUrl: string;
  tags: string[];
  gitUrl?: string;
  previewUrl?: string;
  tecnologias: string[];
  isHovered?: boolean;
}

export default function ProjectCard({
  title,
  description,
  imgUrl,
  tags,
  gitUrl,
  previewUrl,
  tecnologias,
  isHovered = false,
}: ProjectCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 30px -10px rgba(88, 62, 188, 0.4)",
      transition: {
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const glowVariants = {
    inactive: { opacity: 0 },
    active: {
      opacity: 0.7,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        className="bg-[#1e1e1e]/60 backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col shadow-lg border border-[#2a2a2a] relative"
        variants={cardVariants}
        animate={isHovered ? "hover" : "visible"}
        whileHover="hover"
      >
        {/* Glow effect when hovered */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#2f2069] to-[#5c3bc7] rounded-xl blur-md"
          variants={glowVariants}
          initial="inactive"
          animate={isHovered ? "active" : "inactive"}
          style={{ zIndex: -1 }}
        />

        <div className="relative overflow-hidden group">
          <motion.div
            className="w-full h-48 bg-gray-800"
            variants={imageVariants}
            initial="hidden"
            animate={isImageLoaded ? "visible" : "hidden"}
          >
            <Image
              src={imgUrl || "/placeholder.svg"}
              alt={title}
              width={500}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setIsImageLoaded(true)}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-end gap-2">
                {gitUrl && (
                  <motion.a
                    href={gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1e1e1e]/80 p-2 rounded-full hover:bg-[#583ebc] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5 text-white" />
                  </motion.a>
                )}

                {previewUrl && (
                  <motion.a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1e1e1e]/80 p-2 rounded-full hover:bg-[#583ebc] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {tecnologias.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-[#2a2a2a] text-gray-300"
              >
                {tech}
              </span>
            ))}
            {tecnologias.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-[#2a2a2a] text-gray-300">
                +{tecnologias.length - 3}
              </span>
            )}
          </div>

          {/* Action buttons at the bottom of the card */}
          <div className="flex gap-2 mt-4">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#583ebc] hover:bg-[#4a32a0] text-white text-sm px-3 py-1.5 rounded-md transition-colors flex-1"
              >
                <Eye className="w-4 h-4" />
                <span>View Site</span>
              </a>
            )}

            {gitUrl && (
              <a
                href={gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm px-3 py-1.5 rounded-md transition-colors flex-1"
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </a>
            )}

            {/* Details button moved to the bottom of the card */}
            <motion.button
              onClick={() => setShowDetails(true)}
              className="flex items-center justify-center gap-1.5 bg-[#1e1e1e] hover:bg-[#583ebc] text-white text-sm px-3 py-1.5 rounded-md border border-[#583ebc]/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-4 h-4" />
              <span>Details</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Separate Project Details Modal Component */}
      <ProjectDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        project={{
          title,
          description,
          imgUrl,
          gitUrl,
          previewUrl,
          tecnologias,
        }}
      />
    </>
  );
}
