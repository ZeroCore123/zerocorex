import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function PreLaunchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const badge = contentRef.current!.querySelector('.status-badge');
      const animateEls = contentRef.current!.querySelectorAll('.animate-in');

      if (badge) {
        gsap.fromTo(
          badge,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        animateEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="prelaunch"
      className="relative section-padding text-center"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Top crimson line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          background: 'var(--color-accent)',
        }}
      />

      <div ref={contentRef} className="content-max mx-auto">
        {/* Status Badge */}
        <div
          className="status-badge inline-block font-mono text-xs tracking-[0.1em] uppercase px-5 py-2"
          style={{
            border: '1px solid var(--color-accent)',
            color: 'var(--color-accent)',
            opacity: reduced ? 1 : 0,
          }}
        >
          UNDER ACTIVE DEVELOPMENT
        </div>

        <h2
          className="animate-in font-display tracking-tight mt-8"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.9,
            color: 'var(--color-text-primary)',
          }}
        >
          THE FUTURE IS BEING BUILT.
        </h2>

        <p
          className="animate-in max-w-[560px] mx-auto mt-4"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
          }}
        >
          CoreX is currently in closed development. Join our early access list to be among the
          first to experience a new kind of AI — one that works with you, inside your tools, at
          the speed of thought.
        </p>

        {/* Email Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="animate-in flex flex-col sm:flex-row items-center justify-center gap-0 mt-10 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full sm:w-auto flex-1 font-body text-sm px-5 py-3.5 outline-none transition-colors duration-300 focus:border-corex-accent"
              style={{
                background: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                minWidth: 0,
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              }}
            />
            <button
              type="submit"
              className="w-full sm:w-auto font-mono text-xs tracking-[0.08em] uppercase px-7 py-3.5 font-medium transition-colors duration-300 whitespace-nowrap"
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
              GET NOTIFIED
            </button>
          </form>
        ) : (
          <div
            className="animate-in inline-flex items-center gap-3 mt-10 px-8 py-4"
            style={{
              background: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="var(--color-success)" strokeWidth="1.5" />
              <path d="M6 10L9 13L14 7" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              className="font-body text-sm"
              style={{ color: 'var(--color-text-primary)' }}
            >
              You're on the list. We'll be in touch.
            </span>
          </div>
        )}

        <p
          className="animate-in font-mono text-xs tracking-[0.12em] mt-5"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
