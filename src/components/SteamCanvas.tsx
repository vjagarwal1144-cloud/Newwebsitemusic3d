import React, { useEffect, useRef } from 'react';

interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  swaySpeed: number;
  swayOffset: number;
}

interface SteamCanvasProps {
  burstTrigger?: number;
  originX?: number; // relative 0-1
  originY?: number; // relative 0-1
}

export const SteamCanvas: React.FC<SteamCanvasProps> = ({
  burstTrigger = 0,
  originX = 0.5,
  originY = 0.65,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SteamParticle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; vx: number }>({ x: 0, y: 0, vx: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Burst when trigger changes
  useEffect(() => {
    if (burstTrigger > 0) {
      spawnBurst(35);
    }
  }, [burstTrigger]);

  const spawnBurst = (count: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const cx = canvas.width * originX;
    const cy = canvas.height * originY;

    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: cx + (Math.random() - 0.5) * 60,
        y: cy + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1.8 - Math.random() * 2.2,
        radius: 12 + Math.random() * 16,
        maxRadius: 65 + Math.random() * 55,
        alpha: 0,
        maxAlpha: 0.18 + Math.random() * 0.14,
        life: 0,
        maxLife: 140 + Math.random() * 90,
        swaySpeed: 0.02 + Math.random() * 0.025,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.vx = (e.clientX - prevX) * 0.1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Continuous gentle trickle of steam from tea cup
      if (frameCount % 6 === 0 && particlesRef.current.length < 80) {
        const cx = width * originX;
        const cy = height * originY;
        particlesRef.current.push({
          x: cx + (Math.random() - 0.5) * 40,
          y: cy + (Math.random() - 0.5) * 15,
          vx: (Math.random() - 0.5) * 0.7,
          vy: -0.8 - Math.random() * 1.2,
          radius: 10 + Math.random() * 14,
          maxRadius: 45 + Math.random() * 45,
          alpha: 0,
          maxAlpha: 0.12 + Math.random() * 0.09,
          life: 0,
          maxLife: 160 + Math.random() * 100,
          swaySpeed: 0.015 + Math.random() * 0.02,
          swayOffset: Math.random() * Math.PI * 2,
        });
      }

      // Update and draw steam particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Lifecycle progress 0 -> 1
        const progress = p.life / p.maxLife;

        // Alpha curve: fade in quickly, linger, fade out softly
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        // Expand radius smoothly as it rises
        const curRadius = p.radius + (p.maxRadius - p.radius) * Math.sin((progress * Math.PI) / 2);

        // Sinusoidal curling and drift
        const sway = Math.sin(p.life * p.swaySpeed + p.swayOffset) * 0.6;
        p.x += p.vx + sway + mouseRef.current.vx * 0.05;
        p.y += p.vy;

        // Draw soft glowing steam puff
        if (p.alpha > 0.005) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curRadius);
          grad.addColorStop(0, `rgba(255, 245, 235, ${p.alpha})`);
          grad.addColorStop(0.45, `rgba(242, 184, 119, ${p.alpha * 0.6})`);
          grad.addColorStop(1, 'rgba(242, 184, 119, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, curRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Remove dead particles
        if (p.life >= p.maxLife || p.y < -curRadius) {
          particles.splice(i, 1);
        }
      }

      // Decay mouse wind
      mouseRef.current.vx *= 0.92;

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [originX, originY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
