"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Spaceship {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  trail: { x: number; y: number; opacity: number }[];
}

export default function SpaceshipBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spaceships = useRef<Spaceship[]>([]);
  const stars = useRef<
    { x: number; y: number; size: number; opacity: number }[]
  >([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initSpaceships();
    };

    // Initialize stars
    const initStars = () => {
      stars.current = [];
      const starCount = Math.min(Math.floor(window.innerWidth / 3), 200);

      for (let i = 0; i < starCount; i++) {
        stars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    // Initialize spaceships
    const initSpaceships = () => {
      spaceships.current = [];
      const shipCount = 8;

      for (let i = 0; i < shipCount; i++) {
        const size = Math.random() * 10 + 5;
        spaceships.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          speed: Math.random() * 2 + 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          color: getRandomColor(),
          trail: [],
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        "#583ebc", // Purple (main theme color)
        "#7c5ce6", // Lighter purple
        "#9370DB", // Medium purple
        "#8A2BE2", // BlueViolet
        "#4B0082", // Indigo
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Draw a spaceship
    const drawSpaceship = (ship: Spaceship) => {
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.rotation);

      // Draw the trail
      for (let i = 0; i < ship.trail.length; i++) {
        const trail = ship.trail[i];
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, ship.size / 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 165, 0, ${trail.opacity})`;
        ctx.fill();
      }

      // Draw the spaceship body
      ctx.beginPath();
      ctx.moveTo(ship.size, 0);
      ctx.lineTo(-ship.size / 2, ship.size / 2);
      ctx.lineTo(-ship.size / 4, 0);
      ctx.lineTo(-ship.size / 2, -ship.size / 2);
      ctx.closePath();
      ctx.fillStyle = ship.color;
      ctx.fill();

      // Draw the cockpit
      ctx.beginPath();
      ctx.arc(ship.size / 3, 0, ship.size / 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Make stars twinkle
        star.opacity += (Math.random() - 0.5) * 0.05;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));
      });

      // Update and draw spaceships
      spaceships.current.forEach((ship) => {
        // Update position
        const dx = Math.cos(ship.rotation) * ship.speed;
        const dy = Math.sin(ship.rotation) * ship.speed;
        ship.x += dx;
        ship.y += dy;

        // Update rotation
        ship.rotation += ship.rotationSpeed;

        // Add trail
        if (Math.random() > 0.5) {
          ship.trail.push({
            x: -ship.size / 2,
            y: 0,
            opacity: 0.8,
          });

          // Limit trail length
          if (ship.trail.length > 10) {
            ship.trail.shift();
          }
        }

        // Update trail
        ship.trail.forEach((trail) => {
          trail.opacity -= 0.05;
        });

        // Remove faded trail particles
        ship.trail = ship.trail.filter((trail) => trail.opacity > 0);

        // Wrap around edges
        if (ship.x > canvas.width + ship.size) ship.x = -ship.size;
        if (ship.x < -ship.size) ship.x = canvas.width + ship.size;
        if (ship.y > canvas.height + ship.size) ship.y = -ship.size;
        if (ship.y < -ship.size) ship.y = canvas.height + ship.size;

        // Draw the spaceship
        drawSpaceship(ship);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Set up event listeners
    window.addEventListener("resize", handleResize);

    // Initialize
    handleResize();
    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
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
      transition={{ duration: 0.5 }}
    />
  );
}
