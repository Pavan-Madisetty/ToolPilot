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
  { label: 'All tools (A–Z)', to: '/all-tools' },
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
        </div>
      </div>
    </footer>
  );
}
