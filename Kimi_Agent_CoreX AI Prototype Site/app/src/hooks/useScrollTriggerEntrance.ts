import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerEntranceOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  rotateX?: number;
}

export function useScrollTriggerEntrance(
  options: ScrollTriggerEntranceOptions = {}
) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const {
    y = 60,
    x = 0,
    duration = 1,
    delay = 0,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 75%',
    rotateX = 0,
  } = options;

  useEffect(() => {
    if (reduced || !ref.current) return;

    const elements = ref.current.children.length > 0
      ? Array.from(ref.current.children)
      : [ref.current];

    const fromVars: gsap.TweenVars = {
      y,
      x,
      opacity: 0,
    };

    if (rotateX !== 0) {
      fromVars.rotateX = rotateX;
      ref.current.style.perspective = '1000px';
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        fromVars,
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced, y, x, duration, delay, stagger, ease, start, rotateX]);

  return ref;
}
