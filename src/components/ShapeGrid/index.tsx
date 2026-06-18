"use client";

import { useEffect, useRef } from "react";

type Direction = "right" | "left" | "up" | "down" | "diagonal";
type Shape = "square" | "circle" | "triangle" | "hexagon";

type ShapeGridProps = {
  direction?: Direction;
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  shape?: Shape;
  hoverTrailAmount?: number;
  className?: string;
  glowColor?: string;
  ambientGlow?: number;
  pulseStrength?: number;
};

type Cell = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
};

export default function ShapeGrid({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "rgba(34, 34, 34, 0.4)",
  shape = "square",
  hoverTrailAmount = 0,
  className = "",
  glowColor = "#5227FF",
  ambientGlow = 0.55,
  pulseStrength = 0.7,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<Cell | null>(null);
  const trailCells = useRef<Cell[]>([]);
  const cellOpacities = useRef(new Map<string, number>());
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const borderRgb = hexToRgb(borderColor);
    const glowRgb = hexToRgb(glowColor);
    const isHex = shape === "hexagon";
    const isTri = shape === "triangle";
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const drawCircle = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      flip: boolean,
    ) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    const drawActiveShape = (
      drawShape: () => void,
      alpha: number,
      centerDistance: number,
      maxDistance: number,
    ) => {
      const distanceFade = 1 - clamp(centerDistance / maxDistance, 0, 1);
      const glowOpacity = clamp(alpha * (0.45 + distanceFade * 0.4), 0, 0.95);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = hoverFillColor;
      ctx.shadowBlur = 18 + distanceFade * 20;
      ctx.shadowColor = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glowOpacity})`;
      drawShape();
      ctx.fill();
      ctx.restore();
    };

    const drawStrokeShape = (
      drawShape: () => void,
      centerDistance: number,
      maxDistance: number,
      alphaBoost: number,
    ) => {
      const distanceFade = 1 - clamp(centerDistance / maxDistance, 0, 1);
      const pulse =
        0.55 +
        0.45 * Math.sin(timeRef.current * 0.0018 - centerDistance * 0.045);
      const strokeAlpha = clamp(
        0.18 +
          distanceFade * ambientGlow * 0.26 +
          pulse * pulseStrength * 0.18 +
          alphaBoost,
        0.12,
        0.9,
      );

      ctx.save();
      ctx.strokeStyle = `rgba(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}, ${strokeAlpha})`;
      ctx.shadowBlur = 10 + distanceFade * 14 + alphaBoost * 18;
      ctx.shadowColor = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${strokeAlpha * 0.8})`;
      drawShape();
      ctx.stroke();
      ctx.restore();
    };

    const drawGrid = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDistance = Math.sqrt(width * width + height * height) / 2;

      ctx.clearRect(0, 0, width, height);

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX =
          ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const cols = Math.ceil(width / hexHoriz) + 3;
        const rows = Math.ceil(height / hexVert) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * hexHoriz + offsetX;
            const cy =
              row * hexVert +
              ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) +
              offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey) ?? 0;
            const centerDistance = Math.hypot(cx - centerX, cy - centerY);
            const drawShape = () => drawHex(cx, cy, squareSize * 0.66);

            if (alpha > 0) {
              drawActiveShape(drawShape, alpha, centerDistance, maxDistance);
            }
            drawStrokeShape(
              drawShape,
              centerDistance,
              maxDistance,
              alpha * 0.28,
            );
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffset.current.x / halfW);
        const rowShift = Math.floor(gridOffset.current.y / squareSize);
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / halfW) + 4;
        const rows = Math.ceil(height / squareSize) + 4;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip =
              (((col + colShift + row + rowShift) % 2) + 2) % 2 !== 0;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey) ?? 0;
            const centerDistance = Math.hypot(cx - centerX, cy - centerY);
            const drawShape = () =>
              drawTriangle(cx, cy, squareSize * 0.8, flip);

            if (alpha > 0) {
              drawActiveShape(drawShape, alpha, centerDistance, maxDistance);
            }
            drawStrokeShape(
              drawShape,
              centerDistance,
              maxDistance,
              alpha * 0.28,
            );
          }
        }
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey) ?? 0;
            const centerDistance = Math.hypot(cx - centerX, cy - centerY);
            const drawShape = () => drawCircle(cx, cy, squareSize * 0.64);

            if (alpha > 0) {
              drawActiveShape(drawShape, alpha, centerDistance, maxDistance);
            }
            drawStrokeShape(
              drawShape,
              centerDistance,
              maxDistance,
              alpha * 0.25,
            );
          }
        }
      } else {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col += 1) {
          for (let row = -2; row < rows; row += 1) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey) ?? 0;
            const cx = sx + squareSize / 2;
            const cy = sy + squareSize / 2;
            const centerDistance = Math.hypot(cx - centerX, cy - centerY);
            const drawShape = () => {
              ctx.beginPath();
              ctx.rect(sx, sy, squareSize, squareSize);
              ctx.closePath();
            };

            if (alpha > 0) {
              drawActiveShape(drawShape, alpha, centerDistance, maxDistance);
            }
            drawStrokeShape(
              drawShape,
              centerDistance,
              maxDistance,
              alpha * 0.22,
            );
          }
        }
      }

      const purpleGlow = ctx.createRadialGradient(
        centerX,
        centerY * 0.9,
        0,
        centerX,
        centerY,
        maxDistance,
      );
      purpleGlow.addColorStop(0, "rgba(82, 39, 255, 0.22)");
      purpleGlow.addColorStop(0.35, "rgba(82, 39, 255, 0.1)");
      purpleGlow.addColorStop(0.75, "rgba(82, 39, 255, 0.03)");
      purpleGlow.addColorStop(1, "rgba(82, 39, 255, 0)");
      ctx.fillStyle = purpleGlow;
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.15,
        centerX,
        centerY,
        maxDistance,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.65, "rgba(10, 8, 22, 0.08)");
      vignette.addColorStop(1, "rgba(5, 4, 16, 0.42)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquare.current) {
        targets.set(`${hoveredSquare.current.x},${hoveredSquare.current.y}`, 1);
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.current.length; i += 1) {
          const trailCell = trailCells.current[i];
          const key = `${trailCell.x},${trailCell.y}`;
          if (!targets.has(key)) {
            targets.set(
              key,
              (trailCells.current.length - i) / (trailCells.current.length + 1),
            );
          }
        }
      }

      targets.forEach((_, key) => {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      });

      cellOpacities.current.forEach((opacity, key) => {
        const target = targets.get(key) ?? 0;
        const next = opacity + (target - opacity) * 0.15;

        if (next < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      });
    };

    const updateAnimation = (time: number) => {
      timeRef.current = time;

      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      updateCellOpacities();
      drawGrid();
      requestRef.current = window.requestAnimationFrame(updateAnimation);
    };

    const setHoveredCell = (cell: Cell) => {
      if (
        !hoveredSquare.current ||
        hoveredSquare.current.x !== cell.x ||
        hoveredSquare.current.y !== cell.y
      ) {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquare.current });
          if (trailCells.current.length > hoverTrailAmount) {
            trailCells.current.length = hoverTrailAmount;
          }
        }
        hoveredSquare.current = cell;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX =
          ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        const row = Math.round((adjustedY - rowOffset) / hexVert);
        setHoveredCell({ x: col, y: row });
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / halfW);
        const row = Math.floor(adjustedY / squareSize);
        setHoveredCell({ x: col, y: row });
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.round(adjustedX / squareSize);
        const row = Math.round(adjustedY / squareSize);
        setHoveredCell({ x: col, y: row });
      } else {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;
        const col = Math.floor(adjustedX / squareSize);
        const row = Math.floor(adjustedY / squareSize);
        setHoveredCell({ x: col, y: row });
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquare.current && hoverTrailAmount > 0) {
        trailCells.current.unshift({ ...hoveredSquare.current });
        if (trailCells.current.length > hoverTrailAmount) {
          trailCells.current.length = hoverTrailAmount;
        }
      }
      hoveredSquare.current = null;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    requestRef.current = window.requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    ambientGlow,
    borderColor,
    direction,
    glowColor,
    hoverFillColor,
    hoverTrailAmount,
    pulseStrength,
    shape,
    speed,
    squareSize,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={["shapegrid-canvas", className].filter(Boolean).join(" ")}
    />
  );
}
