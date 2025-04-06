"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Download, User, Code, Sparkles } from "lucide-react";
import Header from "../components/Header";
import ParticleField from "../components/ParticlesField";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Set loaded state after a small delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const downloadPDF = () => {
    const pdfUrl = "/images/CalvinSoares.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "calvinsoares.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate parallax effect based on mouse position
  const calculateParallax = (depth = 10) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (mousePosition.x - centerX) / depth;
    const offsetY = (mousePosition.y - centerY) / depth;

    return { x: offsetX, y: offsetY };
  };

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 1 + i * 0.1,
      },
    }),
  };

  // Parallax values for different elements
  const parallax1 = calculateParallax(20);
  const parallax2 = calculateParallax(40);
  const parallax3 = calculateParallax(60);

  const socialLinks = [
    {
      name: "GitHub",
      icon: "/images/github.svg",
      url: "https://github.com/CalvinSoares",
      color: "hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: "/images/linkedin.svg",
      url: "https://www.linkedin.com/in/calvinsoares/",
      color: "hover:bg-blue-600",
    },
    {
      name: "TikTok",
      icon: "/images/tiktok.svg",
      url: "https://www.tiktok.com/@pato_programador?lang=pt-BR",
      color: "hover:bg-black",
    },
  ];

  return (
    <section
      id="Home"
      className="relative h-screen w-full overflow-hidden bg-[#121212]"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Decorative Gradient Orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-purple-700/20 to-indigo-700/10 blur-3xl"
        style={{ x: parallax3.x, y: parallax3.y }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-violet-700/10 to-fuchsia-700/20 blur-3xl"
        style={{ x: -parallax3.x, y: -parallax3.y }}
      />

      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-20 h-[calc(100vh-80px)]">
        {/* Left Column - Text Content */}
        <motion.div
          className="w-full md:w-1/2 mt-20 md:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#583ebc]/20 border border-[#583ebc]/30 text-[#a48eff] mb-6"
            variants={itemVariants}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">Fullstack Developer</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            className="mb-6"
            variants={itemVariants}
            style={{ x: parallax1.x / 2, y: parallax1.y / 2 }}
          >
            <h2 className="text-gray-400 text-xl mb-2">Hi, I'm</h2>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
              <ReactTyped
                strings={["Calvin Soares"]}
                typeSpeed={100}
                backSpeed={20}
                showCursor={true}
                cursorChar="|"
                className="text-4xl md:text-7xl"
              />
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-px w-8 bg-[#583ebc]"></div>
              <p className="text-[#583ebc] font-medium">Fullstack Developer</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-lg mb-8 max-w-lg"
            variants={itemVariants}
          >
            Welcome to my personal portfolio. I create modern web applications
            with cutting-edge technologies and user-centered design.
          </motion.p>

          {/* Code Element */}
          <motion.div
            className="mb-8 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] max-w-md"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-gray-400 text-xs ml-2">skills.js</div>
            </div>
            <pre className="text-gray-300 font-mono text-sm">
              <code>
                {`const skills = {
  frontend: ['React', 'Next.js', 'Tailwind', 'React Native', 'Angular'],
  backend: ['Nest.js','Node.js', 'Express', 'MongoDB', 'Docker', 'CloudFlare', 'Kubernetes'],
  languages: ['JavaScript', 'TypeScript', 'ASP.NET'],
};`}
              </code>
            </pre>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={downloadPDF}
              className="group relative overflow-hidden rounded-full px-6 py-3 bg-[#583ebc] text-white font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download CV
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>

            <Link href="/About">
              <motion.button
                className="group relative overflow-hidden rounded-full px-6 py-3 bg-transparent border border-[#583ebc] text-[#583ebc] font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <User className="w-5 h-5" />
                  About Me
                </span>
                <span className="absolute inset-0 bg-[#583ebc] translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column - Visual Elements */}
        <motion.div
          className="hidden md:flex flex-col items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ x: parallax2.x, y: parallax2.y }}
        >
          {/* 3D Code Block */}
          <div className="relative w-80 h-80">
            {/* Code blocks floating in 3D space */}
            <motion.div
              className="absolute top-0 left-0 p-4 bg-[#1e1e1e]/80 backdrop-blur-sm rounded-lg border border-[#583ebc]/30 shadow-lg w-48"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-[#a48eff] font-mono text-xs">
                <code>{`function App() {
  return <Hello />;
}`}</code>
              </pre>
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-0 p-4 bg-[#1e1e1e]/80 backdrop-blur-sm rounded-lg border border-[#583ebc]/30 shadow-lg w-56"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -2, 0],
                transition: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-green-400 font-mono text-xs">
                <code>{`const styles = {
  color: '#583ebc',
  fontWeight: 'bold'
};`}</code>
              </pre>
            </motion.div>

            <motion.div
              className="absolute top-40 right-10 p-4 bg-[#1e1e1e]/80 backdrop-blur-sm rounded-lg border border-[#583ebc]/30 shadow-lg w-40"
              animate={{
                y: [0, 15, 0],
                rotate: [0, 3, 0],
                transition: {
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            >
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-orange-400 font-mono text-xs">
                <code>{`npm install
next react`}</code>
              </pre>
            </motion.div>

            {/* Central element */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-[#583ebc] to-[#7c5ce6] flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(88, 62, 188, 0.5)",
                  "0 0 30px rgba(88, 62, 188, 0.8)",
                  "0 0 20px rgba(88, 62, 188, 0.5)",
                ],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
              }}
            >
              <Code className="w-8 h-8 text-white" />
            </motion.div>

            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: -1 }}
            >
              <motion.line
                x1="40"
                y1="40"
                x2="160"
                y2="160"
                stroke="#583ebc"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
              <motion.line
                x1="280"
                y1="200"
                x2="160"
                y2="160"
                stroke="#583ebc"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
              <motion.line
                x1="220"
                y1="80"
                x2="160"
                y2="160"
                stroke="#583ebc"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, delay: 1.4 }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 bg-[#1e1e1e]/60 backdrop-blur-sm rounded-full text-white ${link.color} transition-colors duration-300 border border-white/10`}
            custom={index}
            variants={socialVariants}
            whileHover={{ y: -8, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
      </motion.div>
    </section>
  );
}
