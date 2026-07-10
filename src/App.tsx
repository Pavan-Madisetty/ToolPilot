import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageLoader } from '@/components/ui/PageLoader';
import { ToastContainer } from '@/components/ui/ToastContainer';

// ─────────────────────────────────────────────
// Lazy-loaded Pages
// ─────────────────────────────────────────────
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const SearchPage = lazy(() => import('@/pages/search/SearchPage'));
const ToolFallback = lazy(() => import('@/pages/tools/ToolFallback'));

// Module Pages
const FinanceModule = lazy(() => import('@/pages/modules/FinanceModule'));
const DeveloperModule = lazy(() => import('@/pages/modules/DeveloperModule'));
const PdfModule = lazy(() => import('@/pages/modules/PdfModule'));
const ImageModule = lazy(() => import('@/pages/modules/ImageModule'));
const TextModule = lazy(() => import('@/pages/modules/TextModule'));
const AiModule = lazy(() => import('@/pages/modules/AiModule'));
const BusinessModule = lazy(() => import('@/pages/modules/BusinessModule'));
const ProductivityModule = lazy(() => import('@/pages/modules/ProductivityModule'));
const EducationModule = lazy(() => import('@/pages/modules/EducationModule'));
const TravelModule = lazy(() => import('@/pages/modules/TravelModule'));
const HealthModule = lazy(() => import('@/pages/modules/HealthModule'));
const UtilitiesModule = lazy(() => import('@/pages/modules/UtilitiesModule'));
const ConversionModule = lazy(() => import('@/pages/modules/ConversionModule'));

// Finance Tools
const EMICalculator = lazy(() => import('@/pages/tools/finance/EMICalculator'));
const SIPCalculator = lazy(() => import('@/pages/tools/finance/SIPCalculator'));
const FDCalculator = lazy(() => import('@/pages/tools/finance/FDCalculator'));
const GSTCalculator = lazy(() => import('@/pages/tools/finance/GSTCalculator'));
const IncomeTaxCalculator = lazy(() => import('@/pages/tools/finance/IncomeTaxCalculator'));
const SalaryCalculator = lazy(() => import('@/pages/tools/finance/SalaryCalculator'));
const CompoundInterestCalculator = lazy(() => import('@/pages/tools/finance/CompoundInterestCalculator'));
const CurrencyConverter = lazy(() => import('@/pages/tools/finance/CurrencyConverter'));
const BudgetPlanner = lazy(() => import('@/pages/tools/finance/BudgetPlanner'));
const PPFCalculator = lazy(() => import('@/pages/tools/finance/PPFCalculator'));
const TipCalculator = lazy(() => import('@/pages/tools/finance/TipCalculator'));

// Developer Tools
const JsonFormatter = lazy(() => import('@/pages/tools/developer/JsonFormatter'));
const Base64Tool = lazy(() => import('@/pages/tools/developer/Base64Tool'));
const UrlEncoder = lazy(() => import('@/pages/tools/developer/UrlEncoder'));
const JwtDecoder = lazy(() => import('@/pages/tools/developer/JwtDecoder'));
const UuidGenerator = lazy(() => import('@/pages/tools/developer/UuidGenerator'));
const HashGenerator = lazy(() => import('@/pages/tools/developer/HashGenerator'));
const RegexTester = lazy(() => import('@/pages/tools/developer/RegexTester'));
const PasswordGenerator = lazy(() => import('@/pages/tools/developer/PasswordGenerator'));
const ColorPicker = lazy(() => import('@/pages/tools/developer/ColorPicker'));
const SqlFormatter = lazy(() => import('@/pages/tools/developer/SqlFormatter'));
const DiffChecker = lazy(() => import('@/pages/tools/developer/DiffChecker'));
const LoremIpsum = lazy(() => import('@/pages/tools/developer/LoremIpsum'));
const TimestampConverter = lazy(() => import('@/pages/tools/developer/TimestampConverter'));

// Image Tools
const ImageResizer = lazy(() => import('@/pages/tools/image/ImageResizer'));
const ImageCompressor = lazy(() => import('@/pages/tools/image/ImageCompressor'));
const QrGenerator = lazy(() => import('@/pages/tools/image/QrGenerator'));

// Text Tools
const WordCounter = lazy(() => import('@/pages/tools/text/WordCounter'));
const CaseConverter = lazy(() => import('@/pages/tools/text/CaseConverter'));
const TextDiff = lazy(() => import('@/pages/tools/text/TextDiff'));
const MarkdownEditor = lazy(() => import('@/pages/tools/text/MarkdownEditor'));

// Productivity Tools
const PomodoroTimer = lazy(() => import('@/pages/tools/productivity/PomodoroTimer'));
const TodoList = lazy(() => import('@/pages/tools/productivity/TodoList'));
const HabitTracker = lazy(() => import('@/pages/tools/productivity/HabitTracker'));

