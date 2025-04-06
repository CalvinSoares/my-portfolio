"use client";

import { motion } from "framer-motion";

interface ProjectTagProps {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}

export default function ProjectTag({
  name,
  onClick,
  isSelected,
}: ProjectTagProps) {
  const variants = {
    default: { scale: 1 },
    selected: { scale: 1.05 },
  };

  return (
    <motion.button
      className={`px-4 py-2 rounded-full text-white transition-all duration-300 ${
        isSelected
          ? "bg-[#583ebc] font-medium shadow-lg shadow-[#583ebc]/30"
          : "bg-[#1e1e1e]/60 backdrop-blur-sm border border-[#2a2a2a] hover:border-[#583ebc]/50"
      }`}
      onClick={() => onClick(name)}
      variants={variants}
      animate={isSelected ? "selected" : "default"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {name}
      </motion.span>
    </motion.button>
  );
}
