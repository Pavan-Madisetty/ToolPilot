import { ToolConfig } from '@/types';

export function getFallbackSEOContent(tool: ToolConfig): Partial<ToolConfig> {
  const name = tool.name;
  const desc = tool.description;
  const module = tool.module;

  // ─────────────────────────────────────────────
  // 1. Module-Specific Educational Explanations & Schemas
  // ─────────────────────────────────────────────
  let longDescription = `${name} is a free online browser-based utility designed to ${desc.toLowerCase()}. All computations, processing, and rendering happen completely inside your browser client, ensuring your data is kept secure and private.`;
  let benefits = [
    '100% Privacy: All processing happens locally in your browser. No files or inputs are sent to any servers.',
    'Lightning Fast: Instant client-side calculations with zero network latency or server load times.',
    'Mobile Responsive: Designed to work flawlessly on smartphones, tablets, and desktop browsers.',
  ];
  let features = [
    'Clean Interface: Streamlined layout designed for maximum focus and efficiency.',
    'One-Click Copy/Download: Easily export results to your clipboard or local files.',
    'Offline Ready: Works without an internet connection once loaded in your browser.',
  ];
  let tips = [
    'Bookmark this page for quick access when working offline or on slow network connections.',
    'Use the favorite button to quickly pin this tool on your homepage dashboard.',
  ];
  let examples = [
    {
      input: 'Standard user configuration / typical file upload',
      output: 'Formatted, calculated, or compiled representation',
    },
  ];
  const howToSteps = [
    {
      name: 'Enter Inputs',
      text: 'Input your data, values, or upload your file into the provided container panel.',
    },
    {
      name: 'Configure Options',
      text: 'Adjust sliders, selectors, or toggles to customize your desired output parameters.',
    },
    {
      name: 'Verify Live Preview',
      text: 'Review the instant calculation or visual representation generated in real-time.',
    },
    {
      name: 'Export Result',
      text: 'Click the Copy or Download button to save your formatted output.',
    },
  ];
  const faq = [
    {
      question: `Is my data shared when using the ${name}?`,
      answer:
        'No. Toolskyt operates under a zero-server policy. All calculations, data formatting, and file exports are executed locally on your machine.',
    },
    {
      question: `Do I need to sign up or pay to use the ${name}?`,
      answer:
        'No, this tool is 100% free. There are no limits, sign-ups, subscriptions, or hidden charges required.',
    },
  ];

  // ─────────────────────────────────────────────
  // 2. Customizing defaults by Module Type
  // ─────────────────────────────────────────────
  if (module === 'finance') {
    longDescription = `${name} is a comprehensive financial calculator designed to help you ${desc.toLowerCase()}. Planning finances requires absolute precision; this calculator provides instant accurate projections for EMIs, compounding, loans, and investment portfolio returns.`;
    benefits = [
      'Accurate Calculations: Computes precise interest and principal splits using standard reducing-balance math.',
      'Saves Money: Understand the total cost of interest before signing loan agreements.',
      '100% Private: Financial figures, income inputs, and debt sizes stay on your local device.',
    ];
    features = [
      'Real-Time Sliders: Slide to adjust inputs and see financial trends update instantly.',
      'Visual Split Representation: Colorful pie and line charts indicating principal vs. interest values.',
      'Schedule Breakdowns: Detailed monthly/yearly amortization lists.',
    ];
    tips = [
      'Verify the compounding frequency (monthly vs. yearly) as it significantly impacts total interest accrual.',
      'Always aim for shorter tenures to reduce overall interest repayment overheads.',
    ];
    examples = [
      {
        input: 'Typical financial inputs (Rate: 10%, Period: 5 Years)',
        output: 'Accurate calculated return values and amortization rows',
      },
    ];
    faq.push({
      question: 'What is a reducing interest rate?',
      answer:
        'A reducing interest rate means interest is charged only on the remaining outstanding principal balance at the end of each period, rather than the initial loan amount.',
    });
  } else if (module === 'developer') {
    longDescription = `${name} is a secure developer utility built to ${desc.toLowerCase()}. Developers frequently handle sensitive tokens, JSON configs, and code blocks; this tool processes all text manipulations entirely offline, preventing leaks.`;
    benefits = [
      'Zero Leakage: Perfect for formatting sensitive client data, secrets, or API response configurations.',
      'Debugging Assistance: Spots exact syntax errors and formatting issues with helper highlights.',
      'Productivity Booster: Simple hotkeys and one-click operations speed up debugging workflows.',
    ];
    features = [
      'Offline Processing: Computes operations instantly in your local browser client.',
      'One-Click Copy: Instantly copy inputs or outputs to your clipboard.',
      'Precision Outputs: Processes inputs immediately to provide clean, error-free results.',
    ];
    tips = [
      'Bookmark this utility for immediate access during network outages or offline tasks.',
      'Double-click inside the result viewport area to quickly highlight the entire output.',
    ];
    faq.push({
      question: 'Is it safe to paste API tokens or private JSON data here?',
      answer:
        'Yes, absolutely. The tool executes 100% inside your local browser memory space. No inputs are sent to any servers.',
    });
  } else if (module === 'image') {
    longDescription = `${name} is a client-side image editor that lets you ${desc.toLowerCase()}. Speeding up page loads requires optimized images; this tool uses HTML5 Canvas APIs to resize, crop, and compress files locally.`;
    benefits = [
      'Zero Network Latency: Process heavy, multi-megapixel photos in milliseconds without uploading over slow connections.',
      'Optimizes Page Speeds: Shrink images to meet PageSpeed and Core Web Vitals targets.',
      'Private Galleries: Uploaded family photos or confidential screenshots stay completely local.',
    ];
    features = [
      'Original vs. Compressed Preview: Side-by-side comparison panels to check visual quality.',
      'Aspect Ratio Lockers: Retain dimensions scales automatically when adjusting widths.',
      'Vector Exports: Download vector SVG outputs for icons or barcode/QR tags.',
    ];
    tips = [
      'Set quality to 80% to achieve massive file size reductions (up to 75%) with zero visible loss in detail.',
      'Convert PNG screenshots to WebP to save an additional 30% of storage space.',
    ];
    faq.push({
      question: 'How do I reduce image sizes without losing transparency?',
      answer:
        'Export your image as WebP or PNG format. Standard JPEG format does not support transparent layers and will convert transparency to white.',
    });
  } else if (module === 'text') {
    longDescription = `${name} is an offline text processor designed to ${desc.toLowerCase()}. Analyze word frequencies, highlight character differentials, or edit markdown documents instantly.`;
    benefits = [
      'Draft Privacy: Perfect for reviewing sensitive contracts, articles, or resumes securely.',
      'Real-Time Analysis: Words, letters, sentences, and density tables update as you type.',
      'Formatted Exports: Copy clean markup or download raw files instantly.',
    ];
    tips = [
      'Double-click output fields to quickly highlight all text for copying.',
      'Leverage keyword density tables to make sure your articles are optimized for targeted search terms.',
    ];
  }

  return {
    longDescription,
    benefits,
    features,
    tips,
    examples,
    howToSteps,
    faq,
  };
}
