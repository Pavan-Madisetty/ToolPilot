const fs = require('fs');
const path = require('path');

const modules = [
  'FinanceModule',
  'DeveloperModule',
  'PdfModule',
  'ImageModule',
  'TextModule',
  'AiModule',
  'BusinessModule',
  'ProductivityModule',
  'EducationModule',
  'TravelModule',
  'HealthModule',
  'UtilitiesModule',
  'ConversionModule'
];

const tools = {
  finance: [
    'EMICalculator',
    'SIPCalculator',
    'FDCalculator',
    'GSTCalculator',
    'IncomeTaxCalculator',
    'SalaryCalculator',
    'CompoundInterestCalculator',
    'CurrencyConverter',
    'BudgetPlanner',
    'PPFCalculator',
    'TipCalculator'
  ],
  developer: [
    'JsonFormatter',
    'Base64Tool',
    'UrlEncoder',
    'JwtDecoder',
    'UuidGenerator',
    'HashGenerator',
    'RegexTester',
    'PasswordGenerator',
    'ColorPicker',
    'SqlFormatter',
    'DiffChecker',
    'LoremIpsum',
    'TimestampConverter'
  ],
  image: [
    'ImageResizer',
    'ImageCompressor',
    'QrGenerator'
  ],
  text: [
    'WordCounter',
    'CaseConverter',
    'TextDiff',
    'MarkdownEditor'
  ],
  productivity: [
    'PomodoroTimer',
    'TodoList',
    'HabitTracker'
  ],
  education: [
    'ScientificCalculator',
    'AgeCalculator',
    'CGPACalculator',
    'PercentageCalculator'
  ],
  health: [
    'BMICalculator'
  ],
  business: [
    'InvoiceGenerator',
    'ROICalculator'
  ],
  utilities: [
    'DiscountCalculator',
    'DateDifference',
    'ColorConverter'
  ],
  conversion: [
    'LengthConverter',
    'WeightConverter',
    'TemperatureConverter'
  ]
};

const baseDir = path.resolve(__dirname, '../src/pages');

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// 1. Module Pages
const modulesDir = path.join(baseDir, 'modules');
makeDir(modulesDir);

modules.forEach((mod) => {
  const file = path.join(modulesDir, `${mod}.tsx`);
  if (!fs.existsSync(file)) {
    const content = `import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ${mod}() {
  return (
    <>
      <Helmet>
        <title>${mod.replace('Module', '')} Tools | ToolPilot</title>
        <meta name="description" content="Explore free online ${mod.replace('Module', '').toLowerCase()} tools." />
      </Helmet>
      <div className="container-app py-8">
        <Breadcrumb items={[]} />
        <h1 className="text-3xl font-extrabold mt-4" style={{ color: 'var(--text-primary)' }}>
          ${mod.replace('Module', '')} Tools
        </h1>
        <div className="py-12 text-center border rounded-xl mt-6 bg-slate-50 dark:bg-slate-800/40" style={{ borderColor: 'var(--border-default)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Module is currently under active setup.</p>
        </div>
      </div>
    </>
  );
}
`;
    fs.writeFileSync(file, content);
  }
});

// 2. Tool Pages
Object.entries(tools).forEach(([category, list]) => {
  const categoryDir = path.join(baseDir, 'tools', category);
  makeDir(categoryDir);

  list.forEach((tool) => {
    const file = path.join(categoryDir, `${tool}.tsx`);
    if (!fs.existsSync(file)) {
      const slugId = tool.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      const content = `import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function ${tool}() {
  return (
    <ToolPageWrapper toolId="${slugId}">
      <div className="text-center py-16 border rounded-xl bg-slate-50 dark:bg-slate-800/40" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--text-secondary)' }}>This tool is under development. Check back soon!</p>
      </div>
    </ToolPageWrapper>
  );
}
`;
      fs.writeFileSync(file, content);
    }
  });
});

// 3. SearchPage & NotFoundPage
const searchPageFile = path.join(baseDir, 'search/SearchPage.tsx');
makeDir(path.dirname(searchPageFile));
if (!fs.existsSync(searchPageFile)) {
  fs.writeFileSync(searchPageFile, `import { Helmet } from 'react-helmet-async';
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
`);
}

const notFoundPageFile = path.join(baseDir, 'NotFoundPage.tsx');
if (!fs.existsSync(notFoundPageFile)) {
  fs.writeFileSync(notFoundPageFile, `import { Link } from 'react-router-dom';
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
`);
}

console.log('Placeholder generation complete.');
