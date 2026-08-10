"use client";

// Letter Glitch effect adapted from React Bits (reactbits.dev, MIT).
// Canvas-based matrix of monospace characters that randomly glitch to new
// glyphs and colors, with smooth color interpolation. No WebGL deps.

import { useEffect, useRef } from "react";

interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  smooth?: boolean;
  centerVignette?: boolean;
  outerVignette?: boolean;
  className?: string;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface GlitchLetter {
  char: string;
  from: Rgb;
  to: Rgb;
  colorProgress: number;
}

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>/\\|=+-*_~!@#$%&?;:";

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;

const randomChar = () =>
  CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

const hexToRgb = (hex: string): Rgb => {
  const normalized = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_m, r, g, b) => r + r + g + g + b + b,
  );
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  return match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
    : { r: 88, g: 62, b: 188 };
};

const mix = (from: Rgb, to: Rgb, factor: number) =>
  `rgb(${Math.round(from.r + (to.r - from.r) * factor)}, ${Math.round(
    from.g + (to.g - from.g) * factor,
  )}, ${Math.round(from.b + (to.b - from.b) * factor)})`;

export default function LetterGlitch({
  glitchColors = ["#2b2158", "#583ebc", "#a48eff"],
  glitchSpeed = 50,
  smooth = true,
  centerVignette = false,
  outerVignette = true,
  className = "",
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<GlitchLetter[]>([]);
  const gridRef = useRef({ columns: 0, rows: 0 });
  const rafRef = useRef<number>(0);
  const lastGlitchRef = useRef(0);

  const colorsKey = glitchColors.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const palette = colorsKey.split("|").map(hexToRgb);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const randomRgb = () =>
      palette[Math.floor(Math.random() * palette.length)];

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = `${FONT_SIZE}px monospace`;
      context.textBaseline = "top";
      const { columns } = gridRef.current;
      lettersRef.current.forEach((letter, index) => {
        const x = (index % columns) * CHAR_WIDTH;
        const y = Math.floor(index / columns) * CHAR_HEIGHT;
        context.fillStyle = mix(letter.from, letter.to, letter.colorProgress);
        context.fillText(letter.char, x, y);
      });
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.ceil(rect.width / CHAR_WIDTH);
      const rows = Math.ceil(rect.height / CHAR_HEIGHT);
      gridRef.current = { columns, rows };
      lettersRef.current = Array.from({ length: columns * rows }, () => {
        const color = randomRgb();
        return { char: randomChar(), from: color, to: color, colorProgress: 1 };
      });
      draw();
    };

    const glitchSome = () => {
      const letters = lettersRef.current;
      if (!letters.length) return;
      const updateCount = Math.max(1, Math.floor(letters.length * 0.05));
      for (let i = 0; i < updateCount; i++) {
        const index = Math.floor(Math.random() * letters.length);
        const letter = letters[index];
        letter.char = randomChar();
        letter.from = letter.to;
        letter.to = randomRgb();
        letter.colorProgress = smooth ? 0 : 1;
      }
    };

    const stepColors = () => {
      lettersRef.current.forEach((letter) => {
        if (letter.colorProgress < 1) {
          letter.colorProgress = Math.min(1, letter.colorProgress + 0.06);
        }
      });
    };

    const animate = (time: number) => {
      if (time - lastGlitchRef.current >= glitchSpeed) {
        glitchSome();
        lastGlitchRef.current = time;
      }
      if (smooth) stepColors();
      draw();
      rafRef.current = requestAnimationFrame(animate);
    };

    setup();
    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(animate);
    }

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setup, 120);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [colorsKey, glitchSpeed, smooth]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden bg-[#0d0d0f] ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_55%,#0d0d0f_100%)]" />
      )}
      {centerVignette && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(13,13,15,0.85)_0%,transparent_60%)]" />
      )}
    </div>
  );
}
