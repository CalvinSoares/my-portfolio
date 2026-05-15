"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  User,
  FolderKanban,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { name: t("nav.home"), path: "/", icon: <Home className="w-5 h-5" /> },
    { name: t("nav.about"), path: "/About", icon: <User className="w-5 h-5" /> },
    {
      name: t("nav.project"),
      path: "/projects",
      icon: <FolderKanban className="w-5 h-5" />,
    },
    {
      name: t("nav.contact"),
      path: "/Contact",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/CalvinSoares",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/calvinsoares/",
    },
    {
      name: "TikTok",
      icon: <ExternalLink className="w-5 h-5" />,
      url: "https://www.tiktok.com/@pato_programador",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-md flex flex-col items-center justify-center"
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            {/* Profile Section */}
            <motion.div
              className="mb-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#583ebc] p-1 bg-[#1e1e1e]">
                  <Image
                    src="/images/devImg.jpg"
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1e1e1e]"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 2,
                    repeatDelay: 1,
                  }}
                />
              </div>
              <h2 className="text-white font-bold text-xl mt-4">
                {t("common.profile_name")}
              </h2>
              <p className="text-gray-400 text-sm">{t("common.profile_role")}</p>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              className="flex flex-col items-center space-y-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {menuItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-lg font-medium transition-colors ${
                      pathname === item.path
                        ? "bg-[#583ebc] text-white"
                        : "bg-[#1e1e1e] text-gray-300 hover:bg-[#583ebc]/70 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <button
                onClick={() => setLanguage("pt")}
                className={`p-1 rounded-full transition-all ${language === "pt" ? "ring-2 ring-[#583ebc] scale-110" : "opacity-70 grayscale hover:grayscale-0"}`}
                aria-label={t("nav.language_pt")}
              >
                <Image
                  src="https://flagcdn.com/w40/br.png"
                  alt="Português"
                  width={28}
                  height={28}
                  className="rounded-full object-cover h-7 w-7"
                />
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`p-1 rounded-full transition-all ${language === "en" ? "ring-2 ring-[#583ebc] scale-110" : "opacity-70 grayscale hover:grayscale-0"}`}
                aria-label={t("nav.language_en")}
              >
                <Image
                  src="https://flagcdn.com/w40/us.png"
                  alt="English"
                  width={28}
                  height={28}
                  className="rounded-full object-cover h-7 w-7"
                />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1e1e1e] rounded-full text-white hover:bg-[#583ebc] transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.6 + index * 0.1 },
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
