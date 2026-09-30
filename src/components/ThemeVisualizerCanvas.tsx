import React, { useEffect, useRef } from 'react';
import { ThemeId } from '../types/themes';

interface ThemeVisualizerCanvasProps {
  themeId: ThemeId;
  burstTrigger?: number;
  isWiping?: boolean;
}

export const ThemeVisualizerCanvas: React.FC<ThemeVisualizerCanvasProps> = ({
  themeId,
  burstTrigger = 0,
  isWiping = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const wiperAngleRef = useRef(0);
  const wiperDirectionRef = useRef(1);

  // Highway drive variables
  const roadOffsetRef = useRef(0);
  const starsRef = useRef<{ x: number; y: number; s: number; a: number }[]>([]);
  const rainDropsRef = useRef<{ x: number; y: number; vy: number; l: number }[]>([]);
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; a: number; color: string; life: number }[]
  >([]);

  // Trigger effect when burstTrigger changes (e.g. key press or stoke)
  useEffect(() => {
    if (burstTrigger > 0 && canvasRef.current) {
      const c = canvasRef.current;
      if (themeId === 'campfire') {
        for (let i = 0; i < 40; i++) {
          particlesRef.current.push({
            x: c.width * 0.5 + (Math.random() - 0.5) * 80,
            y: c.height * 0.82,
            vx: (Math.random() - 0.5) * 5,
            vy: -3 - Math.random() * 5,
            r: 1.5 + Math.random() * 2.5,
            a: 1,
            color: Math.random() > 0.4 ? '#f97316' : '#fde047',
            life: 80 + Math.random() * 50,
          });
        }
      } else if (themeId === 'study') {
        // Mechanical keypress glow wave
        for (let i = 0; i < 20; i++) {
          particlesRef.current.push({
            x: c.width * 0.5 + (Math.random() - 0.5) * 120,
            y: c.height * 0.7,
            vx: (Math.random() - 0.5) * 2,
            vy: -1.5 - Math.random() * 2,
            r: 2 + Math.random() * 3,
            a: 0.9,
            color: '#c084fc',
            life: 60,
          });
        }
      }
    }
  }, [burstTrigger, themeId]);

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

    // Init background stars
    starsRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.5),
      s: 0.8 + Math.random() * 1.5,
      a: 0.2 + Math.random() * 0.7,
    }));

    // Init raindrops
    rainDropsRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vy: 14 + Math.random() * 10,
      l: 12 + Math.random() * 16,
    }));

    let frameCount = 0;

    const render = () => {
      frameCount++;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // ============================================
      // 1. CAR DRIVING THEME: 3D Perspective Highway
      // ============================================
      if (themeId === 'cardrive') {
        roadOffsetRef.current = (roadOffsetRef.current + 7) % 60;
        const horizonY = h * 0.44;
        const vanishX = w * 0.5;

        // Distant city skyline silhouette & neon towers
        ctx.fillStyle = '#060a17';
        for (let i = 0; i < 16; i++) {
          const bW = 40 + (i % 5) * 15;
          const bH = 30 + ((i * 37) % 80);
          const bX = (w / 16) * i;
          ctx.fillRect(bX, horizonY - bH, bW, bH);
          // Neon window specks
          if (i % 2 === 0) {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.fillRect(bX + 8, horizonY - bH + 10, 4, 4);
            ctx.fillStyle = '#060a17';
          }
        }

        // Dark asphalt road polygon
        const roadBottomLeft = -w * 0.15;
        const roadBottomRight = w * 1.15;
        const roadTopLeft = vanishX - 25;
        const roadTopRight = vanishX + 25;

        ctx.fillStyle = '#0a0d16';
        ctx.beginPath();
        ctx.moveTo(roadBottomLeft, h);
        ctx.lineTo(roadTopLeft, horizonY);
        ctx.lineTo(roadTopRight, horizonY);
        ctx.lineTo(roadBottomRight, h);
        ctx.closePath();
        ctx.fill();

        // Shoulder Guardrail Glow Lines (Cyan / Blue neon highway lighting)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(roadBottomLeft, h);
        ctx.lineTo(roadTopLeft, horizonY);
        ctx.moveTo(roadBottomRight, h);
        ctx.lineTo(roadTopRight, horizonY);
        ctx.stroke();

        // Perspective Dashed Center Divider Lines rushing towards driver
        const numDashes = 10;
        for (let i = 0; i < numDashes; i++) {
          const t1 = Math.pow((i * 60 + roadOffsetRef.current) / (numDashes * 60), 2.2);
          const t2 = Math.pow((i * 60 + roadOffsetRef.current + 25) / (numDashes * 60), 2.2);
          if (t1 > 1 || t2 > 1) continue;

          const y1 = horizonY + (h - horizonY) * t1;
          const y2 = horizonY + (h - horizonY) * t2;
          const x1 = vanishX;
          const x2 = vanishX;
          const lineWidth = 1 + t1 * 6;

          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = lineWidth;
          ctx.globalAlpha = 0.3 + t1 * 0.7;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Passing Overhead Highway Streetlights
        for (let j = 0; j < 4; j++) {
          const progress = ((frameCount * 3 + j * 160) % 640) / 640;
          const poleT = Math.pow(progress, 2.5);
          const poleY = horizonY + (h - horizonY) * poleT;
          const poleX = vanishX - 200 * poleT - 40;
          const poleH = 70 * poleT + 10;

          if (poleT > 0.05) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = Math.max(1, poleT * 3);
            ctx.beginPath();
            ctx.moveTo(poleX, poleY);
            ctx.lineTo(poleX, poleY - poleH);
            ctx.stroke();

            // Streetlight head glow
            const radGrad = ctx.createRadialGradient(
              poleX,
              poleY - poleH,
              0,
              poleX,
              poleY - poleH,
              25 * poleT
            );
            radGrad.addColorStop(0, 'rgba(253, 224, 71, 0.8)');
            radGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
            ctx.fillStyle = radGrad;
            ctx.beginPath();
            ctx.arc(poleX, poleY - poleH, 25 * poleT, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Windshield Rain Streaks
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.2;
        rainDropsRef.current.forEach((r) => {
          r.y += r.vy;
          r.x += 1;
          if (r.y > h) {
            r.y = -20;
            r.x = Math.random() * w;
          }
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + 1.5, r.y + r.l);
          ctx.stroke();
        });

        // Windshield Wiper Blade Animation
        if (isWiping) {
          wiperAngleRef.current += 0.08 * wiperDirectionRef.current;
          if (wiperAngleRef.current > Math.PI * 0.6) wiperDirectionRef.current = -1;
          if (wiperAngleRef.current < 0) wiperDirectionRef.current = 1;

          const wiperPivotX1 = w * 0.35;
          const wiperPivotX2 = w * 0.65;
          const wiperPivotY = h;
          const wiperLen = Math.min(w * 0.38, 380);

          [wiperPivotX1, wiperPivotX2].forEach((px) => {
            const tipX = px + Math.cos(Math.PI - wiperAngleRef.current) * wiperLen;
            const tipY = wiperPivotY - Math.sin(wiperAngleRef.current) * wiperLen;

            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(px, wiperPivotY);
            ctx.lineTo(tipX, tipY);
            ctx.stroke();

            // Wiper rubber sweep arc
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px, wiperPivotY, wiperLen, Math.PI - wiperAngleRef.current - 0.2, Math.PI - wiperAngleRef.current + 0.2);
            ctx.stroke();
          });
        }
      }

      // ============================================
      // 2. STUDY THEME: Cozy Rain Desk & Windowpane
      // ============================================
      else if (themeId === 'study') {
        // Rain rivulets trickling down glass
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
        ctx.lineWidth = 1.4;
        rainDropsRef.current.slice(0, 45).forEach((r) => {
          r.y += r.vy * 0.4;
          if (r.y > h) {
            r.y = -10;
            r.x = Math.random() * w;
          }
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x, r.y + r.l * 0.8);
          ctx.stroke();
        });

        // Warm Desk Lamp Ambient Glow
        const lampX = w * 0.25;
        const lampY = h * 0.35;
        const lampGlow = ctx.createRadialGradient(lampX, lampY, 0, lampX, lampY, 320);
        lampGlow.addColorStop(0, 'rgba(250, 204, 21, 0.12)');
        lampGlow.addColorStop(0.5, 'rgba(192, 132, 252, 0.05)');
        lampGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = lampGlow;
        ctx.fillRect(0, 0, w, h);

        // Soft warm dust motes
        if (frameCount % 6 === 0 && particlesRef.current.length < 50) {
          particlesRef.current.push({
            x: Math.random() * w,
            y: h * 0.3 + Math.random() * (h * 0.5),
            vx: (Math.random() - 0.5) * 0.4,
            vy: -0.3 - Math.random() * 0.4,
            r: 1 + Math.random() * 1.5,
            a: 0.15 + Math.random() * 0.25,
            color: '#fef08a',
            life: 140,
          });
        }
      }

      // ============================================
      // 3. SLEEPER TRAIN: Passing Scenery & Telegraph Poles
      // ============================================
      else if (themeId === 'train') {
        // Horizontal passing mountains & stars
        starsRef.current.forEach((s) => {
          s.x = (s.x - 0.2 + w) % w;
          ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
          ctx.fill();
        });

        // Passing telegraph posts rushing horizontally
        const poleProgress = ((frameCount * 6) % (w * 1.4)) - 100;
        ctx.strokeStyle = '#051812';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(w - poleProgress, h * 0.7);
        ctx.lineTo(w - poleProgress, h * 0.3);
        ctx.stroke();

        // Crossbar & wires
        ctx.beginPath();
        ctx.moveTo(w - poleProgress - 25, h * 0.35);
        ctx.lineTo(w - poleProgress + 25, h * 0.35);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h * 0.35);
        ctx.quadraticCurveTo(w * 0.5, h * 0.38, w, h * 0.35);
        ctx.stroke();
      }

      // ============================================
      // 4. CAMPFIRE THEME: Dancing Flames & Floating Embers
      // ============================================
      else if (themeId === 'campfire') {
        // Stars
        starsRef.current.forEach((s) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
          ctx.fill();
        });

        // Continuous ember sparks rising from campfire
        if (frameCount % 3 === 0 && particlesRef.current.length < 80) {
          particlesRef.current.push({
            x: w * 0.5 + (Math.random() - 0.5) * 60,
            y: h * 0.84,
            vx: (Math.random() - 0.5) * 2,
            vy: -2 - Math.random() * 3,
            r: 1.5 + Math.random() * 2,
            a: 0.9,
            color: Math.random() > 0.3 ? '#f97316' : '#fde047',
            life: 110 + Math.random() * 60,
          });
        }
      }

      // ============================================
      // 5. CAFE & CHAI TAPRI: Steaming Aromatic Wisps
      // ============================================
      else {
        if (frameCount % 6 === 0 && particlesRef.current.length < 65) {
          particlesRef.current.push({
            x: w * 0.5 + (Math.random() - 0.5) * 40,
            y: h * 0.72,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -1 - Math.random() * 1.4,
            r: 10 + Math.random() * 14,
            a: 0.15,
            color: themeId === 'cafe' ? '#fde68a' : '#f2b877',
            life: 140,
          });
        }
      }

      // Render Active Particles across all themes
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life--;
        p.x += p.vx;
        p.y += p.vy;

        if (themeId === 'campfire' || themeId === 'cardrive') {
          // Sharp glowing ember dots
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.a * (p.life / 100));
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        } else {
          // Soft expanding steam puff
          p.r += 0.35;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.a * (p.life / 140));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        if (p.life <= 0 || p.y < -30) {
          particlesRef.current.splice(i, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [themeId, isWiping]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />;
};
