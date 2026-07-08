import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function HealthModule() {
  return (
    <>
      <Helmet>
        <title>Health Tools | ToolPilot</title>
        <meta name="description" content="Explore free online health tools." />
      </Helmet>
      <div className="container-app py-8">
        <Breadcrumb items={[]} />
        <h1 className="text-3xl font-extrabold mt-4" style={{ color: 'var(--text-primary)' }}>
          Health Tools
        </h1>
        <div className="py-12 text-center border rounded-xl mt-6 bg-slate-50 dark:bg-slate-800/40" style={{ borderColor: 'var(--border-default)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Module is currently under active setup.</p>
        </div>
      </div>
    </>
  );
}
