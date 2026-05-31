import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useParticleCanvas } from '../hooks/useParticleCanvas';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function HeroSection() {
  const { canvasRef, containerRef } = useParticleCanvas();
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(line1Ref.current, {
      y: 0,
      duration: 1.2,
      ease: 'expo.out',
    })
      .to(
        line2Ref.current,
        {
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        },
        '-=1.08'
      )
      .to(
        line3Ref.current,
        {
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        },
        '-=1.08'
      )
      .to(
        subRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        cardRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      .to(
        markRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(5rem, 15vw, 14rem)',
    lineHeight: 0.85,
    letterSpacing: '-0.02em',
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Particle Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'auto',
          }}
        />
      </div>

      {/* Bottom gradient for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, var(--color-bg-primary) 0%, transparent 40%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] w-full grid grid-cols-1 md:grid-cols-[55%_45%] items-center"
        style={{
          padding: '120px var(--space-section-x) 60px',
          minHeight: '100dvh',
        }}
      >
        {/* Left Zone */}
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
            }}
          >
            <span
              className="inline-block"
              style={{
                width: 8,
                height: 2,
                background: 'var(--color-accent)',
              }}
            />
            BINARY CORE PRESENTS
          </div>

          {/* Headline */}
          <div className="overflow-hidden">
            <div
              ref={line1Ref}
              style={{
                ...headlineStyle,
                color: 'var(--color-text-primary)',
                transform: reduced ? 'translateY(0)' : 'translateY(120%)',
              }}
            >
              MEET THE
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={line2Ref}
              style={{
                ...headlineStyle,
                color: 'var(--color-text-primary)',
                transform: reduced ? 'translateY(0)' : 'translateY(120%)',
              }}
            >
              END OF
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              ref={line3Ref}
              style={{
                ...headlineStyle,
                color: 'var(--color-accent)',
                transform: reduced ? 'translateY(0)' : 'translateY(120%)',
                textShadow: '0 0 40px rgba(10, 10, 10, 0.8)',
              }}
            >
              AI REALITY
            </div>
          </div>

          {/* Sub-headline */}
          <p
            ref={subRef}
            className="max-w-[480px] mt-8"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              opacity: reduced ? 1 : 0,
              transform: reduced ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            The first AI with a user-dependent linear algorithm. CoreX doesn't just respond — it
            evolves through every decision you make.
          </p>

          {/* CTA Group */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 mt-10"
            style={{
              opacity: reduced ? 1 : 0,
              transform: reduced ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <button
              onClick={() => scrollToSection('#prelaunch')}
              className="font-body text-sm font-medium tracking-[0.06em] uppercase px-9 py-3.5 transition-all duration-300 hover:shadow-accent-glow hover:-translate-y-0.5"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-white)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)';
              }}
            >
              Join Early Access
            </button>
            <button
              onClick={() => scrollToSection('#philosophy')}
              className="font-body text-sm font-medium tracking-[0.06em] uppercase px-7 py-3 border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'transparent',
                color: 'var(--color-text-primary)',
                borderColor: 'var(--color-border)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px var(--color-accent-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Zone */}
        <div className="hidden md:flex flex-col items-center justify-center">
          {/* Counter Badge */}
          <div
            ref={cardRef}
            className="flex flex-col items-center justify-center transition-all duration-400"
            style={{
              width: 240,
              height: 240,
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              opacity: reduced ? 1 : 0,
              transform: reduced ? 'scale(1)' : 'scale(0.9)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
            }}
          >
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              PRE-REGISTERED
            </span>
            <span
              className="font-display my-2"
              style={{
                fontSize: '5rem',
                lineHeight: 1,
                color: 'var(--color-accent)',
              }}
            >
              50+
            </span>
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              PIONEERS
            </span>
          </div>

          {/* Binary Core Mark */}
          <div
            ref={markRef}
            className="flex items-start gap-4 mt-8"
            style={{
              opacity: reduced ? 1 : 0,
            }}
          >
            <div
              className="mt-1"
              style={{
                width: 2,
                height: 32,
                background: 'var(--color-accent)',
              }}
            />
            <div>
              <div
                className="font-body text-sm font-light"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Binary
              </div>
              <div
                className="font-display text-2xl tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                CORE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-10 left-0 right-0 z-[2] flex flex-col items-center gap-3"
      >
        <div
          className="w-full"
          style={{
            height: 1,
            background: 'var(--color-border)',
          }}
        />
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          className="animate-bounce-subtle mt-2"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </section>
  );
}
