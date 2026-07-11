import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

// Company Pages
import {
  AboutPage,
  BlogPage,
  PrivacyPage,
  TermsPage,
  ContactPage,
} from '@/pages/company/CompanyPages';

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
const CompoundInterestCalculator = lazy(
  () => import('@/pages/tools/finance/CompoundInterestCalculator')
);
const CurrencyConverter = lazy(() => import('@/pages/tools/finance/CurrencyConverter'));
const BudgetPlanner = lazy(() => import('@/pages/tools/finance/BudgetPlanner'));
const PPFCalculator = lazy(() => import('@/pages/tools/finance/PPFCalculator'));
const TipCalculator = lazy(() => import('@/pages/tools/finance/TipCalculator'));
const HomeLoanCalculator = lazy(() => import('@/pages/tools/finance/HomeLoanCalculator'));
const CarLoanCalculator = lazy(() => import('@/pages/tools/finance/CarLoanCalculator'));
const PersonalLoanCalculator = lazy(() => import('@/pages/tools/finance/PersonalLoanCalculator'));
const EducationLoanCalculator = lazy(() => import('@/pages/tools/finance/EducationLoanCalculator'));
const LoanEligibilityCalculator = lazy(
  () => import('@/pages/tools/finance/LoanEligibilityCalculator')
);
const RDCalculator = lazy(() => import('@/pages/tools/finance/RDCalculator'));
const EPFCalculator = lazy(() => import('@/pages/tools/finance/EPFCalculator'));
const RetirementCalculator = lazy(() => import('@/pages/tools/finance/RetirementCalculator'));
const HRACalculator = lazy(() => import('@/pages/tools/finance/HRACalculator'));
const BillSplitter = lazy(() => import('@/pages/tools/finance/BillSplitter'));
const ExpenseTracker = lazy(() => import('@/pages/tools/finance/ExpenseTracker'));
const LoanComparison = lazy(() => import('@/pages/tools/finance/LoanComparison'));
const MutualFundCalculator = lazy(() => import('@/pages/tools/finance/MutualFundCalculator'));

// New Finance Tools
const SimpleInterestCalculator = lazy(
  () => import('@/pages/tools/finance/SimpleInterestCalculator')
);
const InflationCalculator = lazy(() => import('@/pages/tools/finance/InflationCalculator'));
const GratuityCalculator = lazy(() => import('@/pages/tools/finance/GratuityCalculator'));
const StockAverageCalculator = lazy(() => import('@/pages/tools/finance/StockAverageCalculator'));
const BrokerageCalculator = lazy(() => import('@/pages/tools/finance/BrokerageCalculator'));
const SavingsPlanner = lazy(() => import('@/pages/tools/finance/SavingsPlanner'));
const NetWorthCalculator = lazy(() => import('@/pages/tools/finance/NetWorthCalculator'));
const GoldInvestmentCalculator = lazy(
  () => import('@/pages/tools/finance/GoldInvestmentCalculator')
);
const CryptoProfitCalculator = lazy(() => import('@/pages/tools/finance/CryptoProfitCalculator'));
const SubscriptionTracker = lazy(() => import('@/pages/tools/finance/SubscriptionTracker'));
const CreditCardEMICalculator = lazy(() => import('@/pages/tools/finance/CreditCardEMICalculator'));

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
const AlternativeTimestamps = lazy(() => import('@/pages/tools/developer/AlternativeTimestamps'));
const GradientGenerator = lazy(() => import('@/pages/tools/developer/GradientGenerator'));
const CronBuilder = lazy(() => import('@/pages/tools/developer/CronBuilder'));
const MarkdownPreview = lazy(() => import('@/pages/tools/developer/MarkdownPreview'));

// Image Tools
const ImageResizer = lazy(() => import('@/pages/tools/image/ImageResizer'));
const ImageCompressor = lazy(() => import('@/pages/tools/image/ImageCompressor'));
const QrGenerator = lazy(() => import('@/pages/tools/image/QrGenerator'));
const ImageCropper = lazy(() => import('@/pages/tools/image/ImageCropper'));
const BarcodeGenerator = lazy(() => import('@/pages/tools/image/BarcodeGenerator'));
const JpgConverter = lazy(() => import('@/pages/tools/image/JpgConverter'));
const WebpConverter = lazy(() => import('@/pages/tools/image/WebpConverter'));
const ColorPalette = lazy(() => import('@/pages/tools/image/ColorPalette'));
const FaviconGenerator = lazy(() => import('@/pages/tools/image/FaviconGenerator'));

