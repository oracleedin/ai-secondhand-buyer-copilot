import { useEffect, useRef, useState } from 'react';

interface FloatingBlob {
  id: number;
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  gradient: string;
}

const floatingBlobs: FloatingBlob[] = [
  {
    id: 1,
    size: 600,
    x: '10%',
    y: '20%',
    duration: 25,
    delay: 0,
    gradient: 'radial-gradient(ellipse at center, rgba(115, 66, 226, 0.18) 0%, transparent 70%)',
  },
  {
    id: 2,
    size: 500,
    x: '70%',
    y: '60%',
    duration: 30,
    delay: -10,
    gradient: 'radial-gradient(ellipse at center, rgba(99, 179, 237, 0.15) 0%, transparent 70%)',
  },
  {
    id: 3,
    size: 700,
    x: '40%',
    y: '80%',
    duration: 35,
    delay: -5,
    gradient: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
  },
];

export default function AnimatedHeroBackground() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [glowPos, setGlowPos] = useState({ x: 0.5, y: 0.5 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    const handleMouseEnter = () => setIsMouseInSection(true);
    const handleMouseLeave = () => setIsMouseInSection(false);

    const animate = () => {
      mouseRef.current.x += (glowPos.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (glowPos.y - mouseRef.current.y) * 0.08;
      setGlowPos({ x: mouseRef.current.x, y: mouseRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [glowPos]);

  return (
    <div ref={sectionRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient - cool gray/blue */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #f0f2f5 0%, #e8ecf0 25%, #e2e6ed 50%, #dfe3ea 75%, #f0f2f5 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Floating blurred blobs */}
      {floatingBlobs.map((blob) => (
        <div
          key={blob.id}
          className="absolute rounded-full will-change-transform"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: blob.gradient,
            filter: 'blur(80px)',
            opacity: 0.8,
            animation: `blobFloat${blob.id} ${blob.duration}s ease-in-out infinite`,
            animationDelay: `${blob.delay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Mouse-following glow - desktop only */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: isMouseInSection
            ? `radial-gradient(circle 400px at ${glowPos.x * 100}% ${glowPos.y * 100}%, rgba(139, 92, 246, 0.13) 0%, rgba(168, 85, 247, 0.06) 40%, transparent 70%)`
            : 'transparent',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Subtle light streak */}
      <div
        className="absolute top-0 right-1/4 w-px h-full"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
          opacity: 0.4,
        }}
      />

      <style>{`
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px); }
          33% { transform: translate(-50%, -50%) translate(120px, -80px); }
          66% { transform: translate(-50%, -50%) translate(-50px, 60px); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px); }
          50% { transform: translate(-50%, -50%) translate(-100px, 60px); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px); }
          40% { transform: translate(-50%, -50%) translate(80px, 100px); }
          70% { transform: translate(-50%, -50%) translate(-60px, 40px); }
        }
      `}</style>
    </div>
  );
}