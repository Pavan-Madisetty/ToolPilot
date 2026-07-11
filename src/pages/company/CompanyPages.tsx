import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | ToolPilot</title>
        <meta
          name="description"
          content="Learn about ToolPilot, the private, offline-first client-side web toolbox."
        />
        <link rel="canonical" href="https://toolpilot.app/about" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="About | ToolPilot" />
        <meta
          property="og:description"
          content="Learn about ToolPilot, the private, offline-first client-side web toolbox."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/about" />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About | ToolPilot" />
        <meta
          name="twitter:description"
          content="Learn about ToolPilot, the private, offline-first client-side web toolbox."
        />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'About' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">
          About ToolPilot
        </h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            ToolPilot is a comprehensive, client-side utility platform that provides over 50
            professional web tools completely free of charge. Our mission is to make developer,
            financial, text, and educational tools accessible instantly without any signups, ads, or
            tracking.
          </p>
          <p>
            Unlike traditional utility sites, ToolPilot operates under an{' '}
            <strong style={{ color: 'var(--text-primary)' }}>offline-first, client-side</strong>{' '}
            principle. All tools execute directly in your browser using JavaScript and WebAssembly.
            Your data never leaves your computer, ensuring total privacy.
          </p>
        </div>
      </div>
    </>
  );
}

export function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog | ToolPilot</title>
        <meta
          name="description"
          content="Read the latest updates and developer tutorials on the ToolPilot blog."
        />
        <link rel="canonical" href="https://toolpilot.app/blog" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Blog | ToolPilot" />
        <meta
          property="og:description"
          content="Read the latest updates and developer tutorials on the ToolPilot blog."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/blog" />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog | ToolPilot" />
        <meta
          name="twitter:description"
          content="Read the latest updates and developer tutorials on the ToolPilot blog."
        />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Blog' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">Blog</h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            Welcome to the ToolPilot blog! We share guides, release notes, and tutorials on
            client-side web development.
          </p>
          <div className="border border-[var(--border-default)] rounded-xl p-6 bg-[var(--bg-elevated)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Introducing ToolPilot Redesign
            </h2>
            <span className="text-xs text-[var(--text-tertiary)]">Published July 10, 2026</span>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Today we are releasing our new unified design system, standardizing components on an
              8px grid layout and updating icons to standard Lucide vector shapes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ToolPilot</title>
        <meta
          name="description"
          content="Read our privacy policy. ToolPilot is a client-side platform that never sends your data to servers."
        />
        <link rel="canonical" href="https://toolpilot.app/privacy" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | ToolPilot" />
        <meta
          property="og:description"
          content="Read our privacy policy. ToolPilot is a client-side platform that never sends your data to servers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/privacy" />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | ToolPilot" />
        <meta
          name="twitter:description"
          content="Read our privacy policy. ToolPilot is a client-side platform that never sends your data to servers."
        />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Privacy' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">
          Privacy Policy
        </h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            At ToolPilot, we take your privacy extremely seriously.{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              All calculations, formatting, compression, and operations run entirely inside your
              browser.
            </strong>{' '}
            No files or text inputs are ever sent to our servers.
          </p>
          <p>
            We do not use tracking cookies, analytics profiling, or sell user demographic data. This
            platform is designed to run fully sandboxed within your browser window.
          </p>
        </div>
      </div>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | ToolPilot</title>
        <meta name="description" content="Review the Terms of Service for ToolPilot." />
        <link rel="canonical" href="https://toolpilot.app/terms" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | ToolPilot" />
        <meta property="og:description" content="Review the Terms of Service for ToolPilot." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/terms" />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | ToolPilot" />
        <meta name="twitter:description" content="Review the Terms of Service for ToolPilot." />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Terms' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">
          Terms of Service
        </h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            By using ToolPilot, you agree to use our tools for lawful purposes. Since our tools
            execute exclusively client-side, we bear no liability for errors or discrepancies in
            outputs (such as EMI or interest calculators). All tools are provided "as-is".
          </p>
        </div>
      </div>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | ToolPilot</title>
        <meta name="description" content="Contact the ToolPilot project maintainers." />
        <link rel="canonical" href="https://toolpilot.app/contact" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | ToolPilot" />
        <meta property="og:description" content="Contact the ToolPilot project maintainers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpilot.app/contact" />
        <meta property="og:image" content="https://toolpilot.app/og-image.png" />
        <meta property="og:site_name" content="ToolPilot" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us | ToolPilot" />
        <meta name="twitter:description" content="Contact the ToolPilot project maintainers." />
        <meta name="twitter:image" content="https://toolpilot.app/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Contact' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">Contact Us</h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            Have suggestions for new tools, or found a bug? You can contact our open-source
            maintainers at:
          </p>
          <a
            href="mailto:support@toolpilot.app"
            className="font-semibold text-[var(--primary)] hover:text-[var(--text-link-hover)]"
          >
            support@toolpilot.app
          </a>
        </div>
      </div>
    </>
  );
}
