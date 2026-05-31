export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-bg-secondary)',
        borderColor: 'var(--color-border)',
        padding: '48px var(--space-section-x)',
      }}
    >
      {/* Row 1 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            className="font-display text-xl tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            CORE<span style={{ color: 'var(--color-accent)' }}>X</span>
          </span>
          <span
            className="font-mono text-xs tracking-[0.12em]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            by Binary Core
          </span>
        </div>
        <div className="flex items-center gap-6">
          {['Discord', 'GitHub', 'X'].map((social) => (
            <a
              key={social}
              href="#"
              className="font-mono text-xs tracking-[0.12em] uppercase transition-colors duration-300"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
              }}
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8">
        <div className="flex flex-wrap items-center gap-6">
          {['Philosophy', 'Engine Cloud', 'Storage', 'Capabilities'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="font-body text-sm transition-colors duration-300"
              style={{ color: 'var(--color-text-tertiary)' }}
              onClick={(e) => {
                e.preventDefault();
                const id = link.toLowerCase().replace(' ', '-');
                const target = document.getElementById(
                  id === 'philosophy' ? 'philosophy' : id === 'engine-cloud' ? 'engine-cloud' : id === 'storage' ? 'storage' : 'capabilities'
                );
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)';
              }}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-xs tracking-[0.12em] uppercase transition-colors duration-300"
              style={{ color: 'var(--color-text-tertiary)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)';
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Row 3 */}
      <div className="text-center mt-10">
        <div
          className="mx-auto mb-4"
          style={{
            width: 40,
            height: 1,
            background: 'var(--color-border)',
          }}
        />
        <p
          className="font-mono text-[0.7rem] tracking-[0.1em]"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          &copy; 2025 Binary Core. All rights reserved. CoreX is a trademark of Binary Core.
        </p>
      </div>
    </footer>
  );
}
