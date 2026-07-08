import { Helmet } from 'react-helmet-async';
export default function SearchPage() {
  return (
    <>
      <Helmet>
        <title>Search Tools | ToolPilot</title>
      </Helmet>
      <div className="container-app py-8">
        <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Search Results</h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>Use global search to find tools instantly.</p>
      </div>
    </>
  );
}
