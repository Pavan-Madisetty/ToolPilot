import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Toolskyt</title>
        <meta
          name="description"
          content="Learn about Toolskyt, the private, offline-first client-side web toolbox."
        />
        <link rel="canonical" href="https://toolskyt.com/about" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="About | Toolskyt" />
        <meta
          property="og:description"
          content="Learn about Toolskyt, the private, offline-first client-side web toolbox."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolskyt.com/about" />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About | Toolskyt" />
        <meta
          name="twitter:description"
          content="Learn about Toolskyt, the private, offline-first client-side web toolbox."
        />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'About' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">
          About Toolskyt
        </h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            Toolskyt is a comprehensive, client-side utility platform that provides over 50
            professional web tools completely free of charge. Our mission is to make developer,
            financial, text, and educational tools accessible instantly without any signups, ads, or
            tracking.
          </p>
          <p>
            Unlike traditional utility sites, Toolskyt operates under an{' '}
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
        <title>Blog | Toolskyt</title>
        <meta
          name="description"
          content="Read the latest updates and developer tutorials on the Toolskyt blog."
        />
        <link rel="canonical" href="https://toolskyt.com/blog" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Blog | Toolskyt" />
        <meta
          property="og:description"
          content="Read the latest updates and developer tutorials on the Toolskyt blog."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolskyt.com/blog" />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog | Toolskyt" />
        <meta
          name="twitter:description"
          content="Read the latest updates and developer tutorials on the Toolskyt blog."
        />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Blog' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">Blog</h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            Welcome to the Toolskyt blog! We share guides, release notes, and tutorials on
            client-side web development.
          </p>
          <div className="border border-[var(--border-default)] rounded-xl p-6 bg-[var(--bg-elevated)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Introducing Toolskyt Redesign
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
        <title>Privacy Policy | Toolskyt</title>
        <meta
          name="description"
          content="Read our privacy policy. Toolskyt is a client-side platform that never sends your data to servers."
        />
        <link rel="canonical" href="https://toolskyt.com/privacy" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy | Toolskyt" />
        <meta
          property="og:description"
          content="Read our privacy policy. Toolskyt is a client-side platform that never sends your data to servers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolskyt.com/privacy" />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | Toolskyt" />
        <meta
          name="twitter:description"
          content="Read our privacy policy. Toolskyt is a client-side platform that never sends your data to servers."
        />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Privacy' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">
          Privacy Policy
        </h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            At Toolskyt, we take your privacy extremely seriously.{' '}
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
        <title>Terms of Service | Toolskyt</title>
        <meta name="description" content="Review the Terms of Service for Toolskyt." />
        <link rel="canonical" href="https://toolskyt.com/terms" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service | Toolskyt" />
        <meta property="og:description" content="Review the Terms of Service for Toolskyt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolskyt.com/terms" />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | Toolskyt" />
        <meta name="twitter:description" content="Review the Terms of Service for Toolskyt." />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
      </Helmet>
      <div className="container-app py-12 max-w-3xl mx-auto">
        <Breadcrumb items={[{ label: 'Terms' }]} />
        <h1 className="text-3xl font-extrabold mt-6 mb-4 text-[var(--text-primary)]">
          Terms of Service
        </h1>
        <div className="text-sm leading-relaxed text-[var(--text-secondary)] space-y-4">
          <p>
            By using Toolskyt, you agree to use our tools for lawful purposes. Since our tools
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
        <title>Contact Us | Toolskyt</title>
        <meta name="description" content="Contact the Toolskyt project maintainers." />
        <link rel="canonical" href="https://toolskyt.com/contact" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | Toolskyt" />
        <meta property="og:description" content="Contact the Toolskyt project maintainers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolskyt.com/contact" />
        <meta property="og:image" content="https://toolskyt.com/og-image.png" />
        <meta property="og:site_name" content="Toolskyt" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us | Toolskyt" />
        <meta name="twitter:description" content="Contact the Toolskyt project maintainers." />
        <meta name="twitter:image" content="https://toolskyt.com/og-image.png" />
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
            href="mailto:support@toolskyt.com"
            className="font-semibold text-[var(--primary)] hover:text-[var(--text-link-hover)]"
          >
            support@toolskyt.com
          </a>
        </div>
      </div>
    </>
  );
}
