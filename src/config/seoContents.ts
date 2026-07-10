import { ToolConfig } from '@/types';

export const SEO_CONTENTS: Record<string, Partial<ToolConfig>> = {
  // ─────────────────────────────────────────────
  // FINANCE MODULE
  // ─────────────────────────────────────────────
  'emi-calculator': {
    longDescription: 'An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. Equated monthly installments are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full.',
    benefits: [
      'Accurate Financial Planning: Plan your monthly budget accurately around your loan repayments.',
      'Comparison Shopping: Easily compare different interest rates and loan tenures from multiple lenders.',
      'Amortization Insights: Understand how much of your payment goes towards interest versus principal.',
      '100% Free & Secure: Calculated completely in your browser with zero data storage or external server calls.'
    ],
    features: [
      'Interactive Sliders: Instantly adjust principal amount, rate, and tenure values.',
      'Visual Allocation Chart: View the principal vs. interest breakdown dynamically.',
      'Complete Breakdowns: Detailed monthly and yearly amortization schedules.',
      'Export Options: Easily download schedules as CSV for spreadsheet analysis.'
    ],
    tips: [
      'Opt for shorter tenures to minimize the total interest paid over the life of the loan.',
      'Consistently make prepayments whenever possible to significantly reduce the principal balance.',
      'Ensure your total EMI outgoings do not exceed 40% of your net monthly take-home salary.'
    ],
    examples: [
      { input: 'Principal: ₹10,00,000, Interest Rate: 8.5%, Tenure: 120 Months (10 Years)', output: 'Monthly EMI: ₹12,399, Total Interest: ₹4,87,838, Total Repayment: ₹14,87,838' }
    ],
    howToSteps: [
      { name: 'Enter Loan Principal', text: 'Input the total amount you wish to borrow (e.g. ₹10,00,000) using the slider or input box.' },
      { name: 'Set Interest Rate', text: 'Enter the annual interest rate offered by the lender (e.g. 8.5%).' },
      { name: 'Choose Loan Tenure', text: 'Select the duration of the loan in years or months (e.g. 10 years).' },
      { name: 'Analyze Amortization Schedule', text: 'Scroll down to review the monthly payment breakdown and download it as CSV if needed.' }
    ],
    faq: [
      { question: 'What is the formula to calculate EMI?', answer: 'The mathematical formula for calculating EMI is: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1) where P is the Principal, r is the monthly interest rate, and n is the number of monthly installments.' },
      { question: 'How does loan prepayment affect my EMI?', answer: 'Making a prepayment reduces the outstanding principal balance. This allows you to either lower your future monthly EMI amount or keep the EMI same and reduce the remaining tenure.' },
      { question: 'Can I calculate EMI for different types of loans?', answer: 'Yes, this calculator works for Home Loans, Personal Loans, Car Loans, Education Loans, and any other standard reducing balance loan products.' }
    ]
  },
  'sip-calculator': {
    longDescription: 'A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds, allowing investors to invest small amounts periodically instead of as a lump-sum. The frequency of investment is usually weekly, monthly or quarterly.',
    benefits: [
      'Disciplined Investing: Fosters regular saving habits regardless of market volatility.',
      'Rupee Cost Averaging: Automatically buys more units when prices are low and fewer when prices are high.',
      'Compounding Power: Generates compound returns over long investment horizons.',
      'Flexibility: Start small and increase or stop your investments anytime.'
    ],
    features: [
      'Interactive Goal Inputs: Instantly adjust monthly savings, returns, and years.',
      'Compound Growth Chart: Visually compare total invested capital against estimated wealth growth.',
      'Yearly Growth Details: Detailed annual breakups of principal vs. interest components.',
      'One-Click Comparison: Easily switch between SIP and Lump Sum options.'
    ],
    tips: [
      'Start investing early to give your money more time to compound and grow.',
      'Increase your SIP contribution yearly in step with salary increments to meet your goals faster.',
      'Ignore short-term market fluctuations and stay invested for at least 5-7 years.'
    ],
    examples: [
      { input: 'Monthly Investment: ₹5,000, Expected Return: 12%, Tenure: 15 Years', output: 'Total Invested: ₹9,00,000, Estimated Returns: ₹16,22,880, Total Value: ₹25,22,880' }
    ],
    howToSteps: [
      { name: 'Set Monthly Contribution', text: 'Enter the amount you wish to invest every month (e.g. ₹5,000).' },
      { name: 'Enter Expected Returns', text: 'Input the projected annual rate of return (e.g. 12% for historical equity mutual funds).' },
      { name: 'Choose Investment Period', text: 'Select the total number of years you plan to stay invested (e.g. 15 years).' },
      { name: 'Evaluate Estimated Wealth', text: 'Review the total returns and the wealth progression charts below.' }
    ],
    faq: [
      { question: 'What is Rupee Cost Averaging in SIP?', answer: 'Rupee Cost Averaging means you invest a fixed sum at regular intervals. When markets fall, you get more units, and when they rise, you get fewer units. Over time, your average cost per unit reduces, smoothing out volatility.' },
      { question: 'Can I modify or pause my SIP anytime?', answer: 'Yes, you can pause, stop, or edit the SIP amount anytime without penalties, making it highly flexible compared to traditional saving deposits.' },
      { question: 'What rate of return should I expect?', answer: 'While returns are not guaranteed, historical equity mutual funds in India have generally returned between 12% and 15% annually over a 7+ year period.' }
    ]
  },
  'gst-calculator': {
    longDescription: 'The Goods and Services Tax (GST) is an indirect tax used in India and other nations on the supply of goods and services. Our GST Calculator allows business owners, freelancers, and consumers to calculate net price, gross price, and tax amounts.',
    benefits: [
      'Accurate Tax Estimates: Know exactly how much GST is applied to invoice values.',
      'Add & Remove GST Toggles: Switch modes to extract GST from gross sums or add it to base costs.',
      'Detailed Split: Displays exact splits for CGST, SGST, and IGST.'
    ],
    howToSteps: [
      { name: 'Select Mode', text: 'Choose whether you want to Add GST or Remove GST from your target amount.' },
      { name: 'Enter Amount', text: 'Input the base price or final gross price.' },
      { name: 'Choose GST Rate', text: 'Select a standard tax slab (5%, 12%, 18%, 28%) or enter a custom rate.' }
    ],
    faq: [
      { question: 'What is the difference between CGST, SGST, and IGST?', answer: 'CGST (Central GST) and SGST (State GST) are applied on intrastate sales and split equally. IGST (Integrated GST) is applied on interstate transactions and goes to the Central Government.' },
      { question: 'How do I extract GST from a total amount?', answer: 'To remove GST, the formula is: GST Amount = Original Cost - (Original Cost * (100 / (100 + GST%))).' }
    ]
  },
  'tip-calculator': {
    longDescription: 'A Tip Calculator helps you quickly compute tips, split restaurant checks, and manage group dinners without head-scratching calculations.',
    benefits: [
      'Quick Billing Split: Divide restaurant checks accurately among friends.',
      'Saves Math Overhead: Preset tip options (10%, 15%, 20%) avoid mental calculations.'
    ],
    howToSteps: [
      { name: 'Enter Total Bill', text: 'Input the total invoice amount before tip.' },
      { name: 'Choose Tip %', text: 'Select a percentage button or enter a custom value.' },
      { name: 'Enter Number of People', text: 'Input the count of diners sharing the cost.' }
    ],
    faq: [
      { question: 'What is a standard tipping percentage?', answer: 'A tip of 15% to 20% is considered standard in most casual and fine-dining restaurants across North America and Europe.' }
    ]
  },
  'compound-interest-calculator': {
    longDescription: 'Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.',
    benefits: [
      'Projects True Wealth: Learn how compounding frequencies (monthly, quarterly, yearly) accelerate savings.',
      'Clear Growth Breakdown: View year-by-year principal accumulation lists.'
    ],
    howToSteps: [
      { name: 'Enter Principal', text: 'Input your initial investment or starting capital sum.' },
      { name: 'Set Rate & Period', text: 'Set the annual interest rate percentage and tenure in years.' },
      { name: 'Select Frequency', text: 'Choose your compounding intervals (e.g., Monthly, Quarterly, Annually).' }
    ],
    faq: [
      { question: 'What is the rule of 72?', answer: 'The Rule of 72 is a quick formula to estimate when your investment will double. Divide 72 by your annual interest rate to find the approximate number of years (e.g., 72 / 12% return = 6 years).' }
    ]
  },

  // ─────────────────────────────────────────────
  // DEVELOPER MODULE
  // ─────────────────────────────────────────────
  'json-formatter': {
    longDescription: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. The JSON Formatter helps format, validate, minify, and clean JSON payloads.',
    benefits: [
      'Zero Server Transmission: Rest assured that your JSON data stays completely local to your browser, protecting API keys and client data.',
      'Error Debugging: Identifies the exact line number and missing character when JSON validation fails.',
      'Optimized Loading: Minifies payloads to save bandwidth and improve API response times.'
    ],
    features: [
      'Interactive Code Highlights: Colored syntax representation for object keys, arrays, numbers, and strings.',
      'One-Click Minifier: Compacts JSON strings into a single line.',
      'Auto-Repair: Corrects missing quotes, trailing commas, and unquoted keys automatically.',
      'JSON Key Sorting: Sorts properties alphabetically for easier differential comparison.'
    ],
    tips: [
      'Use the Minify feature before sending payloads to APIs to reduce packet payload sizes.',
      'Leverage Key Sorting to make git diff comparisons between two JSON configurations clean.'
    ],
    examples: [
      { input: "{name: 'John', age: 30,}", output: '{\n  "name": "John",\n  "age": 30\n}' }
    ],
    howToSteps: [
      { name: 'Paste or Upload JSON', text: 'Paste your raw JSON text into the input panel or click Upload to select a local file.' },
      { name: 'Select Formatting Depth', text: 'Choose your preferred indentation spacing (e.g. 2 spaces, 4 spaces, or Tab).' },
      { name: 'Format or Minify', text: 'Click Format to beautify the code with syntax highlighting, or click Minify to compact it.' },
      { name: 'Copy or Download Output', text: 'Use the Copy Button to save the result to your clipboard or download it as a .json file.' }
    ],
    faq: [
      { question: 'Is my JSON data sent to any server?', answer: 'No. All validation and formatting happen locally in your browser using pure client-side JavaScript. No data is transmitted externally.' },
      { question: 'Why does my JSON parsing fail?', answer: 'Common mistakes include trailing commas, single quotes instead of double quotes, or missing quotes around property keys. The validator highlights these errors with line numbers.' },
      { question: 'What is the difference between Formatted and Minified JSON?', answer: 'Formatted JSON includes spacing, line breaks, and indentation for human readability. Minified JSON strips out all whitespace and newlines to create the smallest possible file size for server transmission.' }
    ]
  },
  'base64': {
    longDescription: 'Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data.',
    benefits: [
      'Browser Native: Fast operations processed directly by browser APIs.',
      'File Upload Encoder: Encode icons or small attachments directly into base64 text for embedding in HTML/CSS.'
    ],
    howToSteps: [
      { name: 'Select Mode', text: 'Choose Encode to turn text to base64, or Decode to convert it back.' },
      { name: 'Paste Input', text: 'Input your raw string or drag-and-drop a file.' },
      { name: 'Copy Output', text: 'Instantly copy the result.' }
    ],
    faq: [
      { question: 'Is Base64 a form of encryption?', answer: 'No. Base64 is an encoding format used to transmit data, not to secure it. It can be easily decoded by anyone and offers zero cryptographic security.' }
    ]
  },
  'uuid-generator': {
    longDescription: 'A Universally Unique Identifier (UUID) is a 128-bit label used for information in computer systems. We generate version 4 UUIDs (which are cryptographically secure random values) and version 1 UUIDs (time-based values).',
    benefits: [
      'Guaranteed Uniqueness: Version 4 offers virtually zero chance of collision.',
      'Bulk Generation: Instantly create up to 100 UUIDs at a time.'
    ],
    howToSteps: [
      { name: 'Select Version', text: 'Select Version 4 (Random) or Version 1 (Time-based).' },
      { name: 'Set Quantity', text: 'Select how many unique IDs to generate.' },
      { name: 'Click Generate', text: 'Copy individual IDs or the entire bundle.' }
    ]
  },
  'hash-generator': {
    longDescription: 'Cryptographic hash functions process arbitrary data to output fixed-size checksum strings. This generator supports MD5, SHA-1, SHA-256, and SHA-512 checksum calculations client-side.',
    benefits: [
      'Data Integrity Verification: Verify downloaded files against hashes.',
      'Completely Secure: Calculates hashes locally without transmitting contents.'
    ],
    howToSteps: [
      { name: 'Input Data', text: 'Paste your raw text or upload a file.' },
      { name: 'Review Hashes', text: 'Compare SHA-256 or MD5 outputs.' }
    ]
  },
  'regex-tester': {
    longDescription: 'Regular expressions (regex) are sequences of characters that define search patterns. This tester helps developers validate regular expression matches with real-time text highlighting and sub-group captures.',
    benefits: [
      'Visual Validation: Instantly see matches highlighted in yellow.',
      'Flag Support: Supports global (g), case-insensitive (i), and multi-line (m) flags.'
    ],
    howToSteps: [
      { name: 'Enter Pattern', text: 'Input your regular expression pattern.' },
      { name: 'Enter Test String', text: 'Type standard text to see match highlights.' }
    ]
  },
  'password-generator': {
    longDescription: 'A secure password generator constructs random passwords based on specific character rules (capital letters, lowercase, numbers, and symbols). This tool uses entropy-based calculations to output strong passwords.',
    benefits: [
      'Prevents Hack Attempts: Generates cryptographically secure passwords.',
      'Entropy Bar: Indicates strength based on mathematical combinations.'
    ],
    howToSteps: [
      { name: 'Select Length', text: 'Choose password length from 8 to 128 characters.' },
      { name: 'Set Options', text: 'Toggle numbers, uppercase, symbols, and look-alike characters.' }
    ]
  },
  'jwt-decoder': {
    longDescription: 'JSON Web Token (JWT) is a proposed Internet standard for creating data access tokens. Our JWT Decoder parses header parameters and claim payloads instantly.',
    benefits: [
      'Client-Side Safety: Never sends access tokens to external APIs.',
      'Clean Formats: Decodes header, claims payload, and signature blocks separately.'
    ],
    howToSteps: [
      { name: 'Paste Token', text: 'Paste your raw encoded JWT string.' },
      { name: 'Analyze claims', text: 'Review standard issued, expiry dates, and scopes.' }
    ]
  },
  'timestamp-converter': {
    longDescription: 'Unix epoch time measures the number of seconds that have elapsed since January 1, 1970. This tool translates raw Unix timestamps to local and UTC date formats.',
    benefits: [
      'Dual Conversions: Converts timestamps to dates and dates to timestamps.',
      'Relative Calculations: Displays outputs indicating elapsed time (e.g. 5 hours ago).'
    ],
    howToSteps: [
      { name: 'Paste Timestamp', text: 'Input an epoch timestamp (seconds or milliseconds).' },
      { name: 'Select Timezone', text: 'Compare UTC and local timezone representations.' }
    ]
  },

  // ─────────────────────────────────────────────
  // TEXT MODULE
  // ─────────────────────────────────────────────
  'word-counter': {
    longDescription: 'A Word Counter is a text analysis utility that measures words, characters, sentences, paragraphs, and reading times for document drafts.',
    benefits: [
      'Writing Benchmarks: Monitor content lengths to fit character thresholds.',
      'Keyword Optimization: Review keyword density lists to target search engine keywords.'
    ],
    howToSteps: [
      { name: 'Paste Text', text: 'Type or paste your text draft.' },
      { name: 'Analyze Metrics', text: 'Review word count, character count, and keyword frequencies instantly.' }
    ]
  },
  'case-converter': {
    longDescription: 'A Case Converter changes text capitalization rules across paragraphs. It supports camelCase, PascalCase, snake_case, UPPERCASE, lowercase, and Title Case.',
    benefits: [
      'Cleans Typographic Errors: Fix accidentally pressed Caps-Lock paragraphs.',
      'Programming Formats: Convert standard sentences to camelCase or snake_case formats.'
    ],
    howToSteps: [
      { name: 'Input Text', text: 'Paste your sentence or paragraph.' },
      { name: 'Choose Formatting', text: 'Click any formatting option to instantly transform casing.' }
    ]
  },
  'text-diff': {
    longDescription: 'A Text Diff checker performs side-by-side or unified comparisons between two versions of a document, highlighting added, modified, or deleted segments.',
    benefits: [
      'Spot Changes: Highlight precise additions and deletions in color-coded formats.',
      'Draft Versioning: Compare old drafts against new ones instantly.'
    ],
    howToSteps: [
      { name: 'Enter Original Text', text: 'Paste the base version in the left panel.' },
      { name: 'Enter Modified Text', text: 'Paste the updated version in the right panel.' }
    ]
  },
  'markdown-editor': {
    longDescription: 'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. This editor renders real-time HTML previews next to your markdown input.',
    benefits: [
      'Easy Formatting: Compile styled headers, bold text, links, and tables easily.',
      'Instant HTML Export: Copy converted HTML strings directly.'
    ],
    howToSteps: [
      { name: 'Type Markdown', text: 'Input standard markdown syntax.' },
      { name: 'Review Preview', text: 'Inspect formatting changes in the preview panel.' }
    ]
  },

  // ─────────────────────────────────────────────
  // IMAGE MODULE
  // ─────────────────────────────────────────────
  'image-compress': {
    longDescription: 'Image compression is the process of encoding digital images with fewer bits than the original representation. This compressor uses browser canvas capabilities to compress JPEG, PNG, and WebP images instantly.',
    benefits: [
      'Lighter Page Speeds: Compress website images to achieve faster page loading and better Core Web Vitals.',
      'Email and Form uploads: Reduce size limits to fit threshold requirements of official portals.',
      'Local Performance: Compress multi-megabyte images in milliseconds without network delay.'
    ],
    features: [
      'Side-by-Side Comparison: Easily inspect original vs. compressed image details.',
      'Quality Adjustment Slider: Real-time compression percentage selectors.',
      'Accurate File Readout: View the exact bytes saved and percentage reduction.'
    ],
    tips: [
      'Set the quality to 75-80% to achieve massive file size reduction (often up to 80%) with zero visible loss in quality.',
      'Convert heavy PNG screenshots to WebP/JPG format before compressing for maximum compression ratio.'
    ],
    examples: [
      { input: 'Original PNG: 4.2 MB, Target Quality: 80%', output: 'Compressed WebP: 840 KB (80% Size Reduction)' }
    ],
    howToSteps: [
      { name: 'Upload Image', text: 'Click the upload zone or drag and drop any image file.' },
      { name: 'Adjust Quality', text: 'Drag the slider to adjust target quality. Live output updates size estimation automatically.' },
      { name: 'Review Preview', text: 'Compare the visual clarity and final size reduction readouts.' },
      { name: 'Download File', text: 'Click Download to save the compressed image.' }
    ],
    faq: [
      { question: 'Does this compressor support transparent PNGs?', answer: 'Yes. PNG transparency is preserved. If you convert transparent PNG to JPEG format, the transparent background will automatically render as white.' },
      { question: 'What is a good target quality for web images?', answer: 'A quality level between 75% and 85% offers the best balance, saving up to 80% of file size while keeping visual artifacts invisible to the human eye.' },
      { question: 'Are my images uploaded to any server?', answer: 'No. All resizing and compression are done 100% locally in your browser using HTML5 Canvas. Your private photos never leave your device.' }
    ]
  },
  'image-resize': {
    longDescription: 'An image resizer modifies pixel dimensions of photos using client-side canvas scaling filters to ensure high visual quality.',
    benefits: [
      'Zero Network Overhead: Resize large megapixel photographs instantly.',
      'Aspect Ratio Lock: Preserves original dimension ratios to prevent distortion.'
    ],
    howToSteps: [
      { name: 'Select Image', text: 'Choose an image file.' },
      { name: 'Input Dimensions', text: 'Set target width or height (aspect ratio is locked by default).' },
      { name: 'Click Download', text: 'Export in JPG, PNG, or WebP format.' }
    ]
  },
  'image-crop': {
    longDescription: 'Image cropping trims outer borders of photographs to highlight subjects or conform to specific aspect ratios.',
    benefits: [
      'Ratio Presets: Choose standard presets like 1:1, 16:9, or 4:3.',
      '100% Private: Cropping coordinates are processed locally on the client.'
    ],
    howToSteps: [
      { name: 'Upload File', text: 'Upload the photo you want to crop.' },
      { name: 'Adjust Boundaries', text: 'Move position sliders or select aspect ratio presets.' },
      { name: 'Apply Crop', text: 'Download cropped canvas image.' }
    ]
  },
  'qr-generator': {
    longDescription: 'Quick Response (QR) codes are matrix barcodes designed to store URLs, text payloads, or contact credentials.',
    benefits: [
      'Custom Colors: Adjust background and foreground colors.',
      'Instant Downloads: Save generated codes in high-resolution PNG format.'
    ],
    howToSteps: [
      { name: 'Enter Text/URL', text: 'Input URL or textual payload.' },
      { name: 'Customize Style', text: 'Select foreground/background colors and size.' }
    ]
  },
  'barcode-generator': {
    longDescription: 'A Barcode Generator translates alphanumeric strings into visual EAN/CODE128 line sequences for scanning.',
    benefits: [
      'Alphanumeric Support: Encodes standard CODE128 characters.',
      'Vector Output: Downloads in clean, scalable vector SVG format.'
    ],
    howToSteps: [
      { name: 'Enter Value', text: 'Input the code string.' },
      { name: 'Download SVG', text: 'Save vector barcode files.' }
    ]
  },
  'jpg-converter': {
    longDescription: 'An Image to JPG converter translates PNG, WebP, GIF, or BMP files to JPEG format client-side.',
    benefits: [
      'Transparency Handling: Automatically fills transparent pixels with solid white.',
      'Quality Control: Customize file sizing and quality parameters.'
    ],
    howToSteps: [
      { name: 'Select File', text: 'Upload any non-JPG image.' },
      { name: 'Convert & Download', text: 'Download high-quality JPEG output.' }
    ]
  },
  'webp-converter': {
    longDescription: 'A WebP converter compresses standard image formats into highly efficient WebP files for web optimization.',
    benefits: [
      'Saves Web Bandwidth: Compresses files up to 30% more than JPEGs.',
      'Offline Rendering: Secure conversions processed locally.'
    ],
    howToSteps: [
      { name: 'Select File', text: 'Choose PNG, JPG, or GIF files.' },
      { name: 'Convert to WebP', text: 'Download compressed WebP outputs.' }
    ]
  },
  'color-palette': {
    longDescription: 'A Color Palette Extractor identifies dominant colors in uploaded photographs using K-Means clustering algorithms.',
    benefits: [
      'Design Asset Extraction: Extract styled color combinations from photos.',
      'HEX, RGB, HSL support: View color values in all standard formats with click-to-copy convenience.'
    ],
    howToSteps: [
      { name: 'Upload Photo', text: 'Select the target logo or photograph.' },
      { name: 'Extract colors', text: 'Palette outputs automatically with click-to-copy buttons.' }
    ]
  },
  'favicon-generator': {
    longDescription: 'A Favicon Generator converts square logos into standardized favicon sizes for browser tabs, iOS Apple Touch, and Android.',
    benefits: [
      'Standardized Size Bundles: Generates 16x16, 32x32, 180x180, and 512x512 sizes.',
      'Browser Compatibility: Exports favicon.ico files.'
    ],
    howToSteps: [
      { name: 'Select Logo', text: 'Upload your square logo image.' },
      { name: 'Download Pack', text: 'Generate and download standard size variations.' }
    ]
  },

  // ─────────────────────────────────────────────
  // EDUCATION MODULE
  // ─────────────────────────────────────────────
  'scientific-calculator': {
    longDescription: 'A Scientific Calculator computes advanced mathematical calculations including trigonometry, logarithms, power exponents, and factorials.',
    benefits: [
      'Complete Keyboard support: Type equations directly.',
      'Memory Buffers: Save inputs using standard MR, MC, and MS buttons.'
    ],
    howToSteps: [
      { name: 'Choose Angle Units', text: 'Select Degrees or Radians mode.' },
      { name: 'Enter Equation', text: 'Use numerical keys and mathematical functions.' }
    ]
  },
  'age-calculator': {
    longDescription: 'An Age Calculator calculates accurate intervals between two dates, listing elapsed years, months, weeks, days, and countdowns to birthdays.',
    benefits: [
      'Accurate Age Records: Calculates exact duration details.',
      'Fun Facts: Check estimated lifetime heartbeats and breaths elapsed.'
    ],
    howToSteps: [
      { name: 'Select DOB', text: 'Input birth date details.' },
      { name: 'Review age', text: 'Review exact timeline breakdowns.' }
    ]
  },
  'percentage-calculator': {
    longDescription: 'A Percentage Calculator calculates percentage changes, percentage ratios, and percentage increases/decreases across 6 distinct math modules.',
    benefits: [
      'All Modes Available: Calculate changes, splits, and proportions simultaneously.',
      'Instant Calculations: Results update in real-time as you type.'
    ],
    howToSteps: [
      { name: 'Select Calculation Mode', text: 'Locate the correct input card.' },
      { name: 'Enter Values', text: 'Enter parameters to view instant percentages.' }
    ]
  },
  'cgpa-calculator': {
    longDescription: 'A CGPA Calculator tracks and calculates GPA benchmarks (on 4.0 and 10.0 scales) across semesters and subjects.',
    benefits: [
      'Academic Planning: Track and forecast cumulative grade point averages.',
      'Editable Rows: Add or remove subjects dynamically.'
    ],
    howToSteps: [
      { name: 'Add Subjects', text: 'Input subject name, letter grade, and credit weights.' },
      { name: 'Review GPAs', text: 'Instantly view CGPA scores and percentage equivalents.' }
    ]
  },

  // ─────────────────────────────────────────────
  // HEALTH MODULE
  // ─────────────────────────────────────────────
  'bmi-calculator': {
    longDescription: 'A BMI (Body Mass Index) Calculator evaluates baseline body mass categorizations (underweight, normal, overweight, obese) using height and weight metrics.',
    benefits: [
      'Dual Scale Support: Toggle between Metric (kg, cm) and Imperial (lbs, ft/in) systems.',
      'Healthy Range Tracker: Shows healthy weight target limits for your specific height.'
    ],
    howToSteps: [
      { name: 'Input Height & Weight', text: 'Enter your weight and height values.' },
      { name: 'Verify BMI', text: 'Verify your BMI classification on the visual scale.' }
    ]
  },

  // ─────────────────────────────────────────────
  // PRODUCTIVITY MODULE
  // ─────────────────────────────────────────────
  'pomodoro': {
    longDescription: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a kitchen timer to break work down into intervals, traditionally 25 minutes in length, separated by short breaks.',
    benefits: [
      'Reduces Fatigue: Scheduled short and long breaks prevent burnout.',
      'Local Notifications: Notifies you using browser Web Audio API sounds.'
    ],
    howToSteps: [
      { name: 'Start Work Session', text: 'Focus on your task until the 25-minute timer finishes.' },
      { name: 'Take a Short Break', text: 'Rest for 5 minutes during the short break timer.' }
    ]
  },
  'todo': {
    longDescription: 'A To-Do List is a task organizer that manages daily routines, checklists, priorities, and deadlines.',
    benefits: [
      'Task Prioritization: Label tasks as High, Medium, or Low priority.',
      'Browser Storage Sync: Saves tasks locally in your browser memory.'
    ],
    howToSteps: [
      { name: 'Add Task', text: 'Enter task description, priority, and due dates.' },
      { name: 'Check off Tasks', text: 'Check off completed items dynamically.' }
    ]
  },
  'habit-tracker': {
    longDescription: 'A Habit Tracker logs weekly routines, streaks, and long-term habits using contribution heatmaps to boost consistency.',
    benefits: [
      'Motivational Streaks: Visualizes consecutive days completed.',
      'Contribution Grid: Spot patterns using a GitHub-style activity grid.'
    ],
    howToSteps: [
      { name: 'Create Habit', text: 'Input habit title and category color.' },
      { name: 'Log Completions', text: 'Log completions daily to build streaks.' }
    ]
  }
};
