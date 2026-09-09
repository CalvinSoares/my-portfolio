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
      className={`relative inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold ${isSelected ? "border-[#f6c744] bg-[#f6c744] text-[#211734]" : "border-[#4c3b66] bg-[#211734] text-[#b9accb] hover:border-[#8d62f7] hover:text-[#f8f4ff]"} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 460, damping: 30, mass: 0.7 }}
    >
      <motion.span className="relative z-10 tracking-[0.01em]">
        {name}
      </motion.span>
    </motion.button>
  );
}
