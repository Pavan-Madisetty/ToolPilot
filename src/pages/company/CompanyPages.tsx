import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Lock, Zap, WifiOff, Mail, Bug, Lightbulb } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { LIVE_TOOL_COUNT } from '@/config/tools';
import { MODULES } from '@/config/modules';

interface PageShellProps {
  title: string;
  crumb: string;
  path: string;
  description: string;
  lead?: string;
  children: ReactNode;
}

/** Shared layout + SEO for all company / legal pages. */
function PageShell({ title, crumb, path, description, lead, children }: PageShellProps) {
  const fullTitle = `${title} | Toolskyt`;
  const url = `https://toolskyt.com${path}`;
  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
      </Helmet>
      <div className="sk-container sk-page">
        <Breadcrumb items={[{ label: crumb }]} />
        <header className="sk-page__head">
          <h1>{title}</h1>
          {lead && <p>{lead}</p>}
        </header>
        {children}
      </div>
    </>
  );
}

export function AboutPage() {
  const values = [
    {
      icon: Lock,
      title: 'Private by design',
      text: 'Every tool runs on your device. Your files, text and numbers are never uploaded to a server.',
    },
    {
      icon: Zap,
      title: 'Fast and free',
      text: 'No sign-up, no limits, no watermarks. Results appear instantly because nothing waits on a network.',
    },
    {
      icon: WifiOff,
      title: 'Works offline',
      text: 'Install Toolskyt as an app and keep using your favourite tools without a connection.',
    },
  ];
  return (
    <PageShell
      title="About Toolskyt"
      crumb="About"
      path="/about"
      description="Learn about Toolskyt, the private, offline-first toolbox of free browser tools."
      lead={`Toolskyt is a collection of ${LIVE_TOOL_COUNT} free tools across ${MODULES.length} categories — from EMI calculators and JSON formatters to PDF and image utilities — that all run inside your browser.`}
    >
      <div className="sk-prose">
        <p>
          Most online utilities ask you to upload your files or create an account first. Toolskyt takes the
          opposite approach: an <strong>offline-first, client-side</strong> platform where every calculation,
          conversion and edit happens locally using JavaScript. Your data stays on your computer, which keeps
          things private and makes them fast.
        </p>
      </div>

      <div className="sk-features sk-features--3 sk-page__cards">
        {values.map((v) => (
          <div key={v.title} className="sk-feature">
            <span className="sk-feature__icon" aria-hidden="true">
              <v.icon size={22} />
            </span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <div className="sk-cta sk-page__cta">
        <div>
          <h2>Ready to try it?</h2>
          <p>Pick a category and get something done in seconds.</p>
        </div>
        <Link to="/" className="sk-btn sk-btn--light sk-btn--lg">
          Browse tools <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </PageShell>
  );
}

export function BlogPage() {
  return (
    <PageShell
      title="Blog"
      crumb="Blog"
      path="/blog"
      description="Read the latest updates and tutorials from the Toolskyt team."
      lead="Guides, release notes and tutorials on client-side tools."
    >
      <article className="sk-post">
        <span className="sk-chip">Product update</span>
        <h2>Introducing the new Toolskyt design</h2>
        <time dateTime="2026-09-25">Published September 25, 2026</time>
        <p>
          We've redesigned Toolskyt around one goal: getting you to the right tool faster. You'll find
          category navigation in the header, a quick switcher on every tool page, and a cleaner layout that
          works well on phones as well as desktops.
        </p>
      </article>
    </PageShell>
  );
}

export function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      crumb="Privacy"
      path="/privacy"
      description="Toolskyt processes your files and inputs in your browser and never sends them to our servers. Read how advertising and cookies work."
      lead="The short version: your files and inputs stay in your browser."
    >
      <div className="sk-prose">
        <h2>Your data stays on your device</h2>
        <p>
          <strong>
            All calculations, formatting, compression and other operations run entirely inside your browser.
          </strong>{' '}
          No files or text inputs are ever sent to our servers.
        </p>
        <h2>Advertising</h2>
        <p>
          Toolskyt is free and may show ads served by Google AdSense. Google and its partners may use cookies
          or similar identifiers to serve and measure ads, including personalised ads where the law allows.
          Ads are separate from the tools: the files and text you enter into a tool are never shared with
          advertisers. You can manage ad personalisation at{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            adssettings.google.com
          </a>{' '}
          and read how Google uses data at{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            policies.google.com
          </a>
          .
        </p>
        <h2>Cookies and preferences</h2>
        <p>
          Apart from advertising, we do not use tracking cookies or analytics profiling, and we do not sell user data. Preferences such
          as your theme, favourites and recently used tools are stored only in your browser's local storage and
          can be cleared at any time from your browser settings.
        </p>
        <h2>Questions</h2>
        <p>
          If you have questions about this policy, email{' '}
          <a href="mailto:support@toolskyt.com">support@toolskyt.com</a>.
        </p>
      </div>
    </PageShell>
  );
}

export function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      crumb="Terms"
      path="/terms"
      description="Review the Terms of Service for Toolskyt."
      lead="Plain-language terms for using Toolskyt."
    >
      <div className="sk-prose">
        <h2>Use of the tools</h2>
        <p>By using Toolskyt, you agree to use our tools for lawful purposes.</p>
        <h2>No warranty</h2>
        <p>
          Since our tools execute exclusively in your browser, we bear no liability for errors or discrepancies
          in outputs, such as EMI or interest calculations. All tools are provided “as is”. For financial, tax or
          medical decisions, please confirm results with a qualified professional.
        </p>
      </div>
    </PageShell>
  );
}

export function ContactPage() {
  const items = [
    {
      icon: Lightbulb,
      title: 'Suggest a tool',
      text: 'Missing something you need? Tell us and we will consider it.',
      href: 'mailto:support@toolskyt.com?subject=Tool%20suggestion',
      cta: 'Send a suggestion',
    },
    {
      icon: Bug,
      title: 'Report a problem',
      text: 'Found a bug or a wrong result? Send the tool name and what you entered.',
      href: 'mailto:support@toolskyt.com?subject=Bug%20report',
      cta: 'Report an issue',
    },
    {
      icon: Mail,
      title: 'General questions',
      text: 'Anything else — we read every message.',
      href: 'mailto:support@toolskyt.com',
      cta: 'support@toolskyt.com',
    },
  ];
  return (
    <PageShell
      title="Contact & support"
      crumb="Contact"
      path="/contact"
      description="Contact the Toolskyt team with suggestions, bug reports or questions."
      lead="Have a suggestion for a new tool, or found a bug? We'd love to hear from you."
    >
      <div className="sk-features sk-features--3 sk-page__cards">
        {items.map((it) => (
          <div key={it.title} className="sk-feature">
            <span className="sk-feature__icon" aria-hidden="true">
              <it.icon size={22} />
            </span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
            <a href={it.href} className="sk-link-arrow sk-feature__link">
              {it.cta} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
