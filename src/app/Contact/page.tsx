"use client";

import type React from "react";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Copy,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const email = "calvinsoares17@gmail.com";
  const phoneDisplay = "+55 (21) 99230-3043";
  const phoneRaw = "+5521992303043";
  const whatsappUrl = `https://wa.me/${phoneRaw.replace("+", "")}`;

  const { t } = useLanguage();

  const contactInfoRef = useRef<HTMLDivElement>(null);
  const isContactInfoInView = useInView(contactInfoRef, {
    once: true,
    amount: 0.3,
  });

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);

    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      // Tradução do Toast de cópia de email
      toast.success(t("contact.toast_copy_email"));
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      // Tradução do Toast de cópia de telefone
      toast.success(t("contact.toast_copy_phone"));
    }
  };

  // Social links
  const socialLinks = [
    {
      name: "GitHub",
      icon: "/images/github.svg",
      url: "https://github.com/CalvinSoares",
    },
    {
      name: "LinkedIn",
      icon: "/images/linkedin.svg",
      url: "https://www.linkedin.com/in/calvinsoares/",
    },
    {
      name: "TikTok",
      icon: "/images/tiktok.svg",
      url: "https://www.tiktok.com/@pato_programador?lang=pt-BR",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="Contact"
      className="relative min-h-screen w-full overflow-hidden bg-[#120d1d]"
    >
      {/* Header */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          className="mb-12 border-b border-[#4c3b66] pb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="eyebrow mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span>04 — {t("contact.badge")}</span>
          </motion.div>

          <motion.h1
            className="mb-4 text-5xl font-semibold tracking-[-0.06em] text-[#efeee8] md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {t("contact.title")}
          </motion.h1>

          <motion.p
            className="mx-auto max-w-xl text-[#b9accb]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {t("contact.description")}
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto gap-12">
          {/* Contact Information */}
          <motion.div
            ref={contactInfoRef}
            variants={containerVariants}
            initial="hidden"
            animate={isContactInfoInView ? "visible" : "hidden"}
            className="flex flex-col justify-between"
          >
            {/* Contact Details */}
            <div>
              <motion.h2
                className="mb-6 flex items-center gap-2 text-2xl font-semibold text-[#efeee8]"
                variants={itemVariants}
              >
                <MapPin className="h-5 w-5 text-[#f6c744]" />
                {t("contact.info_title")}
              </motion.h2>

              <motion.div
                className="mb-6 rounded-2xl border border-[#4c3b66] bg-[#211734] p-6"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#52584e]">
                    <Mail className="h-5 w-5 text-[#f6c744]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">
                      {t("contact.label_email")}
                    </h3>
                    <div className="flex items-center justify-between gap-4">
                      <a
                        href={`mailto:${email}`}
                        className="text-gray-300 transition-colors hover:text-white break-all"
                      >
                        {email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(email, "email")}
                        className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
                        aria-label={t("contact.copy_email")}
                      >
                        {copiedEmail ? (
                          <CheckCircle className="w-5 h-5 text-[#f6c744]" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#52584e]">
                    <Phone className="h-5 w-5 text-[#f6c744]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">
                      {t("contact.label_phone")}
                    </h3>
                    <div className="flex items-center justify-between gap-4">
                      <a
                        href={`tel:${phoneRaw}`}
                        className="text-gray-300 transition-colors hover:text-white"
                      >
                        {phoneDisplay}
                      </a>
                      <button
                        onClick={() => copyToClipboard(phoneRaw, "phone")}
                        className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
                        aria-label={t("contact.copy_phone")}
                      >
                        {copiedPhone ? (
                          <CheckCircle className="w-5 h-5 text-[#f6c744]" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-2xl border border-[#4c3b66] bg-[#211734] p-6"
                variants={itemVariants}
              >
                <h3 className="text-white font-medium mb-4">
                  {t("contact.connect")}
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#8d62f7] bg-[#2d2044] p-3 text-white transition-colors duration-300 hover:border-[#f6c744]"
                      whileHover={{ y: -8, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Image
                        src={link.icon || "/placeholder.svg"}
                        alt={`${link.name} Icon`}
                        width={24}
                        height={24}
                        className="w-5 h-5"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="mt-6 rounded-2xl border border-[#4c3b66] bg-[#211734] p-6"
                variants={itemVariants}
              >
                <h3 className="text-white font-medium mb-4">
                  {t("contact.quick_actions")}
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#f6c744] px-4 py-3 text-sm font-bold text-[#211734] transition-colors hover:bg-[#ffe89d]"
                  >
                    <Mail className="h-4 w-4" />
                    {t("contact.send_email")}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-[#8d62f7] bg-[#2d2044] px-4 py-3 text-sm font-semibold text-[#f8f4ff] transition-colors hover:border-[#f6c744]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("contact.whatsapp")}
                  </a>
                  <a
                    href={`tel:${phoneRaw}`}
                    className="flex items-center justify-center gap-2 border border-[#8d62f7] bg-[#2d2044] px-4 py-3 text-sm font-semibold text-[#f8f4ff] transition-colors hover:border-[#f6c744]"
                  >
                    <Phone className="h-4 w-4" />
                    {t("contact.call_now")}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Availability Card */}
            <motion.div
              className="mt-6 rounded-2xl border border-[#8d62f7] bg-[#2d2044] p-6"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-3 w-3 rounded-sm bg-[#f6c744]"></div>
                <h3 className="text-white font-medium">
                  {t("contact.available_status")}
                </h3>
              </div>
              <p className="text-white/90 mb-4">
                {t("contact.available_desc")}
              </p>
              <Link href="/projects">
                <motion.button
                  className="group relative border border-[#8d62f7] bg-[#211734] px-6 py-3 text-sm font-semibold text-[#f8f4ff] hover:border-[#f6c744] hover:text-[#f6c744]"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("contact.view_work")}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
