import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 'linear',
    title: 'LINEAR ALGORITHM',
    description:
      'CoreX builds a decision chain from every interaction. Each choice you make feeds forward into the next, creating a dynamic linear progression that adapts to your workflow in real-time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="4" cy="12" r="3" stroke="var(--color-accent)" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="var(--color-accent)" strokeWidth="1.5" />
        <circle cx="20" cy="12" r="3" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M7 12H9M15 12H17" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M4 9V6M4 15V18" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    size: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    id: 'assets',
    title: 'ASSET PIPELINE',
    description: 'Automated ingestion, versioning, and deployment of 3D assets across Unreal and Unity.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 8L12 3L21 8V16L12 21L3 16V8Z" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M12 12V21M3 8L12 12L21 8" stroke="var(--color-accent)" strokeWidth="1.5" />
      </svg>
    ),
    size: 'col-span-1 row-span-1',
  },
  {
    id: 'render',
    title: 'REAL-TIME RENDER',
    description: 'Direct render pipeline control for instant visual feedback on AI-assisted changes.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M10 9L15 12L10 15V9Z" fill="var(--color-accent)" />
      </svg>
    ),
    size: 'col-span-1 row-span-1',
  },
  {
    id: 'server',
    title: 'SERVER CLUSTER',
    description: 'Massive distributed compute across GPU clusters. Your tasks run in parallel, not in queue.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="8" height="8" rx="1" stroke="var(--color-accent)" strokeWidth="1.5" />
        <rect x="14" y="4" width="8" height="8" rx="1" stroke="var(--color-accent)" strokeWidth="1.5" />
        <rect x="2" y="14" width="8" height="8" rx="1" stroke="var(--color-accent)" strokeWidth="1.5" />
        <rect x="14" y="14" width="8" height="8" rx="1" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M10 8H14M8 14V10M16 14V10" stroke="var(--color-accent)" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    size: 'col-span-1 row-span-2',
  },
  {
    id: 'engines',
    title: 'UNREAL + UNITY',
    description: 'Dual-engine support with dedicated integration layers for both Unreal Engine 5 and Unity.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="9" height="16" rx="1" stroke="var(--color-accent)" strokeWidth="1.5" />
        <rect x="13" y="4" width="9" height="16" rx="1" stroke="var(--color-accent)" strokeWidth="1.5" />
        <path d="M6.5 12H9.5M14.5 12H17.5" stroke="var(--color-accent)" strokeWidth="1" />
      </svg>
    ),
    size: 'col-span-1 md:col-span-2 row-span-1',
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cells = gridRef.current!.querySelectorAll('.bento-cell');

      // Calculate transform-origin per cell
      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const containerRect = gridRef.current!.getBoundingClientRect();
        const xPercent = (rect.left - containerRect.left) / containerRect.width;
        const yPercent = (rect.top - containerRect.top) / containerRect.height;

        let originX = '50%';
        let originY = '50%';
        if (xPercent < 0.33) originX = '0%';
        else if (xPercent > 0.66) originX = '100%';
        if (yPercent < 0.33) originY = '0%';
        else if (yPercent > 0.66) originY = '100%';

        (cell as HTMLElement).style.transformOrigin = `${originX} ${originY}`;
      });

      gsap.fromTo(
        cells,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="capabilities" className="section-padding">
      <div className="content-max">
        <span
          className="block font-mono text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          WHAT COREX CAN DO
        </span>
        <h2
          className="font-display tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.9,
            color: 'var(--color-text-primary)',
          }}
        >
          Beyond Chat. Beyond Code.
        </h2>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-min gap-6 mt-12"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className={`bento-cell ${cap.size} p-8 transition-all duration-300 hover:-translate-y-1`}
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              }}
            >
              <div className="mb-4">{cap.icon}</div>
              <h3
                className="font-body text-base font-medium tracking-wide uppercase mb-3"
                style={{
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.08em',
                }}
              >
                {cap.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
