import { ToolConfig } from '@/types';

export const SEO_CONTENTS: Record<string, Partial<ToolConfig>> = {
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
  }
};
