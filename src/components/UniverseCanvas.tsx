import React, { useEffect, useRef } from 'react';
import { UniverseId } from '../types/universe';

interface Particle {
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
  color: string;
  extra?: number;
}

interface UniverseCanvasProps {
  universeId: UniverseId;
  burstTrigger?: number;
  originX?: number;
  originY?: number;
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  universeId,
  burstTrigger = 0,
  originX = 0.5,
  originY = 0.65,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; vx: number }>({ x: 0, y: 0, vx: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Trigger burst on ritual action
  useEffect(() => {
    if (burstTrigger > 0 && canvasRef.current) {
      spawnBurst(universeId);
    }
  }, [burstTrigger, universeId]);

  const spawnBurst = (uId: UniverseId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width * originX;
    const cy = canvas.height * originY;

    if (uId === 'nordic') {
      // Hearth fire ember explosion
      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: cx + (Math.random() - 0.5) * 80,
          y: cy + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 4,
          vy: -2.5 - Math.random() * 4,
          radius: 2 + Math.random() * 3,
          maxRadius: 3,
          alpha: 1,
          maxAlpha: 1,
          life: 0,
          maxLife: 120 + Math.random() * 80,
          color: Math.random() > 0.4 ? '#f97316' : '#fde047',
        });
      }
    } else if (uId === 'orbit') {
      // Cosmic stardust burst
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 2.5,
          maxRadius: 3.5,
          alpha: 1,
          maxAlpha: 1,
          life: 0,
          maxLife: 100 + Math.random() * 60,
          color: Math.random() > 0.5 ? '#a78bfa' : '#38bdf8',
        });
      }
    } else {
      // Steam & Aroma wisps
      for (let i = 0; i < 35; i++) {
        particlesRef.current.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: cy + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -1.8 - Math.random() * 2.2,
          radius: 12 + Math.random() * 16,
          maxRadius: 65 + Math.random() * 55,
          alpha: 0,
          maxAlpha: 0.2 + Math.random() * 0.15,
          life: 0,
          maxLife: 140 + Math.random() * 90,
          color: uId === 'tokyo' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(242, 184, 119, 0.6)',
        });
      }
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

      // 1. Spawning natural continuous particles
      if (universeId === 'nordic') {
        // Floating fireplace sparks
        if (frameCount % 4 === 0 && particlesRef.current.length < 90) {
          particlesRef.current.push({
            x: width * 0.5 + (Math.random() - 0.5) * 160,
            y: height * 0.85,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -1.5 - Math.random() * 2,
            radius: 1.5 + Math.random() * 2,
            maxRadius: 3,
            alpha: 0,
            maxAlpha: 0.85 + Math.random() * 0.15,
            life: 0,
            maxLife: 150 + Math.random() * 100,
            color: Math.random() > 0.3 ? '#fb923c' : '#fde047',
          });
        }
      } else if (universeId === 'tokyo') {
        // Tokyo rain streaks
        if (frameCount % 2 === 0 && particlesRef.current.length < 80) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: -20,
            vx: -1.2 + (Math.random() - 0.5) * 0.4,
            vy: 12 + Math.random() * 8,
            radius: 1,
            maxRadius: 1,
            alpha: 0.15 + Math.random() * 0.25,
            maxAlpha: 0.4,
            life: 0,
            maxLife: 80,
            color: '#38bdf8',
            extra: 12 + Math.random() * 18,
          });
        }
      } else if (universeId === 'orbit') {
        // Drifting stars
        if (frameCount % 6 === 0 && particlesRef.current.length < 75) {
          particlesRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: 1 + Math.random() * 2,
            maxRadius: 2.5,
            alpha: 0,
            maxAlpha: 0.6 + Math.random() * 0.4,
            life: 0,
            maxLife: 240 + Math.random() * 140,
            color: Math.random() > 0.5 ? '#c4b5fd' : '#7dd3fc',
          });
        }
      } else {
        // Chai / Coffee / Study Steam
        if (frameCount % 6 === 0 && particlesRef.current.length < 75) {
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
            color:
              universeId === 'bistro'
                ? 'rgba(253, 230, 138, 0.4)'
                : universeId === 'study'
                ? 'rgba(233, 213, 255, 0.4)'
                : 'rgba(242, 184, 119, 0.5)',
          });
        }
      }

      // 2. Render and update particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        const progress = p.life / p.maxLife;

        if (p.extra && universeId === 'tokyo') {
          // Draw Rain streak
          p.x += p.vx + mouseRef.current.vx * 0.05;
          p.y += p.vy;

          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 1.5, p.y + p.extra);
          ctx.stroke();
          ctx.globalAlpha = 1;

          if (p.y > height + 20) {
            particles.splice(i, 1);
          }
          continue;
        }

        // Alpha envelope
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        if (universeId === 'nordic') {
          // Drifting Ember Spark
          const sway = Math.sin(p.life * 0.04) * 0.8;
          p.x += p.vx + sway + mouseRef.current.vx * 0.05;
          p.y += p.vy;

          if (p.alpha > 0.01) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        } else if (universeId === 'orbit') {
          // Floating Starlight
          p.x += p.vx;
          p.y += p.vy;
          if (p.alpha > 0.01) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        } else {
          // Soft Glowing Steam Puff
          const curRadius =
            p.radius + (p.maxRadius - p.radius) * Math.sin((progress * Math.PI) / 2);
          const sway = Math.sin(p.life * 0.02) * 0.6;
          p.x += p.vx + sway + mouseRef.current.vx * 0.05;
          p.y += p.vy;

          if (p.alpha > 0.005) {
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, curRadius);
            grad.addColorStop(0, `rgba(255, 248, 240, ${p.alpha * 1.1})`);
            grad.addColorStop(0.5, p.color);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, curRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (p.life >= p.maxLife || p.y < -50 || p.x < -50 || p.x > width + 50) {
          particles.splice(i, 1);
        }
      }

      mouseRef.current.vx *= 0.92;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [universeId, originX, originY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
