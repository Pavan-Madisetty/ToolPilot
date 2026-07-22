import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOL_COUNT_LABEL } from '@/config/tools';
import { useUIStore } from '@/stores/uiStore';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { addToast } = useUIStore();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    addToast({
      type: 'success',
      title: 'Subscribed Successfully',
      message: `You have joined the Toolskyt newsletter as ${email.trim()}!`,
    });
    setEmail('');
  };

  return (
    <footer className="footer-section">
      <div className="footer-max-width">
        <div className="footer-grid">
          {/* Brand & Newsletter Column */}
          <div className="footer-col">
            <Link
              to="/"
              className="footer-brand-title select-none"
              id="footer-brand"
            >
              Tool<span className="text-[#6366F1]">skyt</span>
            </Link>
            <p className="footer-brand-desc">
              The world's premium browser-based productivity platform. Over {TOOL_COUNT_LABEL} free, secure, and lightning-fast developer tools, finance converters, and image processors. 100% offline-ready and private.
            </p>
            
            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <span className="footer-heading">
                Subscribe to updates
              </span>
              <div className="footer-newsletter-box">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="footer-newsletter-input"
                  required
                  aria-label="Newsletter email address"
                />
                <button
                  type="submit"
                  className="footer-newsletter-btn"
                >
                  Join
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="footer-social-row">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="footer-social-icon"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer-social-icon"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Modules Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Product Modules</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/developer" className="footer-link">
                  Developer Utilities
                </Link>
              </li>
              <li>
                <Link to="/finance" className="footer-link">
                  Finance & Tax Converters
                </Link>
              </li>
              <li>
                <Link to="/pdf" className="footer-link">
                  PDF & Document Tools
                </Link>
              </li>
              <li>
                <Link to="/image" className="footer-link">
                  Image & Design Tools
                </Link>
              </li>
              <li>
                <Link to="/productivity" className="footer-link">
                  Productivity Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Utilities Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Popular Developer Tools</h4>
            <ul className="footer-link-list">
              <li>
                <Link to="/developer/alternative-timestamps" className="footer-link">
                  Unix Timestamp Converter
                </Link>
              </li>
              <li>
                <Link to="/developer/json-formatter" className="footer-link">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link to="/developer/jwt-decoder" className="footer-link">
                  Client-Side JWT Debugger
                </Link>
              </li>
              <li>
                <Link to="/developer/base64" className="footer-link">
                  Base64 Encoder & Decoder
                </Link>
              </li>
              <li>
                <Link to="/image/qr-generator" className="footer-link">
                  High-Resolution QR Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Platform Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform Information</h4>
            <ul className="footer-link-list">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy & Cookies Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
              <li><Link to="/contact" className="footer-link">Contact & Support</Link></li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="footer-link">
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Text Footer block */}
        <div className="footer-seo-container">
          <p className="footer-seo-paragraph">
            <span className="font-semibold text-slate-200">Search Engine Optimization (SEO) Context:</span> Toolskyt is an all-in-one suite built for developers, designers, and financial planners. Featuring local browser compilation with zero server latency, users can instantly convert epoch times, inspect decrypted JWT signature blocks, compress high-definition PNGs, and generate vector QR matrices.
          </p>
          <p className="footer-seo-paragraph">
            Every calculation, encryption, conversion, and validation operates with zero server transit. No data ever leaves your device, conforming to rigorous modern web security guidelines. Perfect for offline usage as a Progressive Web Application (PWA).
          </p>
          <div className="footer-copyright-bar">
            <span>© {currentYear} Toolskyt. All rights reserved.</span>
            <span>Made with ❤️ for productivity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
