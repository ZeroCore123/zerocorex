import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function StorageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Counter count-up (scroll-scrubbed)
      if (counterRef.current) {
        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: '+=300',
            scrub: true,
          },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(proxy.value).toString();
            }
          },
        });
      }

      // Content fade-in
      if (contentRef.current) {
        const els = contentRef.current.querySelectorAll('.animate-in');
        gsap.fromTo(
          els,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
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
      id="storage"
      className="section-padding"
      style={{ background: 'var(--color-bg-secondary)', textAlign: 'center' }}
    >
      <div ref={contentRef}>
        <span
          className="animate-in block font-mono text-xs tracking-[0.25em] uppercase mb-6"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          STORAGE THAT RESPECTS YOUR WORK
        </span>

        {/* Big Number */}
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(6rem, 18vw, 16rem)',
            lineHeight: 0.85,
            color: 'var(--color-accent)',
            textShadow: '0 0 80px var(--color-accent-glow)',
          }}
        >
          <span ref={counterRef}>{reduced ? '1' : '0'}</span>
          <span>TB</span>
        </div>

        <h3
          className="animate-in font-body text-base font-medium uppercase mt-4"
          style={{
            letterSpacing: '0.15em',
            color: 'var(--color-text-primary)',
          }}
        >
          FREE FOREVER
        </h3>

        <p
          className="animate-in max-w-[520px] mx-auto mt-5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
          }}
        >
          Every CoreX account starts with 1 terabyte of asset storage at no cost. Store your models,
          textures, animations, and project files. Your creative library, always available, always
          free.
        </p>

        {/* Highlight Card */}
        <div
          className="animate-in inline-flex items-center gap-3 mt-12"
          style={{
            background: 'var(--color-bg-tertiary)',
            border: '1px solid var(--color-border)',
            padding: '20px 32px',
          }}
        >
          {/* Shield checkmark icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L3 5V10C3 14.5 6 17.5 10 18.5C14 17.5 17 14.5 17 10V5L10 2Z"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M7 10L9.5 12.5L13.5 7.5"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="font-body text-sm"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Installed plugins and engine integrations do not count toward your storage limit.
          </span>
        </div>
      </div>
    </section>
  );
}
