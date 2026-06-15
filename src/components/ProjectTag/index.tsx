"use client";

import { motion } from "framer-motion";

interface ProjectTagProps {
  name: string;
  onClick: () => void;
  isSelected: boolean;
  className?: string;
}

export default function ProjectTag({
  name,
  onClick,
  isSelected,
  className = "",
}: ProjectTagProps) {
  return (
    <motion.button
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-2 text-sm text-white ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 460, damping: 30, mass: 0.7 }}
    >
      {isSelected ? (
        <motion.span
          layoutId="project-tab-active"
          className="absolute inset-0 rounded-full border border-[#7c5ce6]/35 bg-gradient-to-r from-[#3f2a84] via-[#583ebc] to-[#7c5ce6] shadow-lg shadow-[#583ebc]/20"
          transition={{
            type: "spring",
            stiffness: 520,
            damping: 34,
            mass: 0.65,
          }}
        />
      ) : (
        <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.07]" />
      )}

      <motion.span className="relative z-10 font-medium tracking-[0.01em]">
        {name}
      </motion.span>
    </motion.button>
  );
}