// Text Tools
const WordCounter = lazy(() => import('@/pages/tools/text/WordCounter'));
const CaseConverter = lazy(() => import('@/pages/tools/text/CaseConverter'));
const TextDiff = lazy(() => import('@/pages/tools/text/TextDiff'));
const MarkdownEditor = lazy(() => import('@/pages/tools/text/MarkdownEditor'));
const SlugGenerator = lazy(() => import('@/pages/tools/text/SlugGenerator'));
const TextToEmoji = lazy(() => import('@/pages/tools/text/TextToEmoji'));
const StylishText = lazy(() => import('@/pages/tools/text/StylishText'));
const EmojiSearch = lazy(() => import('@/pages/tools/text/EmojiSearch'));
const PdfToMarkdown = lazy(() => import('@/pages/tools/text/PdfToMarkdown'));
const NumbersToWords = lazy(() => import('@/pages/tools/text/NumbersToWords'));
const DetectLanguage = lazy(() => import('@/pages/tools/text/DetectLanguage'));
const RemoveSpaces = lazy(() => import('@/pages/tools/text/RemoveSpaces'));
const ReadMathExpressions = lazy(() => import('@/pages/tools/text/ReadMathExpressions'));
const DateConverter = lazy(() => import('@/pages/tools/text/DateConverter'));
const Dictionary = lazy(() => import('@/pages/tools/text/Dictionary'));

// AI Tools
const PromptBuilder = lazy(() => import('@/pages/tools/ai/PromptBuilder'));
const EmailWriter = lazy(() => import('@/pages/tools/ai/EmailWriter'));
const ResumeBuilder = lazy(() => import('@/pages/tools/ai/ResumeBuilder'));
const CoverLetter = lazy(() => import('@/pages/tools/ai/CoverLetter'));

// Productivity Tools
const PomodoroTimer = lazy(() => import('@/pages/tools/productivity/PomodoroTimer'));
const TodoList = lazy(() => import('@/pages/tools/productivity/TodoList'));
const HabitTracker = lazy(() => import('@/pages/tools/productivity/HabitTracker'));
const Stopwatch = lazy(() => import('@/pages/tools/productivity/Stopwatch'));
const Countdown = lazy(() => import('@/pages/tools/productivity/Countdown'));
const Checklist = lazy(() => import('@/pages/tools/productivity/Checklist'));
const Notes = lazy(() => import('@/pages/tools/productivity/Notes'));

// Education Tools
const ScientificCalculator = lazy(() => import('@/pages/tools/education/ScientificCalculator'));
const AgeCalculator = lazy(() => import('@/pages/tools/education/AgeCalculator'));
const CGPACalculator = lazy(() => import('@/pages/tools/education/CGPACalculator'));
const PercentageCalculator = lazy(() => import('@/pages/tools/education/PercentageCalculator'));
const GPACalculator = lazy(() => import('@/pages/tools/education/GPACalculator'));
const UnitConverter = lazy(() => import('@/pages/tools/education/UnitConverter'));

// Health Tools
const BMICalculator = lazy(() => import('@/pages/tools/health/BMICalculator'));
const BMRCalculator = lazy(() => import('@/pages/tools/health/BMRCalculator'));
const CalorieCalculator = lazy(() => import('@/pages/tools/health/CalorieCalculator'));

// Business Tools
const InvoiceGenerator = lazy(() => import('@/pages/tools/business/InvoiceGenerator'));
const ROICalculator = lazy(() => import('@/pages/tools/business/ROICalculator'));
const GstInvoice = lazy(() => import('@/pages/tools/business/GstInvoice'));
const ProfitMargin = lazy(() => import('@/pages/tools/business/ProfitMargin'));
const BreakEven = lazy(() => import('@/pages/tools/business/BreakEven'));
const QuotationGenerator = lazy(() => import('@/pages/tools/business/QuotationGenerator'));

// Utility Tools
const DiscountCalculator = lazy(() => import('@/pages/tools/utilities/DiscountCalculator'));
const DateDifference = lazy(() => import('@/pages/tools/utilities/DateDifference'));
const ColorConverter = lazy(() => import('@/pages/tools/utilities/ColorConverter'));
const RandomNumber = lazy(() => import('@/pages/tools/utilities/RandomNumber'));

