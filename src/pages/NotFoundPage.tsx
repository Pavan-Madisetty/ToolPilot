import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | ToolPilot</title>
      </Helmet>
      <div className="container-app py-24 text-center">
        <h1 className="text-6xl font-black text-blue-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Page Not Found</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>The link might be broken, or the tool is under construction.</p>
        <Link to="/" className="btn btn-primary">Go to Homepage</Link>
      </div>
    </>
  );
}
