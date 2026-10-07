import React, { useMemo } from 'react';
import type { SceneMode } from './ExperienceShell';

interface AmbientEffectsProps { scene: SceneMode; isPlaying: boolean; intensity: 'full' | 'calm' | 'off'; }

const PARTICLES = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 37) % 101, top: (i * 61) % 91, size: 1 + (i % 4),
  delay: -((i * 0.73) % 9), duration: 7 + (i % 7),
}));

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ scene, isPlaying, intensity }) => {
  const speed = intensity === 'calm' ? '1.7' : '1';
  if (intensity === 'off') return null;
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true" style={{ ['--fx-speed' as string]: speed }}>
      <div className={'absolute inset-0 transition-opacity duration-700 ' + (isPlaying ? 'opacity-100' : 'opacity-55')}>
        {(scene === 'monsoon' || scene === 'ocean') && (
          <div className={'rain-field ' + (scene === 'ocean' ? 'rain-field-ocean' : '')}>
            {Array.from({ length: scene === 'monsoon' ? 42 : 18 }, (_, i) => (
              <i key={i} style={{ left: ((i * 19) % 100) + '%', animationDelay: (-(i % 11) * .23) + 's', animationDuration: (.75 + (i % 5) * .12) + 's' }} />
            ))}
          </div>
        )}

        {scene === 'ocean' && <div className="ocean-waves"><span /><span /><span /></div>}

        {scene === 'forest' && (
          <div className="firefly-field">{particles.slice(0, 18).map((p, i) => (
            <b key={i} style={{ left: p.left + '%', top: p.top + '%', width: p.size, height: p.size, animationDelay: p.delay + 's', animationDuration: p.duration + 's' }} />
          ))}</div>
        )}

        {scene === 'aurora' && <div className="aurora-ribbons"><span /><span /><span /></div>}

        {scene === 'neon' && <div className="neon-grid"><span /><span /><span /><span /><span /></div>}

        {(scene === 'dusk' || scene === 'pahadi') && <div className="cloud-field"><span /><span /><span /></div>}

        {scene === 'midnight' && (
          <div className="star-field">{particles.slice(0, 26).map((p, i) => (
            <i key={i} style={{ left: p.left + '%', top: p.top + '%', animationDelay: p.delay + 's', animationDuration: p.duration + 's' }} />
          ))}</div>
        )}

        <div className={'focus-aura ' + (isPlaying ? 'focus-aura-playing' : '')} />
      </div>
    </div>
  );
};
