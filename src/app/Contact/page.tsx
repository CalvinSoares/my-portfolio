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
  Send,
  MapPin,
  Sparkles,
} from "lucide-react";
import ParticleField from "../../components/ParticlesField";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isContactInfoInView = useInView(contactInfoRef, {
    once: true,
    amount: 0.3,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);

    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      toast.success("Email copied to clipboard!");
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      toast.success("Phone number copied to clipboard!");
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
      className="relative min-h-screen w-full overflow-hidden bg-[#121212]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Header */}
      <div className="pt-0 md:pt-8 relative z-50">
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Get In Touch</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Contact Me
          </motion.h1>

          <motion.p
            className="text-gray-400 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto  gap-12">
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
                className="text-2xl font-bold text-white mb-6 flex items-center gap-2"
                variants={itemVariants}
              >
                <MapPin className="w-5 h-5 text-[#583ebc]" />
                Contact Information
              </motion.h2>

              <motion.div
                className="bg-[#1e1e1e]/60 backdrop-blur-sm rounded-xl p-6 border border-[#2a2a2a] mb-6"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#583ebc]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#583ebc]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">calvinsoares19@gmail.com</p>
                      <button
                        onClick={() =>
                          copyToClipboard("calvinsoares19@gmail.com", "email")
                        }
                        className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
                      >
                        {copiedEmail ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#583ebc]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#583ebc]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">Phone</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">+55 (21) 99230-3043</p>
                      <button
                        onClick={() =>
                          copyToClipboard("+55 (21) 992303043", "phone")
                        }
                        className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
                      >
                        {copiedPhone ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#1e1e1e]/60 backdrop-blur-sm rounded-xl p-6 border border-[#2a2a2a]"
                variants={itemVariants}
              >
                <h3 className="text-white font-medium mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[#2a2a2a] rounded-full text-white hover:bg-[#583ebc] transition-colors duration-300"
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
            </div>

            {/* Availability Card */}
            <motion.div
              className="bg-gradient-to-br from-[#583ebc]/90 to-[#7c5ce6]/90 backdrop-blur-sm rounded-xl p-6 mt-6 border border-[#583ebc]/50"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-white font-medium">Currently Available</h3>
              </div>
              <p className="text-white/90 mb-4">
                I'm currently available for freelance work and full-time
                positions. If you're looking for a developer to join your team,
                let's talk!
              </p>
              <Link href="/projects">
                <motion.button
                  className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
