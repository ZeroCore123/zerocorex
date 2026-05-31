import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const items = [
  'LINEAR ALGORITHM',
  'USER-ASSISTED DECISIONS',
  'MASSIVE SERVER ASSETS',
  'UNREAL ENGINE INTEGRATION',
  'UNITY ENGINE CLOUD',
  '1TB FREE STORAGE',
  'PLUGIN-EXCLUSIVE SPACE',
];

export default function MarqueeSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        end: 'bottom 10%',
        onEnter: () => {
          if (trackRef.current) {
            trackRef.current.style.animationDuration = '12s';
          }
        },
        onLeave: () => {
          if (trackRef.current) {
            trackRef.current.style.animationDuration = '25s';
          }
        },
        onEnterBack: () => {
          if (trackRef.current) {
            trackRef.current.style.animationDuration = '12s';
          }
        },
        onLeaveBack: () => {
          if (trackRef.current) {
            trackRef.current.style.animationDuration = '25s';
          }
        },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  const renderItems = () => {
    return items.map((item, i) => (
      <span key={i} className="flex items-center shrink-0">
        <span
          className="font-mono text-base tracking-[0.2em] uppercase whitespace-nowrap px-10"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {item}
        </span>
        <span
          className="shrink-0 text-lg"
          style={{ color: 'var(--color-accent)' }}
        >
          &#9733;
        </span>
      </span>
    ));
  };

  if (reduced) {
    return (
      <div
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
        style={{
          padding: '14px 0',
          background: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden"
      style={{
        padding: '14px 0',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center whitespace-nowrap animate-marquee"
      >
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  );
}
