import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOL_COUNT_LABEL } from '@/config/tools';
import { useUIStore } from '@/stores/uiStore';

export function Footer() {
  const year = new Date().getFullYear();
  const { addToast } = useUIStore();
  const [email, setEmail] = useState('');

  const popularTools = [
    { label: 'EMI Calculator', href: '/finance/emi-calculator' },
    { label: 'SIP Calculator', href: '/finance/sip-calculator' },
    { label: 'GST Calculator', href: '/finance/gst-calculator' },
    { label: 'JSON Formatter', href: '/developer/json-formatter' },
    { label: 'Word Counter', href: '/text/word-counter' },
    { label: 'QR Generator', href: '/image/qr-generator' },
    { label: 'BMI Calculator', href: '/health/bmi-calculator' },
    { label: 'Age Calculator', href: '/education/age-calculator' },
  ];

  const modules = [
    { label: 'Finance', href: '/finance' },
    { label: 'Developer', href: '/developer' },
    { label: 'PDF Tools', href: '/pdf' },
    { label: 'Image Tools', href: '/image' },
    { label: 'Text Tools', href: '/text' },
    { label: 'AI Writing', href: '/ai' },
    { label: 'Business', href: '/business' },
    { label: 'Productivity', href: '/productivity' },
  ];

  const company = [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact', href: '/contact' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    addToast({
      type: 'success',
      title: 'Subscribed Successfully',
      message: `You have joined the ToolPilot newsletter as ${email.trim()}!`,
    });
    setEmail('');
  };

  return (
    <footer
      className="mt-auto border-t"
      style={{
        borderColor: 'var(--border-default)',
        background: 'var(--bg-surface)',
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-bold text-xl mb-4"
              aria-label="ToolPilot home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
                style={{ background: 'var(--primary)' }}
                aria-hidden="true"
              >
                T
              </div>
              <span style={{ color: 'var(--text-primary)' }}>
                Tool<span style={{ color: 'var(--primary)' }}>Pilot</span>
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed mb-4 max-w-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              The world's largest browser-based productivity platform with {TOOL_COUNT_LABEL} free
              tools. No signup. No tracking. Always free.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#16A34A' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
                  aria-hidden="true"
                />
                100% Free Forever
              </span>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletterSubmit} className="mb-6 flex flex-col gap-2 max-w-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                Subscribe to updates
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-base"
                  style={{ height: '36px', fontSize: '13px' }}
                  required
                  aria-label="Newsletter email address"
                />
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer"
                  style={{ height: '36px', paddingInline: '12px', fontSize: '13px' }}
                >
                  Join
                </button>
              </div>
            </form>

            {/* Social Icons — plain, no borders */}
            <div className="flex items-center gap-4">
              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="transition-colors hover:text-[var(--text-link)]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-[var(--text-link)]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Popular Tools — 2 sub-columns */}
          <div className="lg:col-span-3">
            <h3
              className="text-sm font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              Popular Tools
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {popularTools.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm transition-colors duration-150 hover:text-[var(--text-link)]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Modules — 2 sub-columns */}
          <div className="lg:col-span-3">
            <h3
              className="text-sm font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              Modules
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {modules.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm transition-colors duration-150 hover:text-[var(--text-link)]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company — 2 sub-columns */}
          <div className="lg:col-span-3">
            <h3
              className="text-sm font-semibold mb-4 tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              Company
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {company.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm transition-colors duration-150 hover:text-[var(--text-link)]"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: 'var(--border-default)' }}>
        <div
          className="container-app py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <p>© {year} ToolPilot. All rights reserved.</p>
          <p className="flex-1 text-center hidden sm:block">
            Made with <span className="text-rose-500">❤️</span> for productivity
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/privacy"
              className="underline underline-offset-2 hover:text-[var(--text-link)] transition-colors"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              className="underline underline-offset-2 hover:text-[var(--text-link)] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