// Education Tools
const ScientificCalculator = lazy(() => import('@/pages/tools/education/ScientificCalculator'));
const AgeCalculator = lazy(() => import('@/pages/tools/education/AgeCalculator'));
const CGPACalculator = lazy(() => import('@/pages/tools/education/CGPACalculator'));
const PercentageCalculator = lazy(() => import('@/pages/tools/education/PercentageCalculator'));

// Health Tools
const BMICalculator = lazy(() => import('@/pages/tools/health/BMICalculator'));

// Business Tools
const InvoiceGenerator = lazy(() => import('@/pages/tools/business/InvoiceGenerator'));
const ROICalculator = lazy(() => import('@/pages/tools/business/ROICalculator'));

// Utility Tools
const DiscountCalculator = lazy(() => import('@/pages/tools/utilities/DiscountCalculator'));
const DateDifference = lazy(() => import('@/pages/tools/utilities/DateDifference'));
const ColorConverter = lazy(() => import('@/pages/tools/utilities/ColorConverter'));

// Conversion Tools
const LengthConverter = lazy(() => import('@/pages/tools/conversion/LengthConverter'));
const WeightConverter = lazy(() => import('@/pages/tools/conversion/WeightConverter'));
const TemperatureConverter = lazy(() => import('@/pages/tools/conversion/TemperatureConverter'));

