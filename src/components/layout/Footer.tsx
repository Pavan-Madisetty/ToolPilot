import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { MODULES } from '@/config/modules';
import { LIVE_TOOL_COUNT } from '@/config/tools';

const POPULAR = [
  { label: 'EMI Calculator', to: '/finance/emi-calculator' },
  { label: 'JSON Formatter', to: '/developer/json-formatter' },
  { label: 'Merge PDF', to: '/pdf/merge' },
  { label: 'QR Code Generator', to: '/image/qr-generator' },
  { label: 'Word Counter', to: '/text/word-counter' },
  { label: 'Password Generator', to: '/developer/password-generator' },
];

const COMPANY = [
  { label: 'About', to: '/about' },
  { label: 'Contact & support', to: '/contact' },
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms of service', to: '/terms' },
];

export function Footer() {
  const half = Math.ceil(MODULES.length / 2);
  return (
    <footer className="sk-footer" role="contentinfo">
      <div className="sk-container">
        <div className="sk-footer__grid">
          <div className="sk-footer__brand">
            <Link to="/" className="sk-logo sk-logo--light" aria-label="Toolskyt — home">
              <span className="sk-logo__mark" aria-hidden="true">T</span>
              <span className="sk-logo__word">Tool<span>skyt</span></span>
            </Link>
            <p>
              {LIVE_TOOL_COUNT} free tools for finance, development, documents and everyday work.
              Everything runs in your browser, so your files and data stay on your device.
            </p>
            <div className="sk-footer__trust">
              <ShieldCheck size={16} aria-hidden="true" /> No sign-up · No uploads · No tracking
            </div>
          </div>

          <nav aria-label="Categories" className="sk-footer__col">
            <h2>Categories</h2>
            <ul>
              {MODULES.slice(0, half).map((m) => (
                <li key={m.key}><Link to={m.slug}>{m.name}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More categories" className="sk-footer__col">
            <h2 aria-hidden="true">&nbsp;</h2>
            <ul>
              {MODULES.slice(half).map((m) => (
                <li key={m.key}><Link to={m.slug}>{m.name}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular tools" className="sk-footer__col">
            <h2>Popular tools</h2>
            <ul>
              {POPULAR.map((p) => (
                <li key={p.to}><Link to={p.to}>{p.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="sk-footer__col">
            <h2>Company</h2>
            <ul>
              {COMPANY.map((p) => (
                <li key={p.to}><Link to={p.to}>{p.label}</Link></li>
              ))}
              <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a></li>
            </ul>
          </nav>
        </div>

        <div className="sk-footer__bar">
          <span>© {new Date().getFullYear()} Toolskyt. All rights reserved.</span>
          <a
            href="https://github.com/Pavan-Madisetty/ToolPilot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Toolskyt on GitHub"
            className="sk-footer__gh"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>{' '}GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
