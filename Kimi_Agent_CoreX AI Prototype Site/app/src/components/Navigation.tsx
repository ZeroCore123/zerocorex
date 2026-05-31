import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'PHILOSOPHY', href: '#philosophy' },
  { label: 'ENGINE CLOUD', href: '#engine-cloud' },
  { label: 'STORAGE', href: '#storage' },
  { label: 'CAPABILITIES', href: '#capabilities' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace('#', ''));

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (sections.includes(st.vars.trigger as string)) {
          st.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const items = mobileMenuRef.current.querySelectorAll('.mobile-link');
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[500] h-16 flex items-center justify-between border-b"
        style={{
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          borderColor: 'var(--color-border)',
          padding: '0 var(--space-section-x)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          CORE<span style={{ color: 'var(--color-accent)' }}>X</span>
          <span
            className="text-[0.6rem] align-super ml-0.5"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            &reg;
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative font-body text-[0.8125rem] font-medium tracking-wide uppercase transition-colors duration-300 group"
              style={{
                color:
                  activeSection === link.href.replace('#', '')
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  transform:
                    activeSection === link.href.replace('#', '')
                      ? 'scaleX(1)'
                      : 'scaleX(0)',
                  transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                }}
              />
              <span
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
                }}
              />
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#prelaunch"
            onClick={(e) => handleLinkClick(e, '#prelaunch')}
            className="hidden md:inline-flex font-body text-xs font-medium tracking-[0.06em] uppercase px-6 py-2.5 transition-all duration-300 hover:shadow-accent-glow"
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
            GET EARLY ACCESS
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Menu"
          >
            <span
              className="block w-6 h-[2px] transition-all duration-300"
              style={{
                background: 'var(--color-text-primary)',
                transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[2px] transition-all duration-300"
              style={{
                background: 'var(--color-text-primary)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[2px] transition-all duration-300"
              style={{
                background: 'var(--color-text-primary)',
                transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[600] flex flex-col items-center justify-center gap-8"
          style={{ background: 'var(--color-bg-primary)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="mobile-link font-display text-4xl tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#prelaunch"
            onClick={(e) => handleLinkClick(e, '#prelaunch')}
            className="mobile-link mt-4 font-body text-sm font-medium tracking-[0.06em] uppercase px-8 py-3"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-white)',
            }}
          >
            GET EARLY ACCESS
          </a>
        </div>
      )}
    </>
  );
}
