import type { ToolConfig } from '@/types';

// ============================================================
// Tool Registry — see LIVE_TOOL_COUNT / TOTAL_TOOL_COUNT at the bottom of this file
// for the authoritative, self-updating counts (do not hardcode tool totals in copy).
// ============================================================

export const TOOLS: ToolConfig[] = [
  // ─────────────────────────────────────────────
  // FINANCE MODULE
  // ─────────────────────────────────────────────
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate your monthly loan EMI with amortization schedule',
    longDescription: 'Calculate your Equated Monthly Installment (EMI) for various types of loans including home loans, car loans, and personal loans. Toolskyt provides detailed amortization schedules, breakdown charts, and repayment statistics completely offline, ensuring your calculations remain private.',
    module: 'finance',
    slug: '/finance/emi-calculator',
    icon: 'CurrencyRupeeIcon',
    tags: ['emi', 'loan', 'monthly payment', 'interest', 'amortization'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'EMI Calculator - Calculate Monthly Loan EMI Instantly | Toolskyt',
    metaDescription:
      'Free online EMI calculator. Calculate monthly EMI for home loan, car loan, personal loan with complete amortization schedule. Instant results.',
    keywords: ['emi calculator', 'loan emi', 'monthly emi', 'home loan emi', 'car loan emi'],
    relatedTools: [
      'home-loan-calculator',
      'personal-loan-calculator',
      'loan-eligibility-calculator',
      'compound-interest-calculator',
    ],
    benefits: [
      'Calculate payments instantly to budget your finance schedules.',
      'Examine amortization breakdowns to understand compound interest.',
      'Adjust loan duration and interest variables on the fly.'
    ],
    features: [
      'Supports home loan, personal loan, and car loan calculations.',
      'Generates interactive principal vs. interest repayment ratios.',
      'Calculates total payable interest and absolute repayments.'
    ],
    howToSteps: [
      { name: 'Enter Loan Principal', text: 'Specify the total loan amount you intend to borrow.' },
      { name: 'Set Interest Rate', text: 'Enter the annual interest rate offered by your bank.' },
      { name: 'Specify Tenure', text: 'Specify the loan repayment period in years or months.' },
      { name: 'Analyze Breakdown', text: 'Review the monthly EMI payment break-up and tables.' }
    ],
    faq: [
      { question: 'What is an EMI?', answer: 'EMI stands for Equated Monthly Installment. It represents the fixed payment made by a borrower to a lender every month.' },
      { question: 'Is my financial data secure?', answer: 'Yes! Toolskyt performs all calculations locally in your browser. We never track, upload, or collect your financial parameters.' }
    ]
  },
  {
    id: 'home-loan-calculator',
    name: 'Home Loan Calculator',
    description: 'Calculate home loan EMI, interest & total repayment amount',
    module: 'finance',
    slug: '/finance/home-loan-calculator',
    icon: 'HomeIcon',
    tags: ['home loan', 'mortgage', 'housing loan', 'emi'],
    isPopular: true,
    metaTitle: 'Home Loan Calculator - Calculate Housing Loan EMI | Toolskyt',
    metaDescription:
      'Calculate home loan EMI, total interest, and repayment amount instantly. Compare different tenures and interest rates.',
    keywords: [
      'home loan calculator',
      'housing loan emi',
      'mortgage calculator',
      'home loan interest',
    ],
    relatedTools: ['emi-calculator', 'loan-eligibility-calculator'],
  },
  {
    id: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    description: 'Calculate car loan EMI and total cost of vehicle financing',
    module: 'finance',
    slug: '/finance/car-loan-calculator',
    icon: 'TruckIcon',
    tags: ['car loan', 'auto loan', 'vehicle loan', 'emi'],
    metaTitle: 'Car Loan Calculator - Calculate Vehicle Loan EMI | Toolskyt',
    metaDescription:
      'Calculate car loan EMI, down payment impact, and total interest paid. Plan your vehicle purchase.',
    keywords: ['car loan calculator', 'auto loan emi', 'vehicle loan calculator'],
    relatedTools: ['emi-calculator', 'personal-loan-calculator'],
  },
  {
    id: 'personal-loan-calculator',
    name: 'Personal Loan Calculator',
    description: 'Calculate personal loan EMI for unsecured credit',
    module: 'finance',
    slug: '/finance/personal-loan-calculator',
    icon: 'UserIcon',
    tags: ['personal loan', 'unsecured loan', 'emi', 'credit'],
    metaTitle: 'Personal Loan Calculator - Monthly EMI & Interest | Toolskyt',
    metaDescription:
      'Calculate personal loan EMI, total interest and repayment schedule instantly.',
    keywords: ['personal loan calculator', 'personal loan emi'],
    relatedTools: ['emi-calculator', 'loan-eligibility-calculator'],
  },
  {
    id: 'education-loan-calculator',
    name: 'Education Loan Calculator',
    description: 'Calculate student loan EMI with moratorium period',
    module: 'finance',
    slug: '/finance/education-loan-calculator',
    icon: 'AcademicCapIcon',
    tags: ['education loan', 'student loan', 'emi'],
    metaTitle: 'Education Loan Calculator - Student Loan EMI | Toolskyt',
    metaDescription:
      'Calculate education loan EMI including moratorium period. Plan your student loan repayment.',
    keywords: ['education loan calculator', 'student loan emi'],
    relatedTools: ['emi-calculator'],
  },
  {
    id: 'loan-eligibility-calculator',
    name: 'Loan Eligibility Calculator',
    description: 'Check your maximum loan eligibility based on income',
    module: 'finance',
    slug: '/finance/loan-eligibility-calculator',
    icon: 'CheckBadgeIcon',
    tags: ['loan eligibility', 'income', 'dsr', 'loan amount'],
    metaTitle: 'Loan Eligibility Calculator - Check Loan Amount | Toolskyt',
    metaDescription:
      'Find out the maximum loan amount you are eligible for based on your income and existing obligations.',
    keywords: ['loan eligibility calculator', 'loan amount eligibility'],
    relatedTools: ['emi-calculator', 'home-loan-calculator'],
  },
  {
    id: 'sip-calculator',
    name: 'SIP Calculator',
    description: 'Calculate SIP returns for systematic investment plans',
    module: 'finance',
    slug: '/finance/sip-calculator',
    icon: 'ChartBarIcon',
    tags: ['sip', 'systematic investment', 'mutual fund', 'returns'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'SIP Calculator - Calculate Mutual Fund SIP Returns | Toolskyt',
    metaDescription:
      'Free SIP calculator. Calculate returns on systematic investment plan with compound interest. See year-by-year growth.',
    keywords: ['sip calculator', 'sip returns', 'systematic investment plan', 'mutual fund sip'],
    relatedTools: ['fd-calculator', 'ppf-calculator', 'retirement-calculator'],
  },
  {
    id: 'fd-calculator',
    name: 'FD Calculator',
    description: 'Calculate fixed deposit maturity amount and interest earned',
    module: 'finance',
    slug: '/finance/fd-calculator',
    icon: 'BanknotesIcon',
    tags: ['fd', 'fixed deposit', 'interest', 'maturity'],
    isPopular: true,
    metaTitle: 'FD Calculator - Fixed Deposit Maturity Calculator | Toolskyt',
    metaDescription:
      'Calculate fixed deposit maturity amount, total interest and effective yield. Compare compounding frequencies.',
    keywords: ['fd calculator', 'fixed deposit calculator', 'fd maturity', 'fd interest'],
    relatedTools: ['rd-calculator', 'ppf-calculator', 'compound-interest-calculator'],
  },
  {
    id: 'rd-calculator',
    name: 'RD Calculator',
    description: 'Calculate recurring deposit maturity amount',
    module: 'finance',
    slug: '/finance/rd-calculator',
    icon: 'ArrowTrendingUpIcon',
    tags: ['rd', 'recurring deposit', 'maturity', 'interest'],
    metaTitle: 'RD Calculator - Recurring Deposit Maturity Calculator | Toolskyt',
    metaDescription:
      'Calculate recurring deposit maturity amount and total interest earned. Plan monthly savings.',
    keywords: ['rd calculator', 'recurring deposit calculator'],
    relatedTools: ['fd-calculator', 'sip-calculator'],
  },
  {
    id: 'ppf-calculator',
    name: 'PPF Calculator',
    description: 'Calculate Public Provident Fund maturity with year-wise breakdown',
    module: 'finance',
    slug: '/finance/ppf-calculator',
    icon: 'ShieldCheckIcon',
    tags: ['ppf', 'public provident fund', 'tax saving', '80c'],
    isPopular: true,
    metaTitle: 'PPF Calculator - Public Provident Fund Returns | Toolskyt',
    metaDescription:
      'Calculate PPF maturity amount with complete year-wise breakdown. Tax-free returns under Section 80C.',
    keywords: [
      'ppf calculator',
      'public provident fund calculator',
      'ppf returns',
      '80c investment',
    ],
    relatedTools: ['epf-calculator', 'fd-calculator', 'retirement-calculator'],
  },
  {
    id: 'epf-calculator',
    name: 'EPF Calculator',
    description: 'Calculate Employee Provident Fund corpus and returns',
    module: 'finance',
    slug: '/finance/epf-calculator',
    icon: 'BuildingOfficeIcon',
    tags: ['epf', 'employee provident fund', 'pf', 'retirement'],
    metaTitle: 'EPF Calculator - Employee Provident Fund Calculator | Toolskyt',
    metaDescription:
      'Calculate EPF corpus at retirement based on salary and contribution. Plan your retirement corpus.',
    keywords: ['epf calculator', 'pf calculator', 'employee provident fund'],
    relatedTools: ['ppf-calculator', 'retirement-calculator'],
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    description: 'Plan your retirement corpus and monthly income needs',
    module: 'finance',
    slug: '/finance/retirement-calculator',
    icon: 'SunIcon',
    tags: ['retirement', 'planning', 'corpus', 'pension'],
    isFeatured: true,
    metaTitle: 'Retirement Calculator - Plan Your Retirement Corpus | Toolskyt',
    metaDescription:
      'Calculate how much you need to retire comfortably. Account for inflation and expected returns.',
    keywords: ['retirement calculator', 'retirement planning', 'retirement corpus'],
    relatedTools: ['sip-calculator', 'ppf-calculator', 'epf-calculator'],
  },
  {
    id: 'gst-calculator',
    name: 'GST Calculator',
    description: 'Calculate GST amount for goods and services instantly',
    module: 'finance',
    slug: '/finance/gst-calculator',
    icon: 'ReceiptPercentIcon',
    tags: ['gst', 'goods and services tax', 'tax', 'india'],
    isPopular: true,
    metaTitle: 'GST Calculator - Calculate GST Amount Online | Toolskyt',
    metaDescription:
      'Free GST calculator. Calculate GST at 5%, 12%, 18%, 28% rates. Find GST exclusive or inclusive amounts.',
    keywords: ['gst calculator', 'gst amount', 'goods and services tax calculator', 'gst india'],
    relatedTools: ['income-tax-calculator', 'salary-calculator'],
  },
  {
    id: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    description: 'Calculate income tax under old and new tax regime for FY 2024-25',
    module: 'finance',
    slug: '/finance/income-tax-calculator',
    icon: 'DocumentChartBarIcon',
    tags: ['income tax', 'tax', 'itr', 'old regime', 'new regime'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Income Tax Calculator FY 2024-25 - Old & New Regime | Toolskyt',
    metaDescription:
      'Calculate income tax for FY 2024-25 under both old and new tax regime. Compare and choose the best regime.',
    keywords: [
      'income tax calculator',
      'tax calculator india',
      'new tax regime calculator',
      'income tax 2024-25',
    ],
    relatedTools: ['salary-calculator', 'hra-calculator', 'gst-calculator'],
  },
  {
    id: 'salary-calculator',
    name: 'Salary Calculator',
    description: 'Calculate take-home salary from CTC with all deductions',
    module: 'finance',
    slug: '/finance/salary-calculator',
    icon: 'CreditCardIcon',
    tags: ['salary', 'ctc', 'take home', 'in-hand salary', 'pf', 'tds'],
    isPopular: true,
    metaTitle: 'Salary Calculator - Calculate Take Home Salary from CTC | Toolskyt',
    metaDescription:
      'Calculate your monthly in-hand salary from annual CTC. Includes PF, TDS, HRA, and all deductions.',
    keywords: [
      'salary calculator',
      'ctc to take home',
      'in-hand salary calculator',
      'salary breakup',
    ],
    relatedTools: ['income-tax-calculator', 'hra-calculator', 'epf-calculator'],
  },
  {
    id: 'hra-calculator',
    name: 'HRA Calculator',
    description: 'Calculate HRA exemption under Section 10(13A)',
    module: 'finance',
    slug: '/finance/hra-calculator',
    icon: 'HomeModernIcon',
    tags: ['hra', 'house rent allowance', 'tax exemption', '10(13a)'],
    metaTitle: 'HRA Calculator - House Rent Allowance Exemption | Toolskyt',
    metaDescription:
      'Calculate HRA exemption under Section 10(13A) based on salary, HRA received and rent paid.',
    keywords: ['hra calculator', 'house rent allowance', 'hra exemption'],
    relatedTools: ['salary-calculator', 'income-tax-calculator'],
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest with different compounding frequencies',
    module: 'finance',
    slug: '/finance/compound-interest-calculator',
    icon: 'ArrowTrendingUpIcon',
    tags: ['compound interest', 'compounding', 'investment growth'],
    metaTitle: 'Compound Interest Calculator - Calculate Investment Growth | Toolskyt',
    metaDescription:
      'Calculate compound interest with annual, quarterly, monthly, or daily compounding. See the power of compounding.',
    keywords: ['compound interest calculator', 'compounding calculator', 'interest calculator'],
    relatedTools: ['simple-interest-calculator', 'fd-calculator', 'sip-calculator'],
  },
  {
    id: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on principal amount',
    module: 'finance',
    slug: '/finance/simple-interest-calculator',
    icon: 'CalculatorIcon',
    tags: ['simple interest', 'interest', 'loan', 'finance'],
    metaTitle: 'Simple Interest Calculator - SI Formula Calculator | Toolskyt',
    metaDescription:
      'Calculate simple interest using P×R×T/100 formula. Find principal, rate or time instantly.',
    keywords: ['simple interest calculator', 'si calculator', 'interest calculator'],
    relatedTools: ['compound-interest-calculator', 'fd-calculator'],
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between 170+ world currencies with live rates',
    module: 'finance',
    slug: '/finance/currency-converter',
    icon: 'GlobeAltIcon',
    tags: ['currency', 'forex', 'exchange rate', 'usd', 'inr', 'eur'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Currency Converter - Convert 170+ Currencies | Toolskyt',
    metaDescription:
      'Free currency converter with 170+ currencies. Convert USD to INR, EUR to USD and more with up-to-date rates.',
    keywords: [
      'currency converter',
      'forex converter',
      'exchange rate',
      'usd to inr',
      'eur to usd',
    ],
    relatedTools: ['inflation-calculator'],
  },
  {
    id: 'inflation-calculator',
    name: 'Inflation Calculator',
    description: 'Calculate the future value of money adjusted for inflation',
    module: 'finance',
    slug: '/finance/inflation-calculator',
    icon: 'ArrowTrendingUpIcon',
    tags: ['inflation', 'purchasing power', 'cost of living', 'cpi'],
    metaTitle: 'Inflation Calculator - Calculate Future Value of Money | Toolskyt',
    metaDescription:
      'Calculate how inflation erodes purchasing power. Find the future value of any amount based on inflation rate.',
    keywords: ['inflation calculator', 'purchasing power calculator', 'inflation rate'],
    relatedTools: ['compound-interest-calculator', 'retirement-calculator'],
  },
  {
    id: 'budget-planner',
    name: 'Budget Planner',
    description: 'Create a monthly budget and track income vs expenses',
    module: 'finance',
    slug: '/finance/budget-planner',
    icon: 'PresentationChartBarIcon',
    tags: ['budget', 'planning', 'expenses', 'income', '50/30/20'],
    isFeatured: true,
    metaTitle: 'Budget Planner - Monthly Budget Calculator | Toolskyt',
    metaDescription:
      'Plan your monthly budget with the 50/30/20 rule. Track income, expenses and savings goal.',
    keywords: ['budget planner', 'monthly budget', 'budget calculator', '50 30 20 rule'],
    relatedTools: ['expense-tracker', 'savings-planner'],
  },
  {
    id: 'gratuity-calculator',
    name: 'Gratuity Calculator',
    description: 'Calculate gratuity amount under Payment of Gratuity Act',
    module: 'finance',
    slug: '/finance/gratuity-calculator',
    icon: 'GiftIcon',
    tags: ['gratuity', 'retirement benefit', 'employee benefit'],
    metaTitle: 'Gratuity Calculator - Calculate Gratuity Amount | Toolskyt',
    metaDescription:
      'Calculate gratuity amount as per Payment of Gratuity Act 1972 based on salary and years of service.',
    keywords: ['gratuity calculator', 'gratuity amount', 'gratuity formula'],
    relatedTools: ['epf-calculator', 'salary-calculator'],
  },
  {
    id: 'stock-average-calculator',
    name: 'Stock Average Calculator',
    description: 'Calculate average purchase price of stocks across multiple buys',
    module: 'finance',
    slug: '/finance/stock-average-calculator',
    icon: 'ChartBarSquareIcon',
    tags: ['stock', 'average price', 'shares', 'investment'],
    metaTitle: 'Stock Average Calculator - Average Share Price Calculator | Toolskyt',
    metaDescription:
      'Calculate average purchase price of stocks when bought at different prices. Add unlimited transactions.',
    keywords: ['stock average calculator', 'average share price', 'stock average price'],
    relatedTools: ['brokerage-calculator', 'crypto-profit-calculator'],
  },
  {
    id: 'brokerage-calculator',
    name: 'Brokerage Calculator',
    description: 'Calculate brokerage fees, STT, and other charges for stock trading',
    module: 'finance',
    slug: '/finance/brokerage-calculator',
    icon: 'ArrowsRightLeftIcon',
    tags: ['brokerage', 'trading', 'zerodha', 'charges', 'stt'],
    metaTitle: 'Brokerage Calculator - Calculate Trading Charges | Toolskyt',
    metaDescription:
      'Calculate total brokerage charges including STT, GST, stamp duty for equity, F&O and commodity trading.',
    keywords: [
      'brokerage calculator',
      'trading charges',
      'zerodha brokerage',
      'stock trading cost',
    ],
    relatedTools: ['stock-average-calculator'],
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tip amount and split the bill among friends',
    module: 'finance',
    slug: '/finance/tip-calculator',
    icon: 'UsersIcon',
    tags: ['tip', 'bill split', 'restaurant', 'service charge'],
    metaTitle: 'Tip Calculator - Calculate Tip & Split Bill | Toolskyt',
    metaDescription:
      'Calculate tip amount and split restaurant bills equally. Choose tip percentage and number of people.',
    keywords: ['tip calculator', 'tip amount', 'bill splitter', 'restaurant tip'],
    relatedTools: ['bill-splitter'],
  },
  {
    id: 'bill-splitter',
    name: 'Bill Splitter',
    description: 'Split bills among multiple people with custom shares',
    module: 'finance',
    slug: '/finance/bill-splitter',
    icon: 'UsersIcon',
    tags: ['bill split', 'group expense', 'shared cost', 'divide bill'],
    metaTitle: 'Bill Splitter - Split Bills Among Friends | Toolskyt',
    metaDescription:
      'Split restaurant bills, travel expenses or any cost among friends. Supports custom split ratios.',
    keywords: ['bill splitter', 'split bill', 'expense splitter'],
    relatedTools: ['tip-calculator', 'expense-tracker'],
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Track daily expenses and view spending by category',
    module: 'finance',
    slug: '/finance/expense-tracker',
    icon: 'ClipboardDocumentListIcon',
    tags: ['expense', 'budget', 'spending', 'tracker', 'finance'],
    metaTitle: 'Expense Tracker - Track Daily Spending | Toolskyt',
    metaDescription:
      'Track daily expenses by category. View spending patterns and stay within your budget.',
    keywords: ['expense tracker', 'expense manager', 'spending tracker'],
    relatedTools: ['budget-planner', 'bill-splitter'],
  },
  {
    id: 'savings-planner',
    name: 'Savings Planner',
    description: 'Plan and track your savings goals with timeline',
    module: 'finance',
    slug: '/finance/savings-planner',
    icon: 'BanknotesIcon',
    tags: ['savings', 'goal', 'planning', 'emergency fund'],
    metaTitle: 'Savings Planner - Plan Your Savings Goals | Toolskyt',
    metaDescription:
      'Set savings goals and calculate how much to save monthly. Track progress toward your financial goals.',
    keywords: ['savings planner', 'savings goal calculator', 'savings calculator'],
    relatedTools: ['budget-planner', 'sip-calculator'],
  },
  {
    id: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    description: 'Calculate your total net worth from assets and liabilities',
    module: 'finance',
    slug: '/finance/net-worth-calculator',
    icon: 'ScaleIcon',
    tags: ['net worth', 'assets', 'liabilities', 'wealth'],
    metaTitle: 'Net Worth Calculator - Calculate Your Total Net Worth | Toolskyt',
    metaDescription:
      'Calculate your total net worth by listing all assets and liabilities. Track your financial health.',
    keywords: ['net worth calculator', 'assets liabilities calculator', 'wealth calculator'],
    relatedTools: ['budget-planner', 'retirement-calculator'],
  },
  {
    id: 'gold-investment-calculator',
    name: 'Gold Investment Calculator',
    description: 'Calculate gold investment returns and compare with other assets',
    module: 'finance',
    slug: '/finance/gold-investment-calculator',
    icon: 'StarIcon',
    tags: ['gold', 'investment', 'sgb', 'gold etf', 'returns'],
    metaTitle: 'Gold Investment Calculator - Gold Returns Calculator | Toolskyt',
    metaDescription:
      'Calculate returns on gold investment. Compare physical gold, Gold ETF and Sovereign Gold Bond returns.',
    keywords: ['gold investment calculator', 'gold returns', 'sgb calculator'],
    relatedTools: ['sip-calculator', 'fd-calculator'],
  },
  {
    id: 'crypto-profit-calculator',
    name: 'Crypto Profit Calculator',
    description: 'Calculate cryptocurrency profit/loss and tax implications',
    module: 'finance',
    slug: '/finance/crypto-profit-calculator',
    icon: 'CurrencyBitcoinIcon',
    tags: ['crypto', 'bitcoin', 'profit', 'loss', '30% tax'],
    metaTitle: 'Crypto Profit Calculator - Calculate Crypto Gains & Tax | Toolskyt',
    metaDescription:
      'Calculate cryptocurrency profit or loss and applicable 30% tax under Indian law. Works for Bitcoin, ETH and all cryptos.',
    keywords: ['crypto profit calculator', 'cryptocurrency calculator', 'crypto tax india'],
    relatedTools: ['stock-average-calculator', 'income-tax-calculator'],
  },
  {
    id: 'subscription-tracker',
    name: 'Subscription Tracker',
    description: 'Track all your recurring subscriptions and monthly costs',
    module: 'finance',
    slug: '/finance/subscription-tracker',
    icon: 'ArrowPathIcon',
    tags: ['subscription', 'recurring', 'netflix', 'saas', 'monthly cost'],
    metaTitle: 'Subscription Tracker - Track All Your Subscriptions | Toolskyt',
    metaDescription:
      'Track all your monthly and annual subscriptions. See total spend and upcoming renewals.',
    keywords: ['subscription tracker', 'subscription manager', 'monthly subscription cost'],
    relatedTools: ['expense-tracker', 'budget-planner'],
  },
  {
    id: 'credit-card-emi',
    name: 'Credit Card EMI Calculator',
    description: 'Calculate credit card EMI and compare with paying full amount',
    module: 'finance',
    slug: '/finance/credit-card-emi',
    icon: 'CreditCardIcon',
    tags: ['credit card', 'emi', 'no cost emi', 'interest'],
    metaTitle: 'Credit Card EMI Calculator - Calculate Card EMI | Toolskyt',
    metaDescription:
      'Calculate credit card EMI options. Compare converting to EMI vs full payment. Find the best option.',
    keywords: ['credit card emi calculator', 'card emi', 'no cost emi calculator'],
    relatedTools: ['emi-calculator', 'personal-loan-calculator'],
  },
  {
    id: 'mutual-fund-calculator',
    name: 'Mutual Fund Calculator',
    description: 'Calculate mutual fund returns for lump sum investments',
    module: 'finance',
    slug: '/finance/mutual-fund-calculator',
    icon: 'ChartPieIcon',
    tags: ['mutual fund', 'lump sum', 'investment', 'nav', 'returns'],
    metaTitle: 'Mutual Fund Calculator - Lump Sum Returns Calculator | Toolskyt',
    metaDescription:
      'Calculate returns on lump sum mutual fund investment. Enter amount, expected return and investment period.',
    keywords: ['mutual fund calculator', 'lump sum calculator', 'mutual fund returns'],
    relatedTools: ['sip-calculator', 'fd-calculator'],
  },
  {
    id: 'loan-comparison',
    name: 'Loan Comparison Tool',
    description: 'Compare multiple loan offers side-by-side',
    module: 'finance',
    slug: '/finance/loan-comparison',
    icon: 'ArrowsRightLeftIcon',
    tags: ['loan comparison', 'compare loans', 'best loan', 'interest rate'],
    metaTitle: 'Loan Comparison Tool - Compare Multiple Loan Offers | Toolskyt',
    metaDescription:
      'Compare multiple loan offers side by side. Find the cheapest loan by total cost comparison.',
    keywords: ['loan comparison', 'compare loans', 'best loan offer'],
    relatedTools: ['emi-calculator', 'home-loan-calculator'],
  },

  // ─────────────────────────────────────────────
  // DEVELOPER MODULE
  // ─────────────────────────────────────────────
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify JSON with syntax highlighting',
    longDescription: 'Toolskyt JSON Formatter & Validator helps you clean, pretty-print, parse, and analyze raw JSON strings. It detects syntax errors in real-time, displays precise line numbers for issues, and outputs structured, readable JSON complete with code highlighting.',
    module: 'developer',
    slug: '/developer/json-formatter',
    icon: 'CodeBracketIcon',
    tags: ['json', 'formatter', 'validator', 'beautify', 'minify'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'JSON Formatter & Validator - Beautify JSON Online | Toolskyt',
    metaDescription:
      'Free JSON formatter and validator. Beautify, minify, validate and fix JSON. Syntax highlighting with error detection.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'format json online'],
    relatedTools: ['json-diff', 'json-to-csv', 'csv-to-json', 'yaml-formatter'],
    benefits: [
      'Instantly beautify raw compressed API responses into readable structures.',
      'Detect syntax errors and identify line numbers for key fixes.',
      'Save time when debugging nested JSON configurations.'
    ],
    features: [
      'Interactive syntax highlighting with support for dark/light themes.',
      'One-click minification and copying controls.',
      'Validates conformance to RFC 8259 JSON standards.'
    ],
    howToSteps: [
      { name: 'Paste JSON Code', text: 'Paste your raw or minified JSON string into the editor.' },
      { name: 'Click Format', text: 'The tool will automatically parse and pretty-print the data.' },
      { name: 'Check Validation Errors', text: 'If there are formatting errors, the validator will mark them.' },
      { name: 'Copy or Minify', text: 'Copy the beautified result or minify it back into a single string.' }
    ],
    faq: [
      { question: 'Does this formatter upload my JSON data?', answer: 'Never. Your data is formatted entirely inside your browser tab using client-side JavaScript.' },
      { question: 'What standard does the validator use?', answer: 'It conforms to strict RFC 8259 specifications, identifying invalid commas, trailing commas, or missing quotes.' }
    ]
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode and decode Base64 strings and files',
    longDescription: 'Quickly convert text strings or binary files to and from Base64 representation. This utility is ideal for developers encoding credentials, embedding image assets in stylesheets, or translating web tokens safely.',
    module: 'developer',
    slug: '/developer/base64',
    icon: 'ArrowsRightLeftIcon',
    tags: ['base64', 'encode', 'decode', 'encoding'],
    isPopular: true,
    metaTitle: 'Base64 Encoder Decoder - Encode/Decode Online | Toolskyt',
    metaDescription:
      'Free Base64 encoder and decoder. Convert text and files to/from Base64 encoding instantly.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 online', 'encode decode base64'],
    relatedTools: ['url-encoder', 'hash-generator', 'jwt-decoder'],
    benefits: [
      'Secure offline encoding prevents credentials exposure.',
      'Supports file conversion to Base64 data URIs.',
      'Accurate conversion conforming to RFC 4648 standards.'
    ],
    features: [
      'Dual-input interface supporting instant text conversions.',
      'Drag and drop files to generate inline Base64 data hashes.',
      'One-click copying and query clearing triggers.'
    ],
    howToSteps: [
      { name: 'Paste Target Text', text: 'Paste the string or upload the file you wish to convert.' },
      { name: 'Select Action', text: 'Choose to either Encode or Decode the input data.' },
      { name: 'Copy Result', text: 'Collect the output stream immediately from the output display panel.' }
    ],
    faq: [
      { question: 'What is Base64?', answer: 'Base64 is a binary-to-text encoding scheme that translates binary data into a set of 64 ASCII characters.' },
      { question: 'Are files sent to external servers?', answer: 'No. File processing and encoding occur strictly within your local browser cache.' }
    ]
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode and decode URLs and query parameters',
    module: 'developer',
    slug: '/developer/url-encoder',
    icon: 'LinkIcon',
    tags: ['url', 'encode', 'decode', 'percent encoding', 'uri'],
    isPopular: true,
    metaTitle: 'URL Encoder Decoder - Encode/Decode URLs Online | Toolskyt',
    metaDescription:
      'Free URL encoder and decoder. Percent-encode special characters in URLs and query parameters.',
    keywords: ['url encoder', 'url decoder', 'url encode decode', 'percent encoding'],
    relatedTools: ['base64', 'jwt-decoder'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder & Inspector',
    description: 'Decode and inspect JWT tokens with claims validation',
    longDescription: 'Toolskyt JWT Decoder & Inspector lets you safely decode JSON Web Tokens (JWT) locally to view the header metadata, payload JSON, and signatures. It parses claims, checks validation variables, and reports token expiration states.',
    module: 'developer',
    slug: '/developer/jwt-decoder',
    icon: 'ShieldCheckIcon',
    tags: ['jwt', 'json web token', 'decode', 'auth', 'bearer'],
    isPopular: true,
    metaTitle: 'JWT Decoder - Decode & Inspect JSON Web Tokens | Toolskyt',
    metaDescription:
      'Free JWT decoder. Inspect header, payload and verify JWT token structure. View claims and expiry.',
    keywords: ['jwt decoder', 'json web token decoder', 'jwt inspector', 'decode jwt'],
    relatedTools: ['base64', 'hash-generator'],
    benefits: [
      'Inspect authorization payloads without exposing credentials.',
      'Verify expiration timestamps and signature methods.',
      'Format nested headers and parameters cleanly.'
    ],
    features: [
      'Interactive syntax highlighting for decoded token payloads.',
      'Real-time expiration countdown and claims indicators.',
      'Full validation reports on standard claims (iss, sub, exp).'
    ],
    howToSteps: [
      { name: 'Paste JWT Token', text: 'Paste your encoded JSON Web Token (typically beginning with eyJ).' },
      { name: 'Inspect Payload', text: 'Review the formatted JSON output showing header metadata and payload data.' },
      { name: 'Check Expiration', text: 'View active claims validation and token expiry state.' }
    ],
    faq: [
      { question: 'Is it safe to decode secret keys online?', answer: 'With Toolskyt, it is 100% safe. All token decoding occurs client-side in your tab; we never log or inspect tokens.' },
      { question: 'Can I verify the signature?', answer: 'Yes, our inspector validates structure signatures and validates signatures algorithm parameters.' }
    ]
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUIDs (v1, v4, v5) individually or in bulk',
    longDescription: 'Generate universally unique identifiers (UUIDs) locally. Toolskyt supports v1 (timestamp-based), v4 (fully random), and v5 (namespace SHA-1) configurations. Ideal for generating test keys, database IDs, and software identifiers.',
    module: 'developer',
    slug: '/developer/uuid-generator',
    icon: 'FingerPrintIcon',
    tags: ['uuid', 'guid', 'unique id', 'v4', 'random'],
    isPopular: true,
    metaTitle: 'UUID Generator - Generate UUIDs Online | Toolskyt',
    metaDescription:
      'Generate UUID v1, v4, v5 instantly. Bulk generate multiple UUIDs. Copy with one click.',
    keywords: ['uuid generator', 'guid generator', 'random uuid', 'generate uuid online'],
    relatedTools: ['hash-generator', 'password-generator'],
    benefits: [
      'Generate up to 10,000 UUIDs instantly in bulk.',
      'Supports RFC 4122 compliance for v1, v4, and v5 standards.',
      'Fully offline generation guarantees no ID logging.'
    ],
    features: [
      'Adjust counts to generate multiple GUIDs in a single click.',
      'Customize layouts (hyphens, uppercase, or raw text blocks).',
      'Download UUID lists as plain text files.'
    ],
    howToSteps: [
      { name: 'Choose UUID Version', text: 'Select v1, v4, or v5 based on your identifier requirements.' },
      { name: 'Select Quantity', text: 'Specify how many UUIDs you need to generate (e.g. 1 to 1000).' },
      { name: 'Click Generate', text: 'The UUIDs will be generated instantly in the text panel.' },
      { name: 'Copy or Save', text: 'Copy the list or download it directly to your system.' }
    ],
    faq: [
      { question: 'What is a UUID?', answer: 'A Universally Unique Identifier (UUID) is a 128-bit label used for information identification in computer systems.' },
      { question: 'Is a v4 UUID truly random?', answer: 'Yes, v4 UUIDs rely on cryptographically secure pseudorandom numbers to ensure collision-free keys.' }
    ]
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes',
    module: 'developer',
    slug: '/developer/hash-generator',
    icon: 'LockClosedIcon',
    tags: ['hash', 'md5', 'sha', 'sha256', 'checksum', 'crypto'],
    isPopular: true,
    metaTitle: 'Hash Generator - MD5, SHA256, SHA512 Hash Tool | Toolskyt',
    metaDescription:
      'Generate MD5, SHA-1, SHA-256, SHA-512 hashes online. Verify file integrity and checksums.',
    keywords: ['hash generator', 'md5 generator', 'sha256 generator', 'checksum calculator'],
    relatedTools: ['uuid-generator', 'base64', 'password-generator'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time match highlighting',
    module: 'developer',
    slug: '/developer/regex-tester',
    icon: 'MagnifyingGlassIcon',
    tags: ['regex', 'regular expression', 'pattern match', 'javascript regex'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Regex Tester - Test Regular Expressions Online | Toolskyt',
    metaDescription:
      'Free regex tester with real-time match highlighting. Test JavaScript, Python, PCRE regex patterns with explanation.',
    keywords: ['regex tester', 'regular expression tester', 'regex online', 'regex matcher'],
    relatedTools: ['text-diff', 'find-replace'],
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    module: 'developer',
    slug: '/developer/timestamp-converter',
    icon: 'ClockIcon',
    tags: ['timestamp', 'unix time', 'epoch', 'date conversion'],
    metaTitle: 'Timestamp Converter - Unix to Date Time Converter | Toolskyt',
    metaDescription:
      'Convert Unix timestamps to human-readable dates and vice versa. Support for all time zones.',
    keywords: ['timestamp converter', 'unix timestamp', 'epoch converter', 'unix to date'],
    relatedTools: ['alternative-timestamps'],
  },
  {
    id: 'alternative-timestamps',
    name: 'Alternative Timestamps Converter',
    description: 'Convert between LDAP, Chrome, NTP, Cocoa, GPS, and Unix epoch timestamps',
    module: 'developer',
    slug: '/developer/alternative-timestamps',
    icon: 'ClockIcon',
    tags: ['timestamp', 'epoch', 'ldap', 'chrome webkit', 'ntp', 'ticks', 'cocoa'],
    metaTitle: 'Alternative Timestamps Converter - LDAP, WebKit, Cocoa, NTP | Toolskyt',
    metaDescription:
      'Free multi-epoch converter. Translate between Windows LDAP, Chrome/WebKit, .NET Ticks, NTP, Cocoa Core Data, GPS, and Unix timestamps.',
    keywords: [
      'alternative epoch',
      'ldap timestamp',
      'webkit timestamp',
      'chrome timestamp',
      'net ticks',
      'ntp timestamp',
      'cocoa timestamp',
      'gps time',
    ],
    relatedTools: ['timestamp-converter'],
  },
  {
    id: 'color-picker',
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, HSL, HSV formats',
    module: 'developer',
    slug: '/developer/color-picker',
    icon: 'SwatchIcon',
    tags: ['color', 'hex', 'rgb', 'hsl', 'color picker', 'css colors'],
    isPopular: true,
    metaTitle: 'Color Picker & Converter - HEX RGB HSL | Toolskyt',
    metaDescription:
      'Free color picker. Convert colors between HEX, RGB, HSL, HSV formats. Pick any color from palette.',
    keywords: ['color picker', 'color converter', 'hex to rgb', 'rgb to hex', 'hsl converter'],
    relatedTools: ['gradient-generator', 'css-formatter'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries with keyword highlighting',
    module: 'developer',
    slug: '/developer/sql-formatter',
    icon: 'CircleStackIcon',
    tags: ['sql', 'format', 'query', 'database', 'mysql', 'postgresql'],
    isPopular: true,
    metaTitle: 'SQL Formatter - Beautify SQL Queries Online | Toolskyt',
    metaDescription:
      'Free SQL formatter. Beautify MySQL, PostgreSQL, SQLite, SQL Server queries with proper indentation.',
    keywords: ['sql formatter', 'sql beautifier', 'format sql', 'sql pretty print'],
    relatedTools: ['json-formatter', 'html-formatter'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two texts or code blocks side-by-side',
    module: 'developer',
    slug: '/developer/diff-checker',
    icon: 'DocumentDuplicateIcon',
    tags: ['diff', 'compare', 'text comparison', 'code diff'],
    isPopular: true,
    metaTitle: 'Diff Checker - Compare Two Texts Online | Toolskyt',
    metaDescription:
      'Free diff checker. Compare two text files or code blocks. See additions, deletions and changes highlighted.',
    keywords: ['diff checker', 'text diff', 'code compare', 'text comparison online'],
    relatedTools: ['json-diff', 'text-diff'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords with custom rules',
    module: 'developer',
    slug: '/developer/password-generator',
    icon: 'KeyIcon',
    tags: ['password', 'security', 'strong password', 'random password'],
    isPopular: true,
    metaTitle: 'Password Generator - Generate Strong Passwords | Toolskyt',
    metaDescription:
      'Generate strong, secure random passwords. Set length, include symbols, numbers, uppercase. Bulk generation.',
    keywords: [
      'password generator',
      'strong password generator',
      'random password',
      'secure password',
    ],
    relatedTools: ['uuid-generator', 'hash-generator'],
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate Lorem Ipsum placeholder text of any length',
    module: 'developer',
    slug: '/developer/lorem-ipsum',
    icon: 'DocumentTextIcon',
    tags: ['lorem ipsum', 'placeholder', 'dummy text', 'lipsum'],
    metaTitle: 'Lorem Ipsum Generator - Generate Placeholder Text | Toolskyt',
    metaDescription:
      'Generate Lorem Ipsum placeholder text. Choose words, sentences or paragraphs. Custom starting text.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text generator', 'lipsum'],
    relatedTools: ['word-counter', 'random-text'],
  },
  {
    id: 'gradient-generator',
    name: 'Gradient Generator',
    description: 'Create CSS gradients visually and copy the CSS code',
    module: 'developer',
    slug: '/developer/gradient-generator',
    icon: 'PaintBrushIcon',
    tags: ['gradient', 'css gradient', 'linear gradient', 'radial gradient'],
    metaTitle: 'CSS Gradient Generator - Create Beautiful Gradients | Toolskyt',
    metaDescription:
      'Create CSS linear and radial gradients visually. Copy CSS code instantly. Live preview.',
    keywords: [
      'css gradient generator',
      'gradient maker',
      'linear gradient',
      'background gradient',
    ],
    relatedTools: ['color-picker'],
  },
  {
    id: 'cron-builder',
    name: 'Cron Expression Builder',
    description: 'Build and validate cron expressions with human-readable descriptions',
    module: 'developer',
    slug: '/developer/cron-builder',
    icon: 'ClockIcon',
    tags: ['cron', 'cron expression', 'schedule', 'unix cron'],
    metaTitle: 'Cron Expression Builder - Build Cron Jobs Online | Toolskyt',
    metaDescription:
      'Build cron expressions visually. Get human-readable descriptions. Validate next execution times.',
    keywords: ['cron builder', 'cron expression', 'cron generator', 'cron validator'],
    relatedTools: ['timestamp-converter'],
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Write and preview Markdown with live rendering',
    module: 'developer',
    slug: '/developer/markdown-preview',
    icon: 'DocumentTextIcon',
    tags: ['markdown', 'preview', 'md', 'github markdown'],
    metaTitle: 'Markdown Preview - Live Markdown Editor | Toolskyt',
    metaDescription:
      'Write Markdown with live preview. GitHub Flavored Markdown support. Export to HTML.',
    keywords: ['markdown preview', 'markdown editor', 'live markdown', 'md preview'],
    relatedTools: ['html-formatter', 'text-diff'],
  },

  // ─────────────────────────────────────────────
  // IMAGE MODULE
  // ─────────────────────────────────────────────
  {
    id: 'image-resize',
    name: 'Image Resizer',
    description: 'Resize images to any dimension while maintaining aspect ratio',
    module: 'image',
    slug: '/image/resize',
    icon: 'ArrowsPointingOutIcon',
    tags: ['image resize', 'resize photo', 'scale image', 'resolution'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Image Resizer - Resize Photos Online for Free | Toolskyt',
    metaDescription:
      'Resize images online. Set custom dimensions, maintain aspect ratio. No upload, 100% private browser-based.',
    keywords: ['image resizer', 'resize image online', 'photo resizer', 'resize photo'],
    relatedTools: ['image-compress', 'image-crop', 'jpg-converter'],
  },
  {
    id: 'image-compress',
    name: 'Image Compressor',
    description: 'Compress images and reduce file size without quality loss',
    module: 'image',
    slug: '/image/compress',
    icon: 'ArchiveBoxIcon',
    tags: ['compress image', 'reduce file size', 'image optimization', 'webp'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Image Compressor - Reduce Image Size Online | Toolskyt',
    metaDescription:
      'Compress images online without losing quality. Reduce file size by up to 90%. Supports JPG, PNG, WEBP.',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'image optimizer'],
    relatedTools: ['image-resize', 'webp-converter'],
  },
  {
    id: 'image-crop',
    name: 'Image Cropper',
    description: 'Crop images to custom dimensions or preset aspect ratios',
    module: 'image',
    slug: '/image/crop',
    icon: 'ScissorsIcon',
    tags: ['crop image', 'trim photo', 'aspect ratio', 'square crop'],
    metaTitle: 'Image Cropper - Crop Photos Online for Free | Toolskyt',
    metaDescription:
      'Crop images to any size or preset aspect ratios (1:1, 16:9, 4:3). Free, browser-based, no upload.',
    keywords: ['image cropper', 'crop image online', 'photo cropper', 'crop photo'],
    relatedTools: ['image-resize', 'image-compress'],
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, contact, WiFi and more',
    module: 'image',
    slug: '/image/qr-generator',
    icon: 'QrCodeIcon',
    tags: ['qr code', 'qr generator', 'barcode', 'scan'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'QR Code Generator - Create QR Codes Free | Toolskyt',
    metaDescription:
      'Generate QR codes for URLs, text, WiFi, contact info, email and more. Download as PNG or SVG.',
    keywords: ['qr code generator', 'create qr code', 'free qr code', 'qr code maker'],
    relatedTools: ['barcode-generator'],
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    description: 'Generate barcodes in various formats (EAN, UPC, CODE128)',
    module: 'image',
    slug: '/image/barcode-generator',
    icon: 'QrCodeIcon',
    tags: ['barcode', 'ean', 'upc', 'code128', 'isbn'],
    metaTitle: 'Barcode Generator - Create Barcodes Online Free | Toolskyt',
    metaDescription:
      'Generate barcodes in EAN-13, EAN-8, UPC-A, CODE-128, CODE-39 formats. Download as SVG or PNG.',
    keywords: ['barcode generator', 'create barcode', 'ean barcode', 'upc barcode'],
    relatedTools: ['qr-generator'],
  },
  {
    id: 'jpg-converter',
    name: 'Image to JPG Converter',
    description: 'Convert PNG, WEBP, GIF images to JPG format',
    module: 'image',
    slug: '/image/jpg-converter',
    icon: 'PhotoIcon',
    tags: ['jpg', 'jpeg', 'convert', 'png to jpg', 'webp to jpg'],
    isPopular: true,
    metaTitle: 'Image to JPG Converter - Convert PNG WEBP to JPG | Toolskyt',
    metaDescription:
      'Convert PNG, WEBP, GIF, BMP to JPG online. Set quality. Free, fast and private.',
    keywords: ['png to jpg', 'webp to jpg', 'convert to jpg', 'image to jpeg'],
    relatedTools: ['webp-converter', 'image-compress', 'image-resize'],
  },
  {
    id: 'webp-converter',
    name: 'Image to WEBP Converter',
    description: 'Convert images to WEBP format for web optimization',
    module: 'image',
    slug: '/image/webp-converter',
    icon: 'PhotoIcon',
    tags: ['webp', 'convert', 'jpg to webp', 'png to webp', 'web optimization'],
    metaTitle: 'Image to WEBP Converter - Convert JPG PNG to WEBP | Toolskyt',
    metaDescription:
      'Convert JPG, PNG images to modern WEBP format. Reduce file size by 30%. Free online.',
    keywords: ['webp converter', 'jpg to webp', 'png to webp', 'convert to webp'],
    relatedTools: ['jpg-converter', 'image-compress'],
  },
  {
    id: 'color-palette',
    name: 'Color Palette Extractor',
    description: 'Extract dominant colors from any image',
    module: 'image',
    slug: '/image/color-palette',
    icon: 'SwatchIcon',
    tags: ['color palette', 'extract colors', 'dominant color', 'image colors'],
    metaTitle: 'Color Palette Extractor - Extract Colors from Image | Toolskyt',
    metaDescription:
      'Extract dominant colors from any image. Get HEX, RGB, HSL values. Generate color schemes.',
    keywords: ['color palette extractor', 'extract colors from image', 'image color picker'],
    relatedTools: ['color-picker', 'gradient-generator'],
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate favicon.ico and all required sizes from any image',
    module: 'image',
    slug: '/image/favicon-generator',
    icon: 'WindowIcon',
    tags: ['favicon', 'ico', 'browser icon', 'website icon'],
    metaTitle: 'Favicon Generator - Create Favicon from Image | Toolskyt',
    metaDescription:
      'Generate favicon.ico, apple-touch-icon and all required favicon sizes from any image. Download zip.',
    keywords: ['favicon generator', 'create favicon', 'favicon maker', 'ico generator'],
    relatedTools: ['image-resize', 'qr-generator'],
  },

  // ─────────────────────────────────────────────
  // TEXT MODULE
  // ─────────────────────────────────────────────
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, paragraphs and reading time',
    module: 'text',
    slug: '/text/word-counter',
    icon: 'DocumentTextIcon',
    tags: ['word count', 'character count', 'reading time', 'text analysis'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Word Counter - Count Words, Characters & Reading Time | Toolskyt',
    metaDescription:
      'Free word counter. Count words, characters, sentences, paragraphs and estimate reading time. Instant results.',
    keywords: ['word counter', 'character counter', 'word count online', 'count words'],
    relatedTools: ['character-counter', 'reading-time', 'case-converter'],
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between UPPER, lower, Title, camelCase, snake_case',
    module: 'text',
    slug: '/text/case-converter',
    icon: 'AdjustmentsHorizontalIcon',
    tags: ['case', 'uppercase', 'lowercase', 'title case', 'camelcase', 'snake_case'],
    isPopular: true,
    metaTitle: 'Case Converter - Convert Text Case Online | Toolskyt',
    metaDescription:
      'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, PascalCase instantly.',
    keywords: [
      'case converter',
      'text case converter',
      'uppercase lowercase',
      'camelcase converter',
    ],
    relatedTools: ['word-counter', 'slug-generator'],
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate URL-friendly slugs from any text',
    module: 'text',
    slug: '/text/slug-generator',
    icon: 'LinkIcon',
    tags: ['slug', 'url slug', 'permalink', 'seo url', 'kebab-case'],
    metaTitle: 'Slug Generator - Generate URL Slugs Online | Toolskyt',
    metaDescription:
      'Generate SEO-friendly URL slugs from any text. Removes special characters, converts spaces to hyphens.',
    keywords: ['slug generator', 'url slug', 'permalink generator', 'seo url generator'],
    relatedTools: ['case-converter', 'word-counter'],
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    description: 'Compare two text blocks and highlight differences',
    module: 'text',
    slug: '/text/text-diff',
    icon: 'DocumentDuplicateIcon',
    tags: ['diff', 'compare text', 'text difference', 'compare files'],
    metaTitle: 'Text Diff - Compare Two Texts and Find Differences | Toolskyt',
    metaDescription:
      'Compare two text blocks online. Highlight additions, deletions and changes with color coding.',
    keywords: ['text diff', 'text comparison', 'compare text online', 'find text differences'],
    relatedTools: ['diff-checker', 'find-replace'],
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Full-featured Markdown editor with live preview and export',
    module: 'text',
    slug: '/text/markdown-editor',
    icon: 'PencilSquareIcon',
    tags: ['markdown', 'editor', 'md', 'github markdown', 'preview'],
    metaTitle: 'Markdown Editor - Free Online Markdown Editor | Toolskyt',
    metaDescription:
      'Free online Markdown editor with live preview. Export to HTML or PDF. GitHub Flavored Markdown.',
    keywords: ['markdown editor', 'online markdown editor', 'free markdown', 'md editor'],
    relatedTools: ['word-counter', 'markdown-preview'],
  },
  {
    id: 'text-to-emoji',
    name: 'Text to Emoji Translator',
    description: 'Translate words to emojis or spell text using emoji blocks',
    longDescription: 'Toolskyt Text to Emoji Translator lets you translate standard text phrases into emoji expressions, swap keywords with their emoji equivalents, or render text characters as decorative emoji blocks.',
    module: 'text',
    slug: '/text/text-to-emoji',
    icon: 'FaceSmileIcon',
    tags: ['emoji', 'translator', 'text to emoji', 'emoji art'],
    metaTitle: 'Text to Emoji Translator - Convert Text to Emojis Online | Toolskyt',
    metaDescription:
      'Translate your words, sentences, or phrases into emojis instantly. Copy translated outputs or generate block emoji letters.',
    keywords: ['text to emoji', 'emoji translator', 'translate to emoji', 'emoji text converter'],
    relatedTools: ['case-converter', 'word-counter'],
    benefits: [
      'Create visual posts for social media feeds.',
      'Instantly swap keywords with matching emoticons.',
      'Generate block characters for messaging apps.'
    ],
    features: [
      'Interactive translation dictionary matching hundreds of keywords.',
      'Letter spelling generator using custom colored emoji squares.',
      'Quick copy and single-tap sharing controls.'
    ],
    howToSteps: [
      { name: 'Input Plain Text', text: 'Type or paste the sentence or text you want to convert.' },
      { name: 'Choose Converter Mode', text: 'Select either Word Translation mode or Block Speller mode.' },
      { name: 'Copy Emoji Output', text: 'Click Copy to collect the generated emoji blocks or translation.' }
    ],
    faq: [
      { question: 'How does the translation work?', answer: 'The translator checks your input text against a dictionary mapping key terms (like cat, heart, fire, pizza) to matching emojis.' },
      { question: 'Is it free to use?', answer: 'Yes! All Toolskyt converter utilities are 100% free with no registration.' }
    ]
  },
  {
    id: 'stylish-text',
    name: 'Stylish Text Generator',
    description: 'Convert regular text into stylish fonts and Unicode symbols',
    longDescription: 'Turn normal alphanumeric text into fancy, aesthetic, and stylish fonts using special Unicode characters. Perfect for social media bios (Instagram, Twitter), gaming nicknames, and chat decorations.',
    module: 'text',
    slug: '/text/stylish-text',
    icon: 'SparklesIcon',
    tags: ['stylish text', 'fancy text', 'font generator', 'unicode text', 'bio styles'],
    metaTitle: 'Stylish Text Generator - Fancy Text & Font Generator | Toolskyt',
    metaDescription:
      'Generate cool, stylish, and fancy text fonts online. Copy and paste scripts, gothic text, outline symbols, and cursive text.',
    keywords: ['stylish text', 'fancy text generator', 'font changer', 'unicode styles'],
    relatedTools: ['case-converter', 'slug-generator'],
    benefits: [
      'Decorate social profile descriptions and bio layouts.',
      'Generate unique gaming tags and server nicknames.',
      'Copy-paste compatible scripts that work across browsers.'
    ],
    features: [
      'Instantly produces 15+ text font variations on type.',
      'Includes Gothic, Script Cursive, Double-Struck Outline, Monospace, and Strikethrough.',
      'Single-tap Copy button for each generated style card.'
    ],
    howToSteps: [
      { name: 'Enter Text Input', text: 'Type the word or phrase you want to transform.' },
      { name: 'Browse Font Options', text: 'Scroll through the live list of generated typography variations.' },
      { name: 'Copy Preferred Style', text: 'Click the Copy button next to your favorite style card.' }
    ],
    faq: [
      { question: 'Do these styles work on Instagram or Twitter?', answer: 'Yes! Because they are generated using native Unicode characters, they can be copied and pasted directly into bio fields and posts.' },
      { question: 'Why do some characters look like blocks?', answer: 'Some older operating systems or browsers may not support specific Unicode symbols. Modern devices render all styles correctly.' }
    ]
  },
  {
    id: 'emoji-search',
    name: 'Emoji Search & Copy',
    description: 'Search, browse, and copy emojis with skin tone support',
    longDescription: 'A full-featured search engine for emojis. Browse categorized emojis, filter dynamically by keywords, customize skin-tone modifiers, and copy with a single tap.',
    module: 'text',
    slug: '/text/emoji-search',
    icon: 'FaceSmileIcon',
    tags: ['emoji search', 'find emoji', 'copy paste emoji', 'emoticons list'],
    metaTitle: 'Emoji Search & Copy - Find and Copy Emojis Online | Toolskyt',
    metaDescription:
      'Search emojis by keyword, category, or alias. Customize skin tones and copy emojis instantly to clipboard.',
    keywords: ['emoji search', 'emoji finder', 'copy emoji', 'find emoji online'],
    relatedTools: ['text-to-emoji', 'case-converter'],
    benefits: [
      'Quickly find the perfect emoji from categories.',
      'Apply standard skin-tone modifications.',
      'One-click copies directly to your clipboard.'
    ],
    features: [
      'Dynamically filters as you type keywords.',
      'Supports categories like Smileys, Animals, Food, Objects, and Flags.',
      'Skin tone picker modifier panel.'
    ],
    howToSteps: [
      { name: 'Browse or Search', text: 'Type a keyword (e.g. happy, fire) or browse categories.' },
      { name: 'Choose Skin Tone', text: 'If desired, select your preferred skin tone from the option bar.' },
      { name: 'Click to Copy', text: 'Click on any emoji card to copy it directly to your clipboard.' }
    ],
  },
  {
    id: 'pdf-to-markdown',
    name: 'PDF to Markdown',
    description: 'Convert PDF document text to clean Markdown formatting',
    longDescription: 'Extract text blocks, headings, lists, and links from PDF files client-side and convert them into clean Markdown formatting (.md) without uploading your files to any server.',
    module: 'text',
    slug: '/text/pdf-to-markdown',
    icon: 'DocumentTextIcon',
    tags: ['pdf to markdown', 'pdf converter', 'markdown parser', 'pdf extractor'],
    metaTitle: 'PDF to Markdown Converter - Extract PDF to MD Online | Toolskyt',
    metaDescription:
      'Free client-side PDF to Markdown converter. Upload any PDF file and convert headings, paragraph text, lists, and quotes into Markdown.',
    keywords: ['pdf to markdown', 'convert pdf to md', 'pdf markdown extractor', 'pdf to md free'],
    relatedTools: ['markdown-editor', 'word-counter'],
    benefits: [
      '100% private: processing is done entirely inside your browser.',
      'Instantly formats headings, paragraphs, and list elements.',
      'Supports dragging and dropping documents directly.'
    ],
    features: [
      'Automatic paragraph and header layout detection.',
      'Plain text and styled markdown output modes.',
      'Drag and drop file picker interface.'
    ],
    howToSteps: [
      { name: 'Upload PDF Document', text: 'Select or drag your PDF file into the upload zone.' },
      { name: 'Extract Text', text: 'Wait a few milliseconds for local browser extraction to compile.' },
      { name: 'Copy Markdown', text: 'Review the formatted Markdown and click Copy to Clipboard.' }
    ],
    faq: [
      { question: 'Is my PDF uploaded to any server?', answer: 'No! The conversion runs completely client-side. Your document text never leaves your device.' },
      { question: 'Does it support scanned images?', answer: 'This tool extracts text characters. It does not perform OCR on scanned text inside images.' }
    ]
  },
  {
    id: 'numbers-to-words',
    name: 'Numbers to Words Converter',
    description: 'Convert numbers to English words and Chinese characters',
    longDescription: 'Convert any numeric value into standard written English text words and Chinese characters (simplified/traditional) with Pinyin transliteration.',
    module: 'text',
    slug: '/text/numbers-to-words',
    icon: 'LanguageIcon',
    tags: ['numbers to words', 'number spelling', 'chinese numbers', 'pinyin converter'],
    metaTitle: 'Numbers to Words - English & Chinese Number Translator | Toolskyt',
    metaDescription:
      'Translate digits, decimals, and negative numbers into written words. Supports standard English spelling and Chinese Hanzi/Pinyin.',
    keywords: ['numbers to words', 'spell out numbers', 'number to words generator', 'numbers to chinese'],
    relatedTools: ['random-number', 'case-converter'],
    benefits: [
      'Write checks or fill bank forms without spelling errors.',
      'Learn standard numbering terminology in English and Chinese.',
      'Convert very large integer values instantly.'
    ],
    features: [
      'Supports English cardinality (spelled words) spelling formats.',
      'Converts to Simplified Chinese (Hanzi) and Traditional Chinese character sets.',
      'Includes Pinyin pronunciation guide for Chinese equivalents.'
    ],
    howToSteps: [
      { name: 'Enter Numeric Input', text: 'Type any numeric value (integer or decimal).' },
      { name: 'Select Target Language', text: 'Toggle between English Words mode or Chinese Characters mode.' },
      { name: 'Copy Output Words', text: 'Tap Copy to collect the written description.' }
    ],
    faq: [
      { question: 'What is the limit of the numbers converted?', answer: 'The tool supports integers up to 15 digits (trillions) with full decimal accuracy.' },
      { question: 'What is Pinyin?', answer: 'Pinyin is the official romanization system for Chinese characters, helping you read the characters correctly.' }
    ]
  },
  {
    id: 'detect-language',
    name: 'Detect Language',
    description: 'Identify the language of any text block instantly',
    longDescription: 'Analyze any input string and automatically detect which language it belongs to. Supports detection of English, Chinese, Spanish, French, German, Arabic, Japanese, Hindi, and more.',
    module: 'text',
    slug: '/text/detect-language',
    icon: 'QuestionMarkCircleIcon',
    tags: ['language detector', 'detect language', 'identify text', 'language finder'],
    metaTitle: 'Detect Language - Identify Text Language Online | Toolskyt',
    metaDescription:
      'Identify language of text blocks instantly. Clean client-side analysis supporting Spanish, English, French, and 15+ popular dialects.',
    keywords: ['language detector', 'identify language of text', 'what language is this', 'detect language online'],
    relatedTools: ['case-converter', 'word-counter'],
    benefits: [
      'Quickly classify unknown text or code snippets.',
      'Perform language detection completely offline in the browser.',
      'Displays matching confidence level metrics.'
    ],
    features: [
      'Stop-words statistical matching dictionary.',
      'Unicode script block mapping to separate Asian character languages.',
      'High-speed detection running in milliseconds.'
    ],
    howToSteps: [
      { name: 'Enter Text Block', text: 'Type or paste the words you want to check.' },
      { name: 'View Match Result', text: 'The detector displays the identified language and confidence level.' },
      { name: 'Copy Code', text: 'Copy the standard ISO code (e.g. "en", "zh", "es") if needed.' }
    ],
    faq: [
      { question: 'How accurate is the detection?', answer: 'Accuracy is very high for blocks of 3 or more words, as the stop-words algorithm works best with sentence segments.' },
      { question: 'Does it support code scripts?', answer: 'It is optimized for human spoken languages and will try to map text segments accordingly.' }
    ]
  },
  {
    id: 'remove-spaces',
    name: 'Remove Spaces & Clean Text',
    description: 'Remove double spaces, tabs, and excess line breaks',
    longDescription: 'Clean up text strings by formatting spaces, removing redundant blank lines, deleting trailing whitespace, or collapsing all whitespace into a single space.',
    module: 'text',
    slug: '/text/remove-spaces',
    icon: 'ScissorsIcon',
    tags: ['remove spaces', 'clean whitespace', 'collapse spacing', 'format text spacing'],
    metaTitle: 'Remove Spaces & Clean Text - Trim Whitespace Online | Toolskyt',
    metaDescription:
      'Remove excess spacing, tabs, line breaks and trailing spaces from text blocks online in one click.',
    keywords: ['remove spaces', 'trim whitespace', 'collapse multiple spaces', 'strip spacing from text'],
    relatedTools: ['case-converter', 'word-counter'],
    benefits: [
      'Clean raw text blocks copied from PDFs or formatting sources.',
      'Compress and sanitize strings before pasting into code structures.',
      'Quickly strip tabs or newlines for single-line usage.'
    ],
    features: [
      'Collapse multiple consecutive spaces into a single space.',
      'Strip all newlines, tab chars, or trailing spaces.',
      'Pre-built utility macros for single-click cleanups.'
    ],
    howToSteps: [
      { name: 'Paste Text Input', text: 'Enter the messy text segment with excess spacing.' },
      { name: 'Select Spacing Rule', text: 'Choose either Collapse spaces, Remove newlines, or Strip all spaces.' },
      { name: 'Copy Cleaned Output', text: 'Tap Copy to clipboard.' }
    ],
    faq: [
      { question: 'Can this remove blank lines?', answer: 'Yes! The Collapse Lines mode removes empty paragraphs and consecutive carriage returns.' },
      { question: 'Is there a limit on input length?', answer: 'No. The utility is extremely fast and can handle large text documents easily.' }
    ]
  },
  {
    id: 'read-math-expressions',
    name: 'Read Math Expressions',
    description: 'Convert mathematical equations into English words',
    longDescription: 'Translate equations, arithmetic expressions, and algebra formulas (like 3 + 4 * 2 = 11) into written English words ("three plus four multiplied by two equals eleven").',
    module: 'text',
    slug: '/text/read-math-expressions',
    icon: 'CommandLineIcon',
    tags: ['math to words', 'read equations', 'pronounce math', 'equation generator'],
    metaTitle: 'Read Math Expressions - Math to Words Converter | Toolskyt',
    metaDescription:
      'Convert math formulas and expressions into plain english words online. Read mathematical expressions.',
    keywords: ['read math expressions', 'math equation to words', 'spelled equations', 'math text converter'],
    relatedTools: ['numbers-to-words', 'scientific-calculator'],
    benefits: [
      'Help screen readers and accessibility tools pronounce equations.',
      'Verify written descriptions of algebraic formulas.',
      'Learn standard vocalizations of advanced operators.'
    ],
    features: [
      'Supports basic arithmetic operators (+, -, *, /, =).',
      'Supports brackets, exponent power bases, and negative values.',
      'One-click translation and copy output.'
    ],
    howToSteps: [
      { name: 'Enter Equation', text: 'Type a formula such as "5 * (2 + 3) = 25".' },
      { name: 'Convert to Text', text: 'The expression translates into words automatically.' },
      { name: 'Copy or Speak', text: 'Copy the words text or listen to it.' }
    ],
    faq: [
      { question: 'What operators are supported?', answer: 'Basic operators like addition (+), subtraction (-), multiplication (*), division (/), exponents (^), brackets, and equal signs (=).' },
      { question: 'Does it translate to Chinese?', answer: 'Currently, the mathematical operator descriptions are generated in English.' }
    ]
  },
  {
    id: 'date-converter',
    name: 'Multilingual Date Converter',
    description: 'Convert and format dates across calendars and languages',
    longDescription: 'Convert dates between Gregorian, Hijri (Islamic), and Solar calendars. Formats dates in multiple languages: English, Chinese, Spanish, French, and Arabic.',
    module: 'text',
    slug: '/text/date-converter',
    icon: 'CalendarIcon',
    tags: ['date converter', 'calendar formatting', 'hijri gregorian', 'multilingual dates'],
    metaTitle: 'Multilingual Date Converter - Calendar Formatting | Toolskyt',
    metaDescription:
      'Convert dates between Gregorian, Hijri, and Solar calendars. Spell out date names in multiple languages.',
    keywords: ['date converter', 'hijri to gregorian', 'multilingual dates', 'calendar converter'],
    relatedTools: ['date-difference', 'timezone-converter'],
    benefits: [
      'Quickly calculate corresponding Hijri dates for Gregorian formats.',
      'Generate localized date strings for documents and translation.',
      'Accurate timezone and calendar offsets.'
    ],
    features: [
      'Bi-directional Hijri to Gregorian calculator converter.',
      'Localization options for date spelling in 5+ global languages.',
      'Single-click copy formatted outputs.'
    ],
    howToSteps: [
      { name: 'Select Input Date', text: 'Pick a calendar type and choose a date.' },
      { name: 'Configure Translation', text: 'Choose the destination language and format style.' },
      { name: 'Copy Localized Date', text: 'Collect the translated date string.' }
    ],
    faq: [
      { question: 'How is the Hijri calendar computed?', answer: 'It uses the standard arithmetic Tabular Islamic Calendar algorithm to calculate offsets.' },
      { question: 'Is current time synced?', answer: 'Yes! The default inputs are initialized to your local device date.' }
    ]
  },
  {
    id: 'dictionary',
    name: 'Dictionary & Word Search',
    description: 'Lookup definitions, synonyms, and phonetics online',
    longDescription: 'A complete English dictionary lookup tool. Search definitions, part-of-speech listings, pronunciation phonetics, audio, and example sentences.',
    module: 'text',
    slug: '/text/dictionary',
    icon: 'BookOpenIcon',
    tags: ['dictionary', 'word lookup', 'synonyms', 'phonetic search'],
    metaTitle: 'Dictionary & Word Search - Free Word Lookup Online | Toolskyt',
    metaDescription:
      'Search english word definitions, synonyms, audio pronunciations and examples with the free online dictionary.',
    keywords: ['online dictionary', 'word lookup tool', 'synonyms list', 'define words'],
    relatedTools: ['word-counter', 'case-converter'],
    benefits: [
      'Lookup definitions instantly as you type.',
      'Listen to standard audio phonetic pronunciations.',
      'Expand vocabulary with synonyms and parts of speech.'
    ],
    features: [
      'Real-time definition lookups using public API endpoints.',
      'Audio pronunciation tags for words.',
      'Alternative synonym mappings.'
    ],
    howToSteps: [
      { name: 'Search Word', text: 'Type the english word you wish to define.' },
      { name: 'Browse Listings', text: 'Review the definitions, parts of speech, and usage examples.' },
      { name: 'Listen to Phonetics', text: 'Click the audio icon to hear pronunciation.' }
    ],
    faq: [
      { question: 'Is an active internet connection required?', answer: 'Yes, because definitions are requested in real-time from the public dictionary database.' },
      { question: 'Does it support languages other than English?', answer: 'Currently, the search mappings are optimized for English definitions.' }
    ]
  },

  // ─────────────────────────────────────────────
  // AI WRITING MODULE
  // ─────────────────────────────────────────────
  {
    id: 'prompt-builder',
    name: 'AI Prompt Builder',
    description: 'Build powerful, structured prompts for ChatGPT, Gemini, Claude',
    module: 'ai',
    slug: '/ai/prompt-builder',
    icon: 'SparklesIcon',
    tags: ['prompt', 'chatgpt', 'gemini', 'claude', 'ai', 'prompt engineering'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'AI Prompt Builder - Build Perfect ChatGPT Prompts | Toolskyt',
    metaDescription:
      'Build structured prompts for ChatGPT, Google Gemini, and Claude. Includes role, context, task and output format.',
    keywords: ['ai prompt builder', 'chatgpt prompt', 'prompt engineering', 'prompt generator'],
    relatedTools: ['email-writer', 'blog-outline'],
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    description: 'Generate professional emails with AI-powered templates',
    module: 'ai',
    slug: '/ai/email-writer',
    icon: 'EnvelopeIcon',
    tags: ['email', 'professional email', 'business email', 'email template'],
    isPopular: true,
    metaTitle: 'Email Writer - Generate Professional Emails | Toolskyt',
    metaDescription:
      'Generate professional business emails instantly. Choose tone, purpose and get a ready-to-send email.',
    keywords: [
      'email writer',
      'email generator',
      'professional email template',
      'business email writer',
    ],
    relatedTools: ['prompt-builder', 'cover-letter'],
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Create a professional resume with ATS-friendly templates',
    module: 'ai',
    slug: '/ai/resume-builder',
    icon: 'DocumentIcon',
    tags: ['resume', 'cv', 'ats', 'job application', 'curriculum vitae'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Resume Builder - Create ATS-Friendly Resume Free | Toolskyt',
    metaDescription:
      'Build a professional, ATS-optimized resume instantly. Multiple templates. Download as PDF.',
    keywords: ['resume builder', 'cv builder', 'free resume maker', 'ats resume'],
    relatedTools: ['cover-letter', 'email-writer'],
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Generator',
    description: 'Generate a personalized cover letter for any job application',
    module: 'ai',
    slug: '/ai/cover-letter',
    icon: 'PaperAirplaneIcon',
    tags: ['cover letter', 'job application', 'employment', 'hr'],
    metaTitle: 'Cover Letter Generator - Free Cover Letter Maker | Toolskyt',
    metaDescription:
      'Generate a personalized cover letter for any job. Input job description and get a tailored letter.',
    keywords: ['cover letter generator', 'cover letter maker', 'job application letter'],
    relatedTools: ['resume-builder', 'email-writer'],
  },

  // ─────────────────────────────────────────────
  // PDF MODULE
  // ─────────────────────────────────────────────
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF Converter',
    description: 'Convert HTML and CSS code to a downloadable PDF document',
    module: 'pdf',
    slug: '/pdf/html-to-pdf',
    icon: 'CodeIcon',
    tags: ['pdf', 'html', 'css', 'converter', 'export'],
    metaTitle: 'HTML to PDF Converter - Convert HTML & CSS to PDF | Toolskyt',
    metaDescription:
      'Free online HTML to PDF converter. Paste HTML and CSS to render and export to a clean PDF instantly.',
    keywords: ['html to pdf', 'convert html to pdf', 'html css to pdf', 'code to pdf'],
    relatedTools: ['markdown-to-pdf', 'image-to-pdf'],
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF Converter',
    description: 'Convert JPG, PNG, and WebP images to a single PDF document',
    module: 'pdf',
    slug: '/pdf/image-to-pdf',
    icon: 'PhotoIcon',
    tags: ['pdf', 'image', 'jpg to pdf', 'png to pdf', 'webp to pdf', 'merge'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Image to PDF Converter - Convert JPG, PNG to PDF | Toolskyt',
    metaDescription:
      'Convert your images (JPG, PNG, WebP) to PDF. Combine multiple images into a single clean PDF document online.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'combine images to pdf'],
    relatedTools: ['html-to-pdf', 'markdown-to-pdf'],
  },
  {
    id: 'markdown-to-pdf',
    name: 'Markdown to PDF Converter',
    description: 'Convert Markdown documents into clean, styled PDF reports',
    module: 'pdf',
    slug: '/pdf/markdown-to-pdf',
    icon: 'DocumentTextIcon',
    tags: ['pdf', 'markdown', 'md to pdf', 'export', 'editor'],
    metaTitle: 'Markdown to PDF Converter - Export MD to PDF | Toolskyt',
    metaDescription:
      'Write markdown and download as a formatted PDF report. Standard styling and print layout supported.',
    keywords: ['markdown to pdf', 'export md to pdf', 'md converter', 'pdf report'],
    relatedTools: ['html-to-pdf', 'image-to-pdf'],
  },
  {
    id: 'pdf-metadata',
    name: 'PDF Metadata & Compression',
    description: 'View and edit PDF document metadata properties client-side',
    module: 'pdf',
    slug: '/pdf/pdf-metadata',
    icon: 'DocumentTextIcon',
    tags: ['pdf', 'metadata', 'pdf reader', 'pdf editor', 'compression'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'PDF Metadata Reader & Editor - Edit PDF Properties Online | Toolskyt',
    metaDescription:
      'View and edit PDF properties and metadata like Title, Author, Subject, Keywords completely client-side.',
    keywords: ['pdf metadata', 'edit pdf properties', 'pdf author editor', 'pdf metadata reader'],
    relatedTools: ['html-to-pdf', 'image-to-pdf', 'markdown-to-pdf'],
  },

  // ─────────────────────────────────────────────
  // PRODUCTIVITY MODULE
  // ─────────────────────────────────────────────
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus timer with 25-minute work sessions and break reminders',
    module: 'productivity',
    slug: '/productivity/pomodoro',
    icon: 'ClockIcon',
    tags: ['pomodoro', 'focus', 'timer', 'productivity', 'work sessions'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Pomodoro Timer - Free Focus Timer Online | Toolskyt',
    metaDescription:
      'Free Pomodoro timer. 25-minute focus sessions with short and long break reminders. Track your daily sessions.',
    keywords: ['pomodoro timer', 'focus timer', 'pomodoro technique', 'work timer'],
    relatedTools: ['stopwatch', 'countdown'],
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    description: 'Precise stopwatch with lap times and history',
    module: 'productivity',
    slug: '/productivity/stopwatch',
    icon: 'ClockIcon',
    tags: ['stopwatch', 'timer', 'lap', 'time tracking'],
    metaTitle: 'Stopwatch - Online Stopwatch with Laps | Toolskyt',
    metaDescription:
      'Free online stopwatch with lap timer. Millisecond precision. Export lap times.',
    keywords: ['stopwatch online', 'online stopwatch', 'lap timer', 'stopwatch with laps'],
    relatedTools: ['pomodoro', 'countdown'],
  },
  {
    id: 'countdown',
    name: 'Countdown Timer',
    description: 'Count down to any date or set a custom duration timer',
    module: 'productivity',
    slug: '/productivity/countdown',
    icon: 'ClockIcon',
    tags: ['countdown', 'timer', 'deadline', 'event countdown'],
    metaTitle: 'Countdown Timer - Count Down to Any Date | Toolskyt',
    metaDescription:
      'Free countdown timer. Count down to any future date or set a custom duration. Audio alerts.',
    keywords: ['countdown timer', 'countdown to date', 'event countdown', 'timer online'],
    relatedTools: ['stopwatch', 'pomodoro'],
  },
  {
    id: 'todo',
    name: 'To-Do List',
    description: 'Simple, powerful to-do list with priorities and due dates',
    module: 'productivity',
    slug: '/productivity/todo',
    icon: 'CheckCircleIcon',
    tags: ['todo', 'task manager', 'checklist', 'tasks'],
    isPopular: true,
    metaTitle: 'To-Do List - Free Task Manager Online | Toolskyt',
    metaDescription:
      'Simple, fast to-do list. Set priorities, due dates and tags. Works offline. Data saved locally.',
    keywords: ['todo list', 'task manager online', 'free to do app', 'checklist app'],
    relatedTools: ['kanban', 'habit-tracker'],
  },
  {
    id: 'checklist',
    name: 'Checklist',
    description: 'Create and share reusable checklists for any task',
    module: 'productivity',
    slug: '/productivity/checklist',
    icon: 'ClipboardDocumentCheckIcon',
    tags: ['checklist', 'tasks', 'process', 'sop', 'reusable'],
    metaTitle: 'Checklist - Create Reusable Checklists Online | Toolskyt',
    metaDescription: 'Create reusable checklists for any process. Share via URL. Print-friendly.',
    keywords: ['checklist maker', 'checklist creator', 'online checklist', 'free checklist'],
    relatedTools: ['todo', 'kanban'],
  },
  {
    id: 'notes',
    name: 'Notes',
    description: 'Rich-text notes editor with folders and local storage',
    module: 'productivity',
    slug: '/productivity/notes',
    icon: 'DocumentTextIcon',
    tags: ['notes', 'notepad', 'rich text', 'offline notes'],
    metaTitle: 'Notes - Free Online Notepad with Rich Text | Toolskyt',
    metaDescription:
      'Free online rich text notepad. Organize notes in folders. Auto-saved locally. Works offline.',
    keywords: ['online notepad', 'free notes app', 'rich text notepad', 'browser notes'],
    relatedTools: ['markdown-editor', 'todo'],
  },
  {
    id: 'habit-tracker',
    name: 'Habit Tracker',
    description: 'Track daily habits and build streaks with visual progress',
    module: 'productivity',
    slug: '/productivity/habit-tracker',
    icon: 'FireIcon',
    tags: ['habit', 'tracker', 'streak', 'daily', 'consistency'],
    isFeatured: true,
    metaTitle: 'Habit Tracker - Track Daily Habits & Build Streaks | Toolskyt',
    metaDescription:
      'Free habit tracker. Track daily habits, build streaks and visualize progress with heatmaps.',
    keywords: ['habit tracker', 'daily habit tracker', 'streak tracker', 'habit builder'],
    relatedTools: ['todo', 'checklist'],
  },

  // ─────────────────────────────────────────────
  // EDUCATION MODULE
  // ─────────────────────────────────────────────
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    description: 'Full scientific calculator with trig, log, power functions',
    module: 'education',
    slug: '/education/scientific-calculator',
    icon: 'CalculatorIcon',
    tags: ['scientific calculator', 'math', 'trigonometry', 'logarithm'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Scientific Calculator - Online Scientific Calculator | Toolskyt',
    metaDescription:
      'Free scientific calculator online. Trigonometry, logarithms, exponents, factorials and more.',
    keywords: [
      'scientific calculator',
      'online calculator',
      'math calculator',
      'calculator online',
    ],
    relatedTools: ['percentage-calculator', 'age-calculator'],
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, days from date of birth',
    module: 'education',
    slug: '/education/age-calculator',
    icon: 'CakeIcon',
    tags: ['age', 'birthday', 'date of birth', 'dob', 'years old'],
    isPopular: true,
    metaTitle: 'Age Calculator - Calculate Exact Age from Date of Birth | Toolskyt',
    metaDescription:
      'Calculate your exact age in years, months, and days. Find the day of the week you were born.',
    keywords: ['age calculator', 'how old am i', 'age from date of birth', 'age finder'],
    relatedTools: ['date-difference', 'scientific-calculator'],
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentage, percentage change, and percentage of total',
    module: 'education',
    slug: '/education/percentage-calculator',
    icon: 'CalculatorIcon',
    tags: ['percentage', 'percent', 'calculation', 'discount', 'increase', 'decrease'],
    isPopular: true,
    metaTitle: 'Percentage Calculator - Calculate Percentages Online | Toolskyt',
    metaDescription:
      'Calculate percentages easily. Find X% of Y, percentage change, what percent is X of Y, and more.',
    keywords: [
      'percentage calculator',
      'percent calculator',
      'calculate percentage',
      'percentage change',
    ],
    relatedTools: ['scientific-calculator', 'discount-calculator'],
  },
  {
    id: 'cgpa-calculator',
    name: 'CGPA Calculator',
    description: 'Calculate CGPA and percentage for Indian university system',
    module: 'education',
    slug: '/education/cgpa-calculator',
    icon: 'AcademicCapIcon',
    tags: ['cgpa', 'cumulative gpa', 'grade point average', 'marks'],
    isPopular: true,
    metaTitle: 'CGPA Calculator - Calculate CGPA and Percentage | Toolskyt',
    metaDescription:
      'Calculate CGPA and convert to percentage. Works for VTU, Anna University, Mumbai University and more.',
    keywords: ['cgpa calculator', 'cgpa to percentage', 'cumulative gpa', 'grade calculator'],
    relatedTools: ['gpa-calculator', 'percentage-calculator'],
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Calculate semester GPA with letter grades and credit hours',
    module: 'education',
    slug: '/education/gpa-calculator',
    icon: 'AcademicCapIcon',
    tags: ['gpa', 'grade point average', 'semester gpa', 'grades'],
    metaTitle: 'GPA Calculator - Calculate Semester GPA Online | Toolskyt',
    metaDescription:
      'Calculate semester GPA using credit hours and letter grades. Support for 4.0 and 10.0 scales.',
    keywords: ['gpa calculator', 'grade point average calculator', 'semester gpa'],
    relatedTools: ['cgpa-calculator', 'percentage-calculator'],
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between 100+ units of length, weight, temperature and more',
    module: 'education',
    slug: '/education/unit-converter',
    icon: 'ArrowsRightLeftIcon',
    tags: ['unit converter', 'length', 'weight', 'temperature', 'metric', 'imperial'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Unit Converter - Convert All Units Online | Toolskyt',
    metaDescription:
      'Free unit converter. Convert length, weight, temperature, speed, volume and 100+ more units.',
    keywords: ['unit converter', 'unit conversion', 'metric converter', 'measurement converter'],
    relatedTools: ['length-converter', 'weight-converter', 'temperature-converter'],
  },

  // ─────────────────────────────────────────────
  // HEALTH MODULE
  // ─────────────────────────────────────────────
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index with healthy weight range',
    module: 'health',
    slug: '/health/bmi-calculator',
    icon: 'HeartIcon',
    tags: ['bmi', 'body mass index', 'weight', 'health', 'obesity'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'BMI Calculator - Calculate Body Mass Index | Toolskyt',
    metaDescription:
      'Calculate your BMI (Body Mass Index). Find if you are underweight, normal, overweight or obese.',
    keywords: ['bmi calculator', 'body mass index', 'bmi calculator online', 'healthy weight'],
    relatedTools: ['bmr-calculator', 'calorie-calculator', 'ideal-weight'],
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Calculate Basal Metabolic Rate and daily calorie needs',
    module: 'health',
    slug: '/health/bmr-calculator',
    icon: 'FireIcon',
    tags: ['bmr', 'basal metabolic rate', 'calories', 'metabolism'],
    metaTitle: 'BMR Calculator - Calculate Basal Metabolic Rate | Toolskyt',
    metaDescription:
      'Calculate your Basal Metabolic Rate (BMR) and daily calorie needs based on activity level.',
    keywords: ['bmr calculator', 'basal metabolic rate', 'calorie calculator', 'tdee calculator'],
    relatedTools: ['bmi-calculator', 'calorie-calculator'],
  },
  {
    id: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate daily calorie needs for weight loss, gain or maintenance',
    module: 'health',
    slug: '/health/calorie-calculator',
    icon: 'ChartBarIcon',
    tags: ['calories', 'calorie deficit', 'weight loss', 'diet', 'tdee'],
    isPopular: true,
    metaTitle: 'Calorie Calculator - Daily Calorie Needs Calculator | Toolskyt',
    metaDescription:
      'Calculate daily calorie needs for your weight goal. Customized for weight loss, maintenance or muscle gain.',
    keywords: ['calorie calculator', 'daily calorie needs', 'calorie deficit', 'calorie intake'],
    relatedTools: ['bmr-calculator', 'bmi-calculator'],
  },

  // ─────────────────────────────────────────────
  // UTILITIES MODULE
  // ─────────────────────────────────────────────
  {
    id: 'random-number',
    name: 'Random Number Generator',
    description: 'Generate random numbers with custom range and quantity',
    module: 'utilities',
    slug: '/utilities/random-number',
    icon: 'HashtagIcon',
    tags: ['random number', 'random', 'dice', 'lucky number'],
    metaTitle: 'Random Number Generator - Generate Random Numbers | Toolskyt',
    metaDescription:
      'Generate random numbers within any range. Set min/max values. Generate multiple numbers at once.',
    keywords: ['random number generator', 'random number', 'generate random numbers'],
    relatedTools: ['dice-roller', 'coin-flip'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, HSV, CMYK',
    module: 'utilities',
    slug: '/utilities/color-converter',
    icon: 'SwatchIcon',
    tags: ['color', 'hex', 'rgb', 'hsl', 'cmyk', 'css color'],
    isPopular: true,
    metaTitle: 'Color Converter - Convert HEX RGB HSL CMYK | Toolskyt',
    metaDescription:
      'Convert colors between HEX, RGB, HSL, HSV and CMYK formats. Visual color picker included.',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl to hex', 'color code converter'],
    relatedTools: ['color-picker', 'gradient-generator'],
  },
  {
    id: 'date-difference',
    name: 'Date Difference Calculator',
    description: 'Calculate days, months and years between two dates',
    module: 'utilities',
    slug: '/utilities/date-difference',
    icon: 'CalendarIcon',
    tags: ['date difference', 'days between dates', 'date calculator', 'duration'],
    isPopular: true,
    metaTitle: 'Date Difference Calculator - Days Between Dates | Toolskyt',
    metaDescription:
      'Calculate the difference between two dates in days, weeks, months and years. Find working days.',
    keywords: [
      'date difference calculator',
      'days between dates',
      'date calculator',
      'how many days',
    ],
    relatedTools: ['age-calculator', 'countdown'],
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discounted price, savings and percentage off',
    module: 'utilities',
    slug: '/utilities/discount-calculator',
    icon: 'TagIcon',
    tags: ['discount', 'sale price', 'percentage off', 'savings'],
    isPopular: true,
    metaTitle: 'Discount Calculator - Calculate Sale Price & Savings | Toolskyt',
    metaDescription:
      'Calculate discounted price instantly. Find sale price from original price and discount percentage.',
    keywords: [
      'discount calculator',
      'sale price calculator',
      'percentage off calculator',
      'savings calculator',
    ],
    relatedTools: ['percentage-calculator', 'gst-calculator'],
  },

  // ─────────────────────────────────────────────
  // CONVERSION MODULE
  // ─────────────────────────────────────────────
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between meters, feet, inches, miles, km and all length units',
    module: 'conversion',
    slug: '/convert/length',
    icon: 'ArrowsRightLeftIcon',
    tags: ['length', 'meter', 'feet', 'inch', 'mile', 'km', 'convert'],
    isPopular: true,
    metaTitle: 'Length Converter - Convert Meters Feet Inches Miles | Toolskyt',
    metaDescription:
      'Convert length units: meters, feet, inches, miles, kilometers, centimeters, yards and more.',
    keywords: ['length converter', 'meter to feet', 'feet to meter', 'inches to cm', 'km to miles'],
    relatedTools: ['weight-converter', 'temperature-converter'],
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between kg, pounds, grams, ounces, tons',
    module: 'conversion',
    slug: '/convert/weight',
    icon: 'ScaleIcon',
    tags: ['weight', 'kg', 'pounds', 'grams', 'ounces', 'convert'],
    isPopular: true,
    metaTitle: 'Weight Converter - Convert kg Pounds Grams Ounces | Toolskyt',
    metaDescription: 'Convert weight units: kilograms, pounds, grams, ounces, stone, metric tons.',
    keywords: ['weight converter', 'kg to pounds', 'pounds to kg', 'grams to ounces'],
    relatedTools: ['length-converter', 'temperature-converter'],
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    module: 'conversion',
    slug: '/convert/temperature',
    icon: 'BeakerIcon',
    tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'convert'],
    isPopular: true,
    metaTitle: 'Temperature Converter - Celsius Fahrenheit Kelvin | Toolskyt',
    metaDescription: 'Convert temperatures between Celsius, Fahrenheit and Kelvin instantly.',
    keywords: [
      'temperature converter',
      'celsius to fahrenheit',
      'fahrenheit to celsius',
      'kelvin converter',
    ],
    relatedTools: ['length-converter', 'weight-converter'],
  },
  {
    id: 'data-storage-converter',
    name: 'Data Storage Converter',
    description: 'Convert between bytes, KB, MB, GB, TB',
    module: 'conversion',
    slug: '/convert/data-storage',
    icon: 'ServerIcon',
    tags: ['bytes', 'kb', 'mb', 'gb', 'tb', 'data storage', 'convert'],
    metaTitle: 'Data Storage Converter - Bytes KB MB GB TB | Toolskyt',
    metaDescription:
      'Convert data storage units: bytes, kilobytes, megabytes, gigabytes, terabytes.',
    keywords: ['data storage converter', 'bytes to mb', 'gb to tb', 'mb to gb'],
    relatedTools: ['length-converter'],
  },

  // ─────────────────────────────────────────────
  // TRAVEL MODULE
  // ─────────────────────────────────────────────
  {
    id: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between world time zones instantly',
    module: 'travel',
    slug: '/travel/timezone-converter',
    icon: 'GlobeAltIcon',
    tags: ['timezone', 'time zone', 'world time', 'utc', 'ist', 'est'],
    isPopular: true,
    metaTitle: 'Time Zone Converter - World Time Zone Tool | Toolskyt',
    metaDescription:
      'Convert time between any two time zones. View current time in all major cities worldwide.',
    keywords: ['timezone converter', 'time zone converter', 'world clock', 'time zone tool'],
    relatedTools: ['fuel-cost', 'currency-converter'],
  },
  {
    id: 'fuel-cost',
    name: 'Fuel Cost Calculator',
    description: 'Calculate fuel cost for road trips based on distance and mileage',
    module: 'travel',
    slug: '/travel/fuel-cost',
    icon: 'TruckIcon',
    tags: ['fuel cost', 'petrol cost', 'road trip', 'mileage', 'travel cost'],
    metaTitle: 'Fuel Cost Calculator - Calculate Road Trip Fuel Cost | Toolskyt',
    metaDescription:
      'Calculate fuel cost for your road trip. Enter distance, fuel efficiency and petrol/diesel price.',
    keywords: [
      'fuel cost calculator',
      'petrol cost calculator',
      'road trip cost',
      'fuel calculator',
    ],
    relatedTools: ['timezone-converter'],
  },

  // ─────────────────────────────────────────────
  // BUSINESS MODULE
  // ─────────────────────────────────────────────
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create professional invoices and download as PDF',
    module: 'business',
    slug: '/business/invoice-generator',
    icon: 'DocumentTextIcon',
    tags: ['invoice', 'billing', 'pdf invoice', 'freelancer', 'client'],
    isPopular: true,
    isFeatured: true,
    metaTitle: 'Invoice Generator - Create Professional Invoices Free | Toolskyt',
    metaDescription:
      'Create professional invoices and download as PDF. Free, no signup required. Custom branding.',
    keywords: ['invoice generator', 'free invoice maker', 'invoice creator', 'pdf invoice'],
    relatedTools: ['gst-invoice', 'quotation-generator'],
  },
  {
    id: 'gst-invoice',
    name: 'GST Invoice Generator',
    description: 'Create GST-compliant invoices with CGST, SGST, IGST calculation',
    module: 'business',
    slug: '/business/gst-invoice',
    icon: 'ReceiptRefundIcon',
    tags: ['gst invoice', 'tax invoice', 'cgst', 'sgst', 'igst'],
    isPopular: true,
    metaTitle: 'GST Invoice Generator - Create GST Bill Online | Toolskyt',
    metaDescription:
      'Create GST-compliant invoices with automatic CGST, SGST, IGST calculation. Download as PDF.',
    keywords: ['gst invoice generator', 'gst bill generator', 'tax invoice', 'gst invoice format'],
    relatedTools: ['invoice-generator', 'gst-calculator'],
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate Return on Investment and payback period',
    module: 'business',
    slug: '/business/roi-calculator',
    icon: 'ArrowTrendingUpIcon',
    tags: ['roi', 'return on investment', 'profit', 'payback', 'business'],
    metaTitle: 'ROI Calculator - Calculate Return on Investment | Toolskyt',
    metaDescription:
      'Calculate ROI (Return on Investment), net profit and payback period for any investment.',
    keywords: [
      'roi calculator',
      'return on investment calculator',
      'investment roi',
      'payback period',
    ],
    relatedTools: ['profit-margin', 'break-even'],
  },
  {
    id: 'profit-margin',
    name: 'Profit Margin Calculator',
    description: 'Calculate gross, net and operating profit margins',
    module: 'business',
    slug: '/business/profit-margin',
    icon: 'ChartBarIcon',
    tags: ['profit margin', 'gross margin', 'markup', 'cost price', 'selling price'],
    metaTitle: 'Profit Margin Calculator - Calculate Gross & Net Margin | Toolskyt',
    metaDescription:
      'Calculate gross profit margin, net margin and markup percentage. Find selling price from cost and margin.',
    keywords: ['profit margin calculator', 'gross margin calculator', 'markup calculator'],
    relatedTools: ['roi-calculator', 'break-even'],
  },
  {
    id: 'break-even',
    name: 'Break-Even Calculator',
    description: 'Calculate break-even point in units and revenue',
    module: 'business',
    slug: '/business/break-even',
    icon: 'PresentationChartLineIcon',
    tags: ['break even', 'fixed costs', 'variable costs', 'contribution margin'],
    metaTitle: 'Break-Even Calculator - Find Break-Even Point | Toolskyt',
    metaDescription:
      'Calculate break-even point in units and revenue. Understand fixed and variable cost impact.',
    keywords: ['break even calculator', 'break-even analysis', 'break even point'],
    relatedTools: ['roi-calculator', 'profit-margin'],
  },
  {
    id: 'quotation-generator',
    name: 'Quotation Generator',
    description: 'Create professional price quotations for clients',
    module: 'business',
    slug: '/business/quotation-generator',
    icon: 'ClipboardDocumentListIcon',
    tags: ['quotation', 'price quote', 'estimate', 'proposal'],
    metaTitle: 'Quotation Generator - Create Price Quotes Online | Toolskyt',
    metaDescription:
      'Create professional price quotations for clients. Download as PDF. Free, no signup.',
    keywords: [
      'quotation generator',
      'quote generator',
      'price quotation maker',
      'estimate generator',
    ],
    relatedTools: ['invoice-generator', 'gst-invoice'],
  },
];

// ─────────────────────────────────────────────
// Tool Lookup Maps
// ─────────────────────────────────────────────

export const TOOL_BY_ID: Record<string, ToolConfig> = TOOLS.reduce(
  (acc, tool) => {
    acc[tool.id] = tool;
    return acc;
  },
  {} as Record<string, ToolConfig>
);

export const TOOL_BY_SLUG: Record<string, ToolConfig> = TOOLS.reduce(
  (acc, tool) => {
    acc[tool.slug] = tool;
    return acc;
  },
  {} as Record<string, ToolConfig>
);

export const TOOLS_BY_MODULE: Record<string, ToolConfig[]> = TOOLS.reduce(
  (acc, tool) => {
    if (!acc[tool.module]) acc[tool.module] = [];
    acc[tool.module].push(tool);
    return acc;
  },
  {} as Record<string, ToolConfig[]>
);

export const FEATURED_TOOLS = TOOLS.filter((t) => t.isFeatured);
export const POPULAR_TOOLS = TOOLS.filter((t) => t.isPopular);
export const NEW_TOOLS = TOOLS.filter((t) => t.isNew);

// ─────────────────────────────────────────────
// Implemented-tool Registry (single source of truth for "is this live?")
//
// The catalog above lists more tools than are actually built. This set is the
// allowlist of tools that have a real, working page. Anything in the catalog
// but NOT in this set is treated as "coming soon": it renders the shared
// <ComingSoon /> placeholder and is excluded from the indexed, advertised count.
//
// When you ship a tool, add its id here (and its route in App.tsx).
// ─────────────────────────────────────────────
export const IMPLEMENTED_TOOL_IDS = new Set<string>([
  // FINANCE
  'emi-calculator',
  'home-loan-calculator',
  'car-loan-calculator',
  'personal-loan-calculator',
  'education-loan-calculator',
  'loan-eligibility-calculator',
  'sip-calculator',
  'fd-calculator',
  'rd-calculator',
  'ppf-calculator',
  'epf-calculator',
  'retirement-calculator',
  'gst-calculator',
  'income-tax-calculator',
  'salary-calculator',
  'hra-calculator',
  'compound-interest-calculator',
  'simple-interest-calculator',
  'currency-converter',
  'inflation-calculator',
  'budget-planner',
  'gratuity-calculator',
  'stock-average-calculator',
  'brokerage-calculator',
  'tip-calculator',
  'bill-splitter',
  'expense-tracker',
  'savings-planner',
  'net-worth-calculator',
  'gold-investment-calculator',
  'crypto-profit-calculator',
  'subscription-tracker',
  'credit-card-emi',
  'mutual-fund-calculator',
  'loan-comparison',
  // DEVELOPER
  'json-formatter',
  'base64',
  'url-encoder',
  'jwt-decoder',
  'uuid-generator',
  'hash-generator',
  'regex-tester',
  'timestamp-converter',
  'alternative-timestamps',
  'color-picker',
  'sql-formatter',
  'diff-checker',
  'password-generator',
  'lorem-ipsum',
  'gradient-generator',
  'cron-builder',
  'markdown-preview',
  // IMAGE
  'image-resize',
  'image-compress',
  'image-crop',
  'qr-generator',
  'barcode-generator',
  'jpg-converter',
  'webp-converter',
  'color-palette',
  'favicon-generator',
  // TEXT
  'word-counter',
  'case-converter',
  'slug-generator',
  'text-diff',
  'markdown-editor',
  // AI
  'prompt-builder',
  'email-writer',
  'resume-builder',
  'cover-letter',
  // PDF
  'html-to-pdf',
  'image-to-pdf',
  'markdown-to-pdf',
  // PRODUCTIVITY
  'stopwatch',
  'countdown',
  'checklist',
  'notes',
  'habit-tracker',
  // EDUCATION
  'scientific-calculator',
  'age-calculator',
  'percentage-calculator',
  'cgpa-calculator',
  'gpa-calculator',
  'unit-converter',
  // HEALTH
  'bmi-calculator',
  'bmr-calculator',
  'calorie-calculator',
  // UTILITIES
  'random-number',
  'color-converter',
  'date-difference',
  'discount-calculator',
  // CONVERSION
  'length-converter',
  'weight-converter',
  'temperature-converter',
  'data-storage-converter',
  // TRAVEL
  'timezone-converter',
  'fuel-cost',
  // BUSINESS
  'invoice-generator',
  'gst-invoice',
  'roi-calculator',
  'profit-margin',
  'break-even',
  'quotation-generator',
]);

/** True when a catalog tool has no working implementation yet. */
export const isComingSoon = (toolId: string): boolean => !IMPLEMENTED_TOOL_IDS.has(toolId);

// Total number of tools registered in the catalog (incl. placeholders).
export const TOTAL_TOOL_COUNT = TOOLS.length;

// Number of fully implemented, usable tools — the honest, self-updating count.
export const LIVE_TOOL_COUNT = TOOLS.filter((t) => IMPLEMENTED_TOOL_IDS.has(t.id)).length;

// Human-friendly label for marketing copy — rounds down to the nearest 10
// so it reads cleanly ("50+") and never over-promises.
export const TOOL_COUNT_LABEL = `${Math.floor(LIVE_TOOL_COUNT / 10) * 10}+`;
