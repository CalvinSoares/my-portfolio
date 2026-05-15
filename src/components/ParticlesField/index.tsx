"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCompactScreen = window.innerWidth < 768;
    const shouldConnectParticles = !prefersReducedMotion && !isCompactScreen;
    const shouldTrackMouse = !prefersReducedMotion && !isCompactScreen;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = prefersReducedMotion
        ? 0
        : isCompactScreen
          ? Math.min(Math.floor(window.innerWidth / 28), 22)
          : Math.min(Math.floor(window.innerWidth / 18), 50);

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          color: getRandomColor(),
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        "rgba(88, 62, 188, 0.7)", // Purple (main theme color)
        "rgba(124, 92, 230, 0.7)", // Lighter purple
        "rgba(147, 112, 219, 0.6)", // Medium purple
        "rgba(138, 43, 226, 0.5)", // BlueViolet
        "rgba(75, 0, 130, 0.6)", // Indigo
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        if (shouldConnectParticles) {
          connectParticles(particle, index);
        }

        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (shouldTrackMouse && distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 1000;
          particle.speedX -= Math.cos(angle) * force;
          particle.speedY -= Math.sin(angle) * force;

          const maxSpeed = 2;
          const speed = Math.sqrt(
            particle.speedX * particle.speedX +
              particle.speedY * particle.speedY
          );
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed;
            particle.speedY = (particle.speedY / speed) * maxSpeed;
          }
        }

        if (Math.random() < 0.01) {
          particle.speedX += (Math.random() - 0.5) * 0.1;
          particle.speedY += (Math.random() - 0.5) * 0.1;
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const connectParticles = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particles.current.length; i++) {
        const otherParticle = particles.current[i];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(88, 62, 188, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    if (shouldTrackMouse) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    handleResize();
    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (shouldTrackMouse) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}
