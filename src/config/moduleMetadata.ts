export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolCategory {
  title: string;
  toolIds: string[];
}

export interface ModuleMetadata {
  popularSearches: string[];
  whyUse: Benefit[];
  faqs: FAQ[];
  relatedModules: string[];
  featuredTools: string[];
  categories?: ToolCategory[];
}

export const MODULE_METADATA: Record<string, ModuleMetadata> = {
  finance: {
    popularSearches: ['EMI Calculator', 'SIP Calculator', 'GST Calculator', 'Income Tax Calculator'],
    whyUse: [
      {
        title: 'Accurate Calculations',
        description: 'Engineered using precise mathematical models to guarantee correct financial planning metrics.',
        icon: 'Scale',
      },
      {
        title: '100% Secure & Private',
        description: 'Your salary, loans, and assets are processed locally in your browser. Zero data is ever sent to servers.',
        icon: 'Shield',
      },
      {
        title: 'Amortization & Growth Charts',
        description: 'Visualize your loan schedules and wealth compound trajectories with rich interactive graphics.',
        icon: 'TrendingUp',
      },
    ],
    faqs: [
      {
        question: 'Are my financial calculations saved or tracked?',
        answer: 'No, all calculations are performed entirely client-side using JavaScript in your browser cache. We do not store, track, or share any of your inputs, variables, or results.',
      },
      {
        question: 'Can I export the amortization schedule?',
        answer: 'Yes, our EMI and loan calculators feature export options that allow you to download complete monthly and yearly repayment schedules in CSV formats.',
      },
      {
        question: 'How do you calculate compound interest?',
        answer: 'We use the standard compound interest formula A = P(1 + r/n)^(nt) where compounding intervals can be customized to daily, monthly, quarterly, or yearly.',
      },
    ],
    relatedModules: ['business', 'developer', 'productivity', 'utilities'],
    featuredTools: ['emi-calculator', 'sip-calculator', 'gst-calculator'],
    categories: [
      {
        title: 'Loans & EMI Calculators',
        toolIds: [
          'emi-calculator',
          'home-loan-calculator',
          'car-loan-calculator',
          'personal-loan-calculator',
          'loan-eligibility-calculator',
          'loan-comparison',
          'credit-card-emi',
        ],
      },
      {
        title: 'Investment & Growth Planners',
        toolIds: [
          'sip-calculator',
          'fd-calculator',
          'rd-calculator',
          'ppf-calculator',
          'retirement-calculator',
          'mutual-fund-calculator',
          'compound-interest-calculator',
          'simple-interest-calculator',
          'stock-average-calculator',
          'savings-planner',
          'gold-investment-calculator',
          'crypto-profit-calculator',
        ],
      },
      {
        title: 'Tax & Salary Calculators',
        toolIds: [
          'gst-calculator',
          'income-tax-calculator',
          'salary-calculator',
          'hra-calculator',
          'gratuity-calculator',
          'brokerage-calculator',
        ],
      },
      {
        title: 'General Financial Utilities',
        toolIds: [
          'currency-converter',
          'tip-calculator',
          'bill-splitter',
          'expense-tracker',
          'inflation-calculator',
          'net-worth-calculator',
          'subscription-tracker',
        ],
      },
    ],
  },
  developer: {
    popularSearches: ['JSON Formatter', 'Base64 Encoder', 'JWT Decoder', 'UUID Generator'],
    whyUse: [
      {
        title: 'Instant Local Formatting',
        description: 'Parse, validate, and pretty-print raw JSON, SQL, or XML configurations instantly without lag.',
        icon: 'Zap',
      },
      {
        title: 'Secured Cryptography',
        description: 'Generate hashes (MD5, SHA-256) and cryptographically secure passwords completely offline.',
        icon: 'Lock',
      },
      {
        title: 'Zero Leak Guarantee',
        description: 'Never paste sensitive configuration strings, JWT tokens, or credentials into public APIs. Everything runs locally.',
        icon: 'Shield',
      },
    ],
    faqs: [
      {
        question: 'Is it safe to paste JWT tokens or API configs here?',
        answer: 'Yes. Unlike online tools that send payload data to backend servers, Toolskyt parses and formats all tokens and files inside your browser. No data ever leaves your device.',
      },
      {
        question: 'Does the JSON Formatter validate syntax errors?',
        answer: 'Yes, our JSON formatter highlights exact syntax errors, missing commas, or unmatched brackets in real-time, helping you debug raw configurations.',
      },
      {
        question: 'Can I use these tools without an internet connection?',
        answer: 'Yes, once loaded, all developer utilities operate fully offline. You can test regex, decode Base64, and generate passwords anywhere.',
      },
    ],
    relatedModules: ['utilities', 'text', 'conversion', 'ai'],
    featuredTools: ['json-formatter', 'base64', 'jwt-decoder'],
    categories: [
      {
        title: 'Code Formatters & Beautifiers',
        toolIds: ['json-formatter', 'sql-formatter', 'xml-formatter', 'yaml-formatter'],
      },
      {
        title: 'Encoders, Decoders & Parsers',
        toolIds: ['base64', 'url-encoder', 'html-entities', 'hex-encoder'],
      },
      {
        title: 'Cryptography & Security Utilities',
        toolIds: [
          'hash-generator',
          'password-generator',
          'uuid-generator',
          'jwt-decoder',
          'regex-tester',
        ],
      },
      {
        title: 'General Developer Utilities',
        toolIds: [
          'timestamp-converter',
          'alternative-timestamps',
          'color-picker',
          'diff-checker',
          'lorem-ipsum',
          'gradient-generator',
          'cron-builder',
          'markdown-preview',
        ],
      },
    ],
  },
  pdf: {
    popularSearches: ['HTML to PDF', 'Image to PDF', 'Markdown to PDF', 'PDF Metadata'],
    whyUse: [
      {
        title: 'Client-Side Rendering',
        description: 'Convert templates, markdown, and assets into print-ready PDF formats entirely in your browser.',
        icon: 'Cpu',
      },
      {
        title: 'Preserves File Integrity',
        description: 'Ensures formatting, layouts, fonts, and inline styles are perfectly embedded without quality loss.',
        icon: 'FileText',
      },
      {
        title: 'Private & Leak-Free',
        description: 'Your documents, CVs, and designs are never uploaded to foreign cloud servers. Completely private.',
        icon: 'Lock',
      },
    ],
    faqs: [
      {
        question: 'How does HTML to PDF converter work?',
        answer: 'It uses clean browser-native print layouts and CSS styles to compile code markup into document vectors, downloading the output directly from your browser memory.',
      },
      {
        question: 'Is there a file size limit for converting images or code?',
        answer: 'Since the compilation happens using your device hardware, there are no artificial limits. It handles large tables and high-resolution images smoothly.',
      },
      {
        question: 'Are my converted documents safe?',
        answer: 'Absolutely. We do not run document processing APIs on remote servers. All file readings and PDF creations happen local-only.',
      },
    ],
    relatedModules: ['image', 'text', 'business', 'productivity'],
    featuredTools: ['html-to-pdf', 'image-to-pdf', 'markdown-to-pdf', 'pdf-metadata'],
  },
  image: {
    popularSearches: ['Image Resizer', 'Image Compressor', 'QR Generator', 'Image Cropper'],
    whyUse: [
      {
        title: 'Fast Browser Compression',
        description: 'Compress PNG/JPG image assets inside your browser cache with high-fidelity outputs.',
        icon: 'Zap',
      },
      {
        title: 'Secure Client-Side Editing',
        description: 'Crop, rotate, and generate QR or barcodes with zero telemetry or remote server telemetry.',
        icon: 'Shield',
      },
      {
        title: 'Format Conversions',
        description: 'Convert images to WEBP, PNG, or JPG formats seamlessly using modern canvas rendering APIs.',
        icon: 'RefreshCw',
      },
    ],
    faqs: [
      {
        question: 'Does compressing my images lower their visual quality?',
        answer: 'Our compressor lets you preview and adjust quality sliders in real-time, balancing file savings against visual clarity using smart canvas compression.',
      },
      {
        question: 'Where are my uploaded images stored?',
        answer: 'Nowhere. The images you upload are loaded directly as memory buffers (Blob URLs) in your browser window. They are never transmitted or stored on any server.',
      },
      {
        question: 'Can I generate vector-grade QR codes?',
        answer: 'Yes, our QR Generator compiles crisp vector matrices that remain sharp at any display resolution or print format.',
      },
    ],
    relatedModules: ['pdf', 'text', 'utilities', 'ai'],
    featuredTools: ['image-resizer', 'image-compressor', 'qr-generator'],
  },
  text: {
    popularSearches: ['Word Counter', 'Case Converter', 'Text Diff', 'Markdown Editor'],
    whyUse: [
      {
        title: 'Real-Time Word Metrics',
        description: 'Instantly count words, characters, sentences, paragraphs, and reading times as you type.',
        icon: 'TrendingUp',
      },
      {
        title: 'Visual Diff Highlighting',
        description: 'Compare two text blocks side-by-side to review insertions, edits, and deletions instantly.',
        icon: 'Code',
      },
      {
        title: 'Safe Text Operations',
        description: 'Perform word capitalization, markdown edits, and slug creations entirely offline with zero leaks.',
        icon: 'Shield',
      },
    ],
    faqs: [
      {
        question: 'Can the text editor autosave my documents?',
        answer: 'Yes, our Markdown Editor implements local browser storage (localStorage) to ensure your writing persists even if you accidentally close the tab.',
      },
      {
        question: 'How does the Diff Checker evaluate differences?',
        answer: 'It executes the standard LCS (Longest Common Subsequence) diff algorithm locally, highlighting exact word-level and line-level changes instantly.',
      },
      {
        question: 'Are my typed contents private?',
        answer: 'Yes, all text tools execute client-side. We have no backend databases or telemetry scripts monitoring what you draft.',
      },
    ],
    relatedModules: ['developer', 'ai', 'pdf', 'productivity'],
    featuredTools: ['word-counter', 'case-converter', 'text-diff'],
  },
  ai: {
    popularSearches: ['Prompt Builder', 'Email Writer', 'Resume Builder', 'Cover Letter Creator'],
    whyUse: [
      {
        title: 'Private Prompt Engineering',
        description: 'Generate high-quality prompts and draft articles locally before feeding them to AI networks.',
        icon: 'Sparkles',
      },
      {
        title: 'Professional Structures',
        description: 'Use pre-designed, highly optimized copywriting models to frame emails, resumes, and letters.',
        icon: 'Award',
      },
      {
        title: 'Offline Draft Management',
        description: 'Organize, test, and save drafts entirely inside your browser cache without account sign-ups.',
        icon: 'Lock',
      },
    ],
    faqs: [
      {
        question: 'Do these tools connect to OpenAI or Claude APIs directly?',
        answer: 'No, these tools are smart templating and layout compilers that run entirely offline. They structure your inputs into optimized prompts and files that you can copy/paste safely.',
      },
      {
        question: 'Are my drafted resumes and emails secure?',
        answer: 'Yes, because we do not host a cloud database. Your inputs are compiled in memory and downloaded as text or PDF directly to your device.',
      },
      {
        question: 'Will you support browser-native LLMs?',
        answer: 'Yes, we are developing WebGPU integrations to run local models (like Llama 3) inside your browser memory in future updates.',
      },
    ],
    relatedModules: ['text', 'developer', 'business', 'productivity'],
    featuredTools: ['prompt-builder', 'email-writer', 'resume-builder'],
  },
  business: {
    popularSearches: ['Invoice Generator', 'ROI Calculator', 'GST Invoice Builder', 'Profit Margin Calculator'],
    whyUse: [
      {
        title: 'Client Billing Made Easy',
        description: 'Generate professional, clean invoice designs with customizable taxes, items, and terms.',
        icon: 'Briefcase',
      },
      {
        title: 'Direct Metric Projections',
        description: 'Determine break-even thresholds, return on investments, and profit margins with simple controls.',
        icon: 'TrendingUp',
      },
      {
        title: 'Secure Financial Reporting',
        description: 'Draft financial contracts and calculations locally without uploading business details to cloud entities.',
        icon: 'Shield',
      },
    ],
    faqs: [
      {
        question: 'Can I add my business logo to the invoices?',
        answer: 'Yes, our Invoice Generator lets you upload logo files locally, rendering them into a sleek layout before downloading the final PDF.',
      },
      {
        question: 'How secure are the ROI and profit margin tools?',
        answer: 'Highly secure. Since they use pure browser math, your profit numbers, operational expenses, and revenues remain strictly private to you.',
      },
      {
        question: 'Are there templates for client quotations?',
        answer: 'Yes, the Quotation Generator lets you build, layout, and save standard client quotations instantly in your browser.',
      },
    ],
    relatedModules: ['finance', 'pdf', 'productivity', 'utilities'],
    featuredTools: ['invoice-generator', 'roi-calculator', 'gst-invoice'],
  },
  productivity: {
    popularSearches: ['Pomodoro Timer', 'Todo List', 'Habit Tracker', 'Notes App'],
    whyUse: [
      {
        title: 'Clean Focus Workspaces',
        description: 'Distraction-free timers, lists, and boards that keep you focused on executing daily goals.',
        icon: 'Clock',
      },
      {
        title: 'Persistent Offline Sync',
        description: 'All tasks, habits, and session logs are saved locally in your browser storage so they survive refreshes.',
        icon: 'Lock',
      },
      {
        title: 'Ad-Free Interface',
        description: 'No accounts, paywalls, or banners in your focus space. Just pure utility optimized for speed.',
        icon: 'Smile',
      },
    ],
    faqs: [
      {
        question: 'Do my checklists and note data persist?',
        answer: 'Yes, we use the browser local storage API to auto-save checklists, Pomodoro sessions, and notes so they persist when you reopen Toolskyt.',
      },
      {
        question: 'Can I customize the timer intervals?',
        answer: 'Yes, the Pomodoro Timer allows you to customize focus periods, short breaks, and long breaks to fit your personal workflow style.',
      },
      {
        question: 'Can I run multiple countdowns?',
        answer: 'Yes, our countdown utilities support setting up multiple timers concurrently for scheduling your tasks.',
      },
    ],
    relatedModules: ['utilities', 'text', 'business', 'education'],
    featuredTools: ['pomodoro-timer', 'todo-list', 'habit-tracker'],
  },
  education: {
    popularSearches: ['Scientific Calculator', 'Age Calculator', 'GPA Calculator', 'Percentage Calculator'],
    whyUse: [
      {
        title: 'Advanced Scientific Math',
        description: 'Compute trigonometry, algebra, logarithms, and scientific constants with instant updates.',
        icon: 'Calculator',
      },
      {
        title: 'Academic Grade Planners',
        description: 'Calculate semester GPAs, cumulative CGPAs, and percentages with custom course weightings.',
        icon: 'Award',
      },
      {
        title: 'Instant Metric Converters',
        description: 'Convert lengths, weights, memory bits, and temperatures on the fly with real-time displays.',
        icon: 'Scale',
      },
    ],
    faqs: [
      {
        question: 'Does the GPA calculator support custom grading systems?',
        answer: 'Yes, you can edit credit weights and letter grades manually to align with your school or university grading systems.',
      },
      {
        question: 'Can the scientific calculator display history?',
        answer: 'Yes, our Scientific Calculator displays an equation log stack so you can review previous operations.',
      },
      {
        question: 'Is the age calculator precise?',
        answer: 'Yes, it computes exact intervals down to years, months, weeks, and days, including leap-year accounts.',
      },
    ],
    relatedModules: ['conversion', 'utilities', 'productivity', 'travel'],
    featuredTools: ['scientific-calculator', 'age-calculator', 'cgpa-calculator'],
  },
  travel: {
    popularSearches: ['Timezone Converter', 'Fuel Cost Calculator', 'Travel Budget Planner'],
    whyUse: [
      {
        title: 'Accurate Time Syncing',
        description: 'Compare hours and coordinate meetings across timezone boundaries with simple sliders.',
        icon: 'Clock',
      },
      {
        title: 'Fuel Expense Estimates',
        description: 'Determine commute costs based on route distance, fuel efficiency, and regional prices.',
        icon: 'TrendingUp',
      },
      {
        title: 'Lightweight Travel Utility',
        description: 'Plan budgets and fuel spends locally on your mobile phone while traveling, even offline.',
        icon: 'Compass',
      },
    ],
    faqs: [
      {
        question: 'Does the Timezone Converter account for daylight savings?',
        answer: 'Yes, it reads international timezone database parameters directly from your operating system to auto-adjust for DST changes.',
      },
      {
        question: 'How do you calculate travel fuel costs?',
        answer: 'We compute: (Distance / Fuel Efficiency) * Price per Unit. You can customize units between miles/gallons and kilometers/liters.',
      },
      {
        question: 'Can I use travel planners offline?',
        answer: 'Yes, all parameters load in memory, allowing you to estimate travel costs in remote areas without signal.',
      },
    ],
    relatedModules: ['utilities', 'education', 'conversion', 'finance'],
    featuredTools: ['timezone-converter', 'fuel-cost-calculator'],
  },
  health: {
    popularSearches: ['BMI Calculator', 'BMR Calculator', 'Calorie Calculator', 'Sleep Cycle Calculator'],
    whyUse: [
      {
        title: 'Precise Body Metrics',
        description: 'Compute Body Mass Index and Basal Metabolic Rate using standard medical formula arrays.',
        icon: 'Activity',
      },
      {
        title: 'Nutritional Projections',
        description: 'Determine daily calorie budgets for fat loss, maintenance, or muscle gain instantly.',
        icon: 'Heart',
      },
      {
        title: 'Completely Anonymous',
        description: 'Your height, weight, gender, and age variables are never transmitted. Private health tracking.',
        icon: 'Shield',
      },
    ],
    faqs: [
      {
        question: 'Which formulas are used to estimate BMR?',
        answer: 'We implement the Mifflin-St Jeor and Harris-Benedict formulas to yield highly reliable baseline metabolic calculations.',
      },
      {
        question: 'Is my health data saved on your servers?',
        answer: 'No. Toolskyt does not record body dimensions, dietary inputs, or medical parameters. All metrics run locally.',
      },
      {
        question: 'Does the Sleep Calculator count cycles?',
        answer: 'Yes, it plans ideal wakeup or sleep-onset times centered around standard 90-minute sleep cycles to minimize grogginess.',
      },
    ],
    relatedModules: ['utilities', 'education', 'productivity', 'travel'],
    featuredTools: ['bmi-calculator', 'bmr-calculator', 'calorie-calculator'],
  },
  utilities: {
    popularSearches: ['Discount Calculator', 'Date Difference Calculator', 'Color Converter', 'Random Number Generator'],
    whyUse: [
      {
        title: 'Everyday Simple Tools',
        description: 'Find discount percentages, date durations, and hex values without navigating complex apps.',
        icon: 'Zap',
      },
      {
        title: 'Secure Random Generation',
        description: 'Generate high-entropy random selections and coin flips completely client-side.',
        icon: 'Lock',
      },
      {
        title: 'Zero Latency Performance',
        description: 'Optimized, modular functions execute mathematical computations instantly under 1ms.',
        icon: 'Smile',
      },
    ],
    faqs: [
      {
        question: 'How is the random number generated?',
        answer: 'We utilize the high-entropy cryptographically secure `crypto.getRandomValues()` API where available, fallback to standard random formulas.',
      },
      {
        question: 'Does the date calculator consider leap years?',
        answer: 'Yes, it counts exact calendar intervals, including months, weeks, and days, fully factoring in leap-year adjustments.',
      },
      {
        question: 'Can I copy conversion results directly?',
        answer: 'Yes, color converters and random generators include one-click clipboard copy triggers for instant integration.',
      },
    ],
    relatedModules: ['developer', 'text', 'conversion', 'productivity'],
    featuredTools: ['discount-calculator', 'date-difference', 'color-converter'],
  },
  conversion: {
    popularSearches: ['Length Converter', 'Weight Converter', 'Temperature Converter', 'Data Storage Converter'],
    whyUse: [
      {
        title: 'Universal Metric Systems',
        description: 'Convert values across imperial, metric, and international standard unit classifications.',
        icon: 'Scale',
      },
      {
        title: 'Instant Multi-Unit Outputs',
        description: 'Type once and view converted results across all metric scales simultaneously.',
        icon: 'RefreshCw',
      },
      {
        title: 'Offline Calculations',
        description: 'Translate weight, temperature, and length metrics in the field without internet connections.',
        icon: 'Lock',
      },
    ],
    faqs: [
      {
        question: 'Which units are supported in Length Converter?',
        answer: 'We support meters, kilometers, centimeters, millimeters, miles, yards, feet, inches, and nautical miles.',
      },
      {
        question: 'Does temperature converter handle negative values?',
        answer: 'Yes, it accurately processes extreme positive and negative scales across Celsius, Fahrenheit, and Kelvin.',
      },
      {
        question: 'Is it completely free to use?',
        answer: 'Yes. All unit converters run fully offline, contain no usage limits, and require no premium subscriptions.',
      },
    ],
    relatedModules: ['utilities', 'developer', 'education', 'travel'],
    featuredTools: ['length-converter', 'weight-converter', 'temperature-converter'],
  },
};