// Conversion Tools
const LengthConverter = lazy(() => import('@/pages/tools/conversion/LengthConverter'));
const WeightConverter = lazy(() => import('@/pages/tools/conversion/WeightConverter'));
const TemperatureConverter = lazy(() => import('@/pages/tools/conversion/TemperatureConverter'));
const DataStorageConverter = lazy(() => import('@/pages/tools/conversion/DataStorageConverter'));

// Travel Tools
const TimezoneConverter = lazy(() => import('@/pages/tools/travel/TimezoneConverter'));
const FuelCostCalculator = lazy(() => import('@/pages/tools/travel/FuelCostCalculator'));

// PDF Tools
const HtmlToPdf = lazy(() => import('@/pages/tools/pdf/HtmlToPdf'));
const ImageToPdf = lazy(() => import('@/pages/tools/pdf/ImageToPdf'));
const MarkdownToPdf = lazy(() => import('@/pages/tools/pdf/MarkdownToPdf'));

import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

function AnalyticsTracker() {
  useGoogleAnalytics();
  return null;
}

import { RuntimeConfigProvider } from '@/context/RuntimeConfigContext';

export default function App() {
  const basename =
    typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io')
      ? '/ToolPilot'
      : '';

  return (
    <RuntimeConfigProvider>
      <HelmetProvider>
      <BrowserRouter basename={basename}>
        <AnalyticsTracker />
        <ToastContainer />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Home */}
              <Route
                index
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HomePage />
                  </Suspense>
                }
              />

              {/* Search */}
              <Route
                path="search"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SearchPage />
                  </Suspense>
                }
              />

              {/* Company Pages */}
              <Route path="about" element={<AboutPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="contact" element={<ContactPage />} />

              {/* Finance Module */}
              <Route
                path="finance"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <FinanceModule />
                  </Suspense>
                }
              />
              <Route
                path="finance/emi-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <EMICalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/sip-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SIPCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/fd-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <FDCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/gst-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <GSTCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/income-tax-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <IncomeTaxCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/salary-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SalaryCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/compound-interest-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CompoundInterestCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/currency-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CurrencyConverter />
                  </Suspense>
                }
              />
              <Route
                path="finance/budget-planner"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BudgetPlanner />
                  </Suspense>
                }
              />
              <Route
                path="finance/ppf-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PPFCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/tip-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TipCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/home-loan-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HomeLoanCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/car-loan-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CarLoanCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/personal-loan-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PersonalLoanCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/education-loan-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <EducationLoanCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/loan-eligibility-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <LoanEligibilityCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/rd-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <RDCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/epf-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <EPFCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/retirement-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <RetirementCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/hra-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HRACalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/bill-splitter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BillSplitter />
                  </Suspense>
                }
              />
              <Route
                path="finance/expense-tracker"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ExpenseTracker />
                  </Suspense>
                }
              />
              <Route
                path="finance/loan-comparison"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <LoanComparison />
                  </Suspense>
                }
              />
              <Route
                path="finance/mutual-fund-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MutualFundCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/simple-interest-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SimpleInterestCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/inflation-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <InflationCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/gratuity-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <GratuityCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/stock-average-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <StockAverageCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/brokerage-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BrokerageCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/savings-planner"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SavingsPlanner />
                  </Suspense>
                }
              />
              <Route
                path="finance/net-worth-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <NetWorthCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/gold-investment-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <GoldInvestmentCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/crypto-profit-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CryptoProfitCalculator />
                  </Suspense>
                }
              />
              <Route
                path="finance/subscription-tracker"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SubscriptionTracker />
                  </Suspense>
                }
              />
              <Route
                path="finance/credit-card-emi"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CreditCardEMICalculator />
                  </Suspense>
                }
              />

              {/* Developer Module */}
              <Route
                path="developer"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DeveloperModule />
                  </Suspense>
                }
              />
              <Route
                path="developer/json-formatter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <JsonFormatter />
                  </Suspense>
                }
              />
              <Route
                path="developer/base64"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Base64Tool />
                  </Suspense>
                }
              />
              <Route
                path="developer/url-encoder"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <UrlEncoder />
                  </Suspense>
                }
              />
              <Route
                path="developer/jwt-decoder"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <JwtDecoder />
                  </Suspense>
                }
              />
              <Route
                path="developer/uuid-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <UuidGenerator />
                  </Suspense>
                }
              />
              <Route
                path="developer/hash-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HashGenerator />
                  </Suspense>
                }
              />
              <Route
                path="developer/regex-tester"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <RegexTester />
                  </Suspense>
                }
              />
              <Route
                path="developer/password-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PasswordGenerator />
                  </Suspense>
                }
              />
              <Route
                path="developer/color-picker"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ColorPicker />
                  </Suspense>
                }
              />
              <Route
                path="developer/sql-formatter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SqlFormatter />
                  </Suspense>
                }
              />
              <Route
                path="developer/diff-checker"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DiffChecker />
                  </Suspense>
                }
              />
              <Route
                path="developer/lorem-ipsum"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <LoremIpsum />
                  </Suspense>
                }
              />
              <Route
                path="developer/timestamp-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                     <TimestampConverter />
                  </Suspense>
                }
              />
              <Route
                path="developer/alternative-timestamps"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AlternativeTimestamps />
                  </Suspense>
                }
              />
              <Route
                path="developer/gradient-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <GradientGenerator />
                  </Suspense>
                }
              />
              <Route
                path="developer/cron-builder"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CronBuilder />
                  </Suspense>
                }
              />
              <Route
                path="developer/markdown-preview"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MarkdownPreview />
                  </Suspense>
                }
              />

              {/* PDF Module */}
              <Route
                path="pdf"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PdfModule />
                  </Suspense>
                }
              />
              <Route
                path="pdf/html-to-pdf"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HtmlToPdf />
                  </Suspense>
                }
              />
              <Route
                path="pdf/image-to-pdf"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ImageToPdf />
                  </Suspense>
                }
              />
              <Route
                path="pdf/markdown-to-pdf"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MarkdownToPdf />
                  </Suspense>
                }
              />

              {/* Image Module */}
              <Route
                path="image"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ImageModule />
                  </Suspense>
                }
              />
              <Route
                path="image/resize"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ImageResizer />
                  </Suspense>
                }
              />
              <Route
                path="image/compress"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ImageCompressor />
                  </Suspense>
                }
              />
              <Route
                path="image/qr-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <QrGenerator />
                  </Suspense>
                }
              />
              <Route
                path="image/crop"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ImageCropper />
                  </Suspense>
                }
              />
              <Route
                path="image/barcode-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BarcodeGenerator />
                  </Suspense>
                }
              />
              <Route
                path="image/jpg-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <JpgConverter />
                  </Suspense>
                }
              />
              <Route
                path="image/webp-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <WebpConverter />
                  </Suspense>
                }
              />
              <Route
                path="image/color-palette"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ColorPalette />
                  </Suspense>
                }
              />
              <Route
                path="image/favicon-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <FaviconGenerator />
                  </Suspense>
                }
              />

              {/* Text Module */}
              <Route
                path="text"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TextModule />
                  </Suspense>
                }
              />
              <Route
                path="text/word-counter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <WordCounter />
                  </Suspense>
                }
              />
              <Route
                path="text/case-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CaseConverter />
                  </Suspense>
                }
              />
              <Route
                path="text/text-diff"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TextDiff />
                  </Suspense>
                }
              />
              <Route
                path="text/markdown-editor"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <MarkdownEditor />
                  </Suspense>
                }
              />
              <Route
                path="text/slug-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <SlugGenerator />
                  </Suspense>
                }
              />
              <Route
                path="text/text-to-emoji"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TextToEmoji />
                  </Suspense>
                }
              />
              <Route
                path="text/stylish-text"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <StylishText />
                  </Suspense>
                }
              />
              <Route
                path="text/emoji-search"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <EmojiSearch />
                  </Suspense>
                }
              />
              <Route
                path="text/pdf-to-markdown"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PdfToMarkdown />
                  </Suspense>
                }
              />
              <Route
                path="text/numbers-to-words"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <NumbersToWords />
                  </Suspense>
                }
              />
              <Route
                path="text/detect-language"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DetectLanguage />
                  </Suspense>
                }
              />
              <Route
                path="text/remove-spaces"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <RemoveSpaces />
                  </Suspense>
                }
              />
              <Route
                path="text/read-math-expressions"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ReadMathExpressions />
                  </Suspense>
                }
              />
              <Route
                path="text/date-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DateConverter />
                  </Suspense>
                }
              />
              <Route
                path="text/dictionary"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Dictionary />
                  </Suspense>
                }
              />

              {/* AI Module */}
              <Route
                path="ai"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AiModule />
                  </Suspense>
                }
              />
              <Route
                path="ai/prompt-builder"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PromptBuilder />
                  </Suspense>
                }
              />
              <Route
                path="ai/email-writer"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <EmailWriter />
                  </Suspense>
                }
              />
              <Route
                path="ai/resume-builder"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ResumeBuilder />
                  </Suspense>
                }
              />
              <Route
                path="ai/cover-letter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CoverLetter />
                  </Suspense>
                }
              />

              {/* Business Module */}
              <Route
                path="business"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BusinessModule />
                  </Suspense>
                }
              />
              <Route
                path="business/invoice-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <InvoiceGenerator />
                  </Suspense>
                }
              />
              <Route
                path="business/roi-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ROICalculator />
                  </Suspense>
                }
              />
              <Route
                path="business/gst-invoice"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <GstInvoice />
                  </Suspense>
                }
              />
              <Route
                path="business/profit-margin"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProfitMargin />
                  </Suspense>
                }
              />
              <Route
                path="business/break-even"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BreakEven />
                  </Suspense>
                }
              />
              <Route
                path="business/quotation-generator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <QuotationGenerator />
                  </Suspense>
                }
              />

              {/* Productivity Module */}
              <Route
                path="productivity"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProductivityModule />
                  </Suspense>
                }
              />
              <Route
                path="productivity/pomodoro"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PomodoroTimer />
                  </Suspense>
                }
              />
              <Route
                path="productivity/todo"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TodoList />
                  </Suspense>
                }
              />
              <Route
                path="productivity/habit-tracker"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HabitTracker />
                  </Suspense>
                }
              />
              <Route
                path="productivity/stopwatch"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Stopwatch />
                  </Suspense>
                }
              />
              <Route
                path="productivity/countdown"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Countdown />
                  </Suspense>
                }
              />
              <Route
                path="productivity/checklist"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Checklist />
                  </Suspense>
                }
              />
              <Route
                path="productivity/notes"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Notes />
                  </Suspense>
                }
              />

              {/* Education Module */}
              <Route
                path="education"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <EducationModule />
                  </Suspense>
                }
              />
              <Route
                path="education/scientific-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ScientificCalculator />
                  </Suspense>
                }
              />
              <Route
                path="education/age-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AgeCalculator />
                  </Suspense>
                }
              />
              <Route
                path="education/cgpa-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CGPACalculator />
                  </Suspense>
                }
              />
              <Route
                path="education/percentage-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PercentageCalculator />
                  </Suspense>
                }
              />
              <Route
                path="education/gpa-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <GPACalculator />
                  </Suspense>
                }
              />
              <Route
                path="education/unit-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <UnitConverter />
                  </Suspense>
                }
              />

              {/* Health Module */}
              <Route
                path="health"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <HealthModule />
                  </Suspense>
                }
              />
              <Route
                path="health/bmi-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BMICalculator />
                  </Suspense>
                }
              />
              <Route
                path="health/bmr-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <BMRCalculator />
                  </Suspense>
                }
              />
              <Route
                path="health/calorie-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <CalorieCalculator />
                  </Suspense>
                }
              />

              {/* Travel Module */}
              <Route
                path="travel"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TravelModule />
                  </Suspense>
                }
              />
              <Route
                path="travel/timezone-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TimezoneConverter />
                  </Suspense>
                }
              />
              <Route
                path="travel/fuel-cost"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <FuelCostCalculator />
                  </Suspense>
                }
              />

              {/* Utilities Module */}
              <Route
                path="utilities"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <UtilitiesModule />
                  </Suspense>
                }
              />
              <Route
                path="utilities/discount-calculator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DiscountCalculator />
                  </Suspense>
                }
              />
              <Route
                path="utilities/date-difference"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DateDifference />
                  </Suspense>
                }
              />
              <Route
                path="utilities/color-converter"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ColorConverter />
                  </Suspense>
                }
              />
              <Route
                path="utilities/random-number"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <RandomNumber />
                  </Suspense>
                }
              />

              {/* Conversion Module */}
              <Route
                path="convert"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ConversionModule />
                  </Suspense>
                }
              />
              <Route path="conversion" element={<Navigate to="/convert" replace />} />
              <Route
                path="convert/length"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <LengthConverter />
                  </Suspense>
                }
              />
              <Route
                path="convert/weight"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <WeightConverter />
                  </Suspense>
                }
              />
              <Route
                path="convert/temperature"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <TemperatureConverter />
                  </Suspense>
                }
              />
              <Route
                path="convert/data-storage"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DataStorageConverter />
                  </Suspense>
                }
              />

              {/* Wildcard Fallback */}
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ToolFallback />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </HelmetProvider>
    </RuntimeConfigProvider>
  );
}
