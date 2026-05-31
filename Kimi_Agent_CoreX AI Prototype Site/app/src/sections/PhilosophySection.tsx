import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sub1Ref = useRef<HTMLDivElement>(null);
  const sub2Ref = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subsection 1 entrance
      if (sub1Ref.current) {
        const els = sub1Ref.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          els,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sub1Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subsection 2 entrance
      if (sub2Ref.current) {
        const els = sub2Ref.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          els,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sub2Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Clip-path text reveal (scrubbed)
      if (revealRef.current && underlineRef.current && manifestoRef.current) {
        gsap.fromTo(
          revealRef.current,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top bottom',
              end: '+200px top',
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          underlineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top bottom',
              end: '+200px top',
              scrub: 1,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-padding"
    >
      <div className="content-max">
        {/* Subsection 1 — The Problem */}
        <div ref={sub1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <span
              className="animate-in block font-mono text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              01 / THE OLD PARADIGM
            </span>
            <h2
              className="animate-in font-display tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.9,
                color: 'var(--color-text-primary)',
              }}
            >
              STATIC. CLOSED. LIMITED.
            </h2>
            <p
              className="animate-in mt-5 max-w-[640px]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              Traditional AI operates on fixed training data and predetermined response patterns.
              It cannot adapt to real-time user intent, cannot leverage external creative tools, and
              treats every interaction as an isolated event. The loop is closed — and so is the
              potential.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            {/* Closed loop diagram */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="animate-in">
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
                strokeDasharray="8 4"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="1.5"
                strokeDasharray="440"
                strokeDashoffset="0"
                style={{
                  animation: 'spin 20s linear infinite',
                  transformOrigin: 'center',
                }}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 100 100"
                  to="360 100 100"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>
              <rect
                x="85"
                y="85"
                width="30"
                height="30"
                fill="none"
                stroke="var(--color-text-tertiary)"
                strokeWidth="1.5"
                rx="2"
              />
              <path
                d="M100 70 L100 55 M100 145 L100 130 M70 100 L55 100 M145 100 L130 100"
                stroke="var(--color-text-tertiary)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Lock icon */}
              <rect x="92" y="38" width="16" height="12" rx="2" fill="var(--color-text-tertiary)" />
              <path d="M96 38V34a4 4 0 018 0v4" stroke="var(--color-text-tertiary)" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Subsection 2 — The Solution */}
        <div ref={sub2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-32">
          <div>
            <span
              className="animate-in block font-mono text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              02 / THE COREX PARADIGM
            </span>
            <h2
              className="animate-in font-display tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 0.9,
                color: 'var(--color-accent)',
              }}
            >
              LINEAR. OPEN. INFINITE.
            </h2>
            <p
              className="animate-in mt-5 max-w-[640px]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              CoreX introduces a user-dependent linear algorithm — each decision you make feeds
              forward into the next, creating a dynamic chain of assisted intelligence. With direct
              access to Unreal Engine and Unity through CoreX Cloud, your creative vision isn't
              described to the AI. It IS the AI's operating environment.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            {/* Open loop diagram */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="animate-in">
              <path
                d="M30 100 Q30 30 100 30 Q170 30 170 100"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M170 100 Q170 170 100 170"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 4"
              />
              {/* Arrow head */}
              <polygon
                points="165,92 178,100 165,108"
                fill="var(--color-accent)"
              />
              {/* Central node */}
              <circle cx="100" cy="100" r="20" fill="var(--color-bg-secondary)" stroke="var(--color-accent)" strokeWidth="2" />
              <circle cx="100" cy="100" r="6" fill="var(--color-accent)" />
              {/* Orbiting dots */}
              <circle cx="100" cy="30" r="4" fill="var(--color-accent)">
                <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="170" cy="100" r="4" fill="var(--color-accent)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>

        {/* Manifesto — Clip-path text reveal */}
        <div
          ref={manifestoRef}
          className="relative"
          style={{ padding: '120px 0', overflow: 'hidden' }}
        >
          {/* Base text (static, visible) */}
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.9,
              color: 'var(--color-text-primary)',
              opacity: 0.15,
            }}
          >
            THE LOOP IS OPEN.
          </div>
          {/* Revealing text (clip-path animated) */}
          <div
            ref={revealRef}
            className="font-display absolute"
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.9,
              color: 'var(--color-text-primary)',
              top: 120,
              left: 0,
              clipPath: reduced ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)',
            }}
          >
            THE LOOP IS OPEN.
          </div>
          {/* Underline */}
          <div
            ref={underlineRef}
            className="absolute"
            style={{
              bottom: 100,
              left: 0,
              width: '100%',
              height: 4,
              background: 'var(--color-accent)',
              transformOrigin: 'left',
              transform: reduced ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
