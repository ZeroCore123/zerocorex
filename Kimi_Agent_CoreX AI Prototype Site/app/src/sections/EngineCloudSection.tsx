import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function EngineCloudSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current!.querySelectorAll('.engine-card');
      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
          rotateX: 8,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="engine-cloud"
      className="relative section-padding"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/engine-cloud-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.9) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[1] max-w-[1080px] mx-auto">
        <span
          className="block font-mono text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          COREX CLOUD
        </span>
        <h2
          className="font-display tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.9,
            color: 'var(--color-text-primary)',
          }}
        >
          Your <span style={{ color: 'var(--color-accent)' }}>Engines</span>. Our Cloud.
        </h2>
        <p
          className="mt-4 max-w-[560px]"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
          }}
        >
          Direct pipeline access to Unreal Engine 5 and Unity. CoreX doesn't just suggest code —
          it operates inside your creative environment, manipulating assets, scenes, and render
          pipelines in real-time.
        </p>

        {/* Engine Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
          style={{ perspective: '1000px' }}
        >
          {/* Unreal Engine Card */}
          <div
            className="engine-card p-12 transition-all duration-400"
            style={{
              background: 'rgba(17, 17, 17, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--color-border)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--color-border-hover)';
              el.style.transform = 'translateY(-6px)';
              el.style.boxShadow = '0 20px 60px rgba(200, 16, 46, 0.15)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--color-border)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Unreal Icon */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-6">
              <path
                d="M24 4L8 14V34L24 44L40 34V14L24 4Z"
                stroke="var(--color-text-primary)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M24 12L16 17V31L24 36L32 31V17L24 12Z"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="24" cy="24" r="4" fill="var(--color-text-primary)" />
            </svg>
            <h3
              className="font-body text-base font-medium tracking-wide uppercase"
              style={{
                color: 'var(--color-text-primary)',
                letterSpacing: '0.08em',
              }}
            >
              UNREAL ENGINE 5
            </h3>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              Full Blueprint and C++ integration. Real-time scene manipulation, Niagara VFX control,
              and MetaHuman pipeline access.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span
                className="inline-block rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: 'var(--color-success)',
                  boxShadow: '0 0 8px rgba(0,200,83,0.4)',
                }}
              />
              <span
                className="font-mono text-[0.65rem] tracking-[0.12em] uppercase"
                style={{ color: 'var(--color-success)' }}
              >
                LIVE CONNECTION
              </span>
            </div>
          </div>

          {/* Unity Engine Card */}
          <div
            className="engine-card p-12 transition-all duration-400"
            style={{
              background: 'rgba(17, 17, 17, 0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--color-border)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--color-border-hover)';
              el.style.transform = 'translateY(-6px)';
              el.style.boxShadow = '0 20px 60px rgba(200, 16, 46, 0.15)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--color-border)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            {/* Unity Icon */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-6">
              <rect
                x="8"
                y="8"
                width="32"
                height="32"
                stroke="var(--color-text-primary)"
                strokeWidth="2"
                fill="none"
              />
              <rect
                x="14"
                y="14"
                width="20"
                height="20"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="6"
                stroke="var(--color-text-primary)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <h3
              className="font-body text-base font-medium tracking-wide uppercase"
              style={{
                color: 'var(--color-text-primary)',
                letterSpacing: '0.08em',
              }}
            >
              UNITY ENGINE
            </h3>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
              }}
            >
              C# scripting, Shader Graph manipulation, and direct prefab/asset pipeline control
              across all Unity render pipelines.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span
                className="inline-block rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: 'var(--color-success)',
                  boxShadow: '0 0 8px rgba(0,200,83,0.4)',
                }}
              />
              <span
                className="font-mono text-[0.65rem] tracking-[0.12em] uppercase"
                style={{ color: 'var(--color-success)' }}
              >
                LIVE CONNECTION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