export default function App() {
  const basename = typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io')
    ? '/ToolPilot'
    : '';

  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <ToastContainer />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Home */}
              <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />

              {/* Search */}
              <Route path="search" element={<Suspense fallback={<PageLoader />}><SearchPage /></Suspense>} />

              {/* Finance Module */}
              <Route path="finance" element={<Suspense fallback={<PageLoader />}><FinanceModule /></Suspense>} />
              <Route path="finance/emi-calculator" element={<Suspense fallback={<PageLoader />}><EMICalculator /></Suspense>} />
              <Route path="finance/sip-calculator" element={<Suspense fallback={<PageLoader />}><SIPCalculator /></Suspense>} />
              <Route path="finance/fd-calculator" element={<Suspense fallback={<PageLoader />}><FDCalculator /></Suspense>} />
              <Route path="finance/gst-calculator" element={<Suspense fallback={<PageLoader />}><GSTCalculator /></Suspense>} />
              <Route path="finance/income-tax-calculator" element={<Suspense fallback={<PageLoader />}><IncomeTaxCalculator /></Suspense>} />
              <Route path="finance/salary-calculator" element={<Suspense fallback={<PageLoader />}><SalaryCalculator /></Suspense>} />
              <Route path="finance/compound-interest-calculator" element={<Suspense fallback={<PageLoader />}><CompoundInterestCalculator /></Suspense>} />
              <Route path="finance/currency-converter" element={<Suspense fallback={<PageLoader />}><CurrencyConverter /></Suspense>} />
              <Route path="finance/budget-planner" element={<Suspense fallback={<PageLoader />}><BudgetPlanner /></Suspense>} />
              <Route path="finance/ppf-calculator" element={<Suspense fallback={<PageLoader />}><PPFCalculator /></Suspense>} />
              <Route path="finance/tip-calculator" element={<Suspense fallback={<PageLoader />}><TipCalculator /></Suspense>} />

              {/* Developer Module */}
              <Route path="developer" element={<Suspense fallback={<PageLoader />}><DeveloperModule /></Suspense>} />
              <Route path="developer/json-formatter" element={<Suspense fallback={<PageLoader />}><JsonFormatter /></Suspense>} />
              <Route path="developer/base64" element={<Suspense fallback={<PageLoader />}><Base64Tool /></Suspense>} />
              <Route path="developer/url-encoder" element={<Suspense fallback={<PageLoader />}><UrlEncoder /></Suspense>} />
              <Route path="developer/jwt-decoder" element={<Suspense fallback={<PageLoader />}><JwtDecoder /></Suspense>} />
              <Route path="developer/uuid-generator" element={<Suspense fallback={<PageLoader />}><UuidGenerator /></Suspense>} />
              <Route path="developer/hash-generator" element={<Suspense fallback={<PageLoader />}><HashGenerator /></Suspense>} />
              <Route path="developer/regex-tester" element={<Suspense fallback={<PageLoader />}><RegexTester /></Suspense>} />
              <Route path="developer/password-generator" element={<Suspense fallback={<PageLoader />}><PasswordGenerator /></Suspense>} />
              <Route path="developer/color-picker" element={<Suspense fallback={<PageLoader />}><ColorPicker /></Suspense>} />
              <Route path="developer/sql-formatter" element={<Suspense fallback={<PageLoader />}><SqlFormatter /></Suspense>} />
              <Route path="developer/diff-checker" element={<Suspense fallback={<PageLoader />}><DiffChecker /></Suspense>} />
              <Route path="developer/lorem-ipsum" element={<Suspense fallback={<PageLoader />}><LoremIpsum /></Suspense>} />
              <Route path="developer/timestamp-converter" element={<Suspense fallback={<PageLoader />}><TimestampConverter /></Suspense>} />

              {/* PDF Module */}
              <Route path="pdf" element={<Suspense fallback={<PageLoader />}><PdfModule /></Suspense>} />

              {/* Image Module */}
              <Route path="image" element={<Suspense fallback={<PageLoader />}><ImageModule /></Suspense>} />
              <Route path="image/resize" element={<Suspense fallback={<PageLoader />}><ImageResizer /></Suspense>} />
              <Route path="image/compress" element={<Suspense fallback={<PageLoader />}><ImageCompressor /></Suspense>} />
              <Route path="image/qr-generator" element={<Suspense fallback={<PageLoader />}><QrGenerator /></Suspense>} />

              {/* Text Module */}
              <Route path="text" element={<Suspense fallback={<PageLoader />}><TextModule /></Suspense>} />
              <Route path="text/word-counter" element={<Suspense fallback={<PageLoader />}><WordCounter /></Suspense>} />
              <Route path="text/case-converter" element={<Suspense fallback={<PageLoader />}><CaseConverter /></Suspense>} />
              <Route path="text/text-diff" element={<Suspense fallback={<PageLoader />}><TextDiff /></Suspense>} />
              <Route path="text/markdown-editor" element={<Suspense fallback={<PageLoader />}><MarkdownEditor /></Suspense>} />

              {/* AI Module */}
              <Route path="ai" element={<Suspense fallback={<PageLoader />}><AiModule /></Suspense>} />

              {/* Business Module */}
              <Route path="business" element={<Suspense fallback={<PageLoader />}><BusinessModule /></Suspense>} />
              <Route path="business/invoice-generator" element={<Suspense fallback={<PageLoader />}><InvoiceGenerator /></Suspense>} />
              <Route path="business/roi-calculator" element={<Suspense fallback={<PageLoader />}><ROICalculator /></Suspense>} />

              {/* Productivity Module */}
              <Route path="productivity" element={<Suspense fallback={<PageLoader />}><ProductivityModule /></Suspense>} />
              <Route path="productivity/pomodoro" element={<Suspense fallback={<PageLoader />}><PomodoroTimer /></Suspense>} />
              <Route path="productivity/todo" element={<Suspense fallback={<PageLoader />}><TodoList /></Suspense>} />
              <Route path="productivity/habit-tracker" element={<Suspense fallback={<PageLoader />}><HabitTracker /></Suspense>} />

              {/* Education Module */}
              <Route path="education" element={<Suspense fallback={<PageLoader />}><EducationModule /></Suspense>} />
              <Route path="education/scientific-calculator" element={<Suspense fallback={<PageLoader />}><ScientificCalculator /></Suspense>} />
              <Route path="education/age-calculator" element={<Suspense fallback={<PageLoader />}><AgeCalculator /></Suspense>} />
              <Route path="education/cgpa-calculator" element={<Suspense fallback={<PageLoader />}><CGPACalculator /></Suspense>} />
              <Route path="education/percentage-calculator" element={<Suspense fallback={<PageLoader />}><PercentageCalculator /></Suspense>} />

              {/* Health Module */}
              <Route path="health" element={<Suspense fallback={<PageLoader />}><HealthModule /></Suspense>} />
              <Route path="health/bmi-calculator" element={<Suspense fallback={<PageLoader />}><BMICalculator /></Suspense>} />

              {/* Travel Module */}
              <Route path="travel" element={<Suspense fallback={<PageLoader />}><TravelModule /></Suspense>} />

              {/* Utilities Module */}
              <Route path="utilities" element={<Suspense fallback={<PageLoader />}><UtilitiesModule /></Suspense>} />
              <Route path="utilities/discount-calculator" element={<Suspense fallback={<PageLoader />}><DiscountCalculator /></Suspense>} />
              <Route path="utilities/date-difference" element={<Suspense fallback={<PageLoader />}><DateDifference /></Suspense>} />
              <Route path="utilities/color-converter" element={<Suspense fallback={<PageLoader />}><ColorConverter /></Suspense>} />

              {/* Conversion Module */}
              <Route path="convert" element={<Suspense fallback={<PageLoader />}><ConversionModule /></Suspense>} />
              <Route path="convert/length" element={<Suspense fallback={<PageLoader />}><LengthConverter /></Suspense>} />
              <Route path="convert/weight" element={<Suspense fallback={<PageLoader />}><WeightConverter /></Suspense>} />
              <Route path="convert/temperature" element={<Suspense fallback={<PageLoader />}><TemperatureConverter /></Suspense>} />

              {/* Wildcard Fallback */}
              <Route path="*" element={<Suspense fallback={<PageLoader />}><ToolFallback /></Suspense>} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </HelmetProvider>
  );
}
