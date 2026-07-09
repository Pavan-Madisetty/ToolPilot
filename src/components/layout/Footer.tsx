import { Link } from 'react-router-dom';
import { MODULES } from '@/config/modules';
import { TOTAL_TOOL_COUNT } from '@/config/tools';

export function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    'Popular Tools': [
      { label: 'EMI Calculator', href: '/finance/emi-calculator' },
      { label: 'SIP Calculator', href: '/finance/sip-calculator' },
      { label: 'GST Calculator', href: '/finance/gst-calculator' },
      { label: 'JSON Formatter', href: '/developer/json-formatter' },
      { label: 'Word Counter', href: '/text/word-counter' },
      { label: 'QR Generator', href: '/image/qr-generator' },
      { label: 'BMI Calculator', href: '/health/bmi-calculator' },
      { label: 'Age Calculator', href: '/education/age-calculator' },
    ],
    'Modules': MODULES.slice(0, 8).map((m) => ({
      label: m.name,
      href: m.slug,
    })),
    'Company': [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  };

  return (
    <footer
      className="mt-auto border-t"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-3 lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-bold text-xl mb-4"
              aria-label="ToolPilot home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' }}
                aria-hidden="true"
              >
                T
              </div>
              <span style={{ color: 'var(--text-primary)' }}>
                Tool<span style={{ color: '#3B82F6' }}>Pilot</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-4 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              The world's largest browser-based productivity platform with {TOTAL_TOOL_COUNT}+ free tools.
              No signup. No tracking. Always free.
            </p>

            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#16A34A' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true" />
                100% Free Forever
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-sm font-semibold mb-4 tracking-wide"
                style={{ color: 'var(--text-primary)' }}
              >
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors duration-150 hover:text-blue-500"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <div className="container-app py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © {year} ToolPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span>Made with ❤️ for productivity</span>
            <Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-500 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
