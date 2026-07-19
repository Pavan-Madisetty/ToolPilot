import { useState, useEffect, useRef } from 'react';
import { 
  Clipboard, 
  Check, 
  RotateCw, 
  AlertCircle, 
  ChevronDown
} from 'lucide-react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';

export default function AlternativeTimestamps() {
  // Input State
  const [inputValue, setInputValue] = useState('1715842800');
  const [parsedDate, setParsedDate] = useState<Date | null>(new Date(1715842800 * 1000));
  const [detectedFormat, setDetectedFormat] = useState('Unix Seconds');
  const [isError, setIsError] = useState(false);

  // Settings
  const [timezone, setTimezone] = useState('UTC');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Copy Feedback State
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  // Live Ticker State
  const [liveUnix, setLiveUnix] = useState(0);
  const [liveIso, setLiveIso] = useState('');

  // References
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Parse logic helper
  const handleParse = (inputVal: string) => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setParsedDate(null);
      setDetectedFormat('No input');
      setIsError(false);
      return;
    }

    // Check if it's purely numeric
    if (/^\d+$/.test(trimmed)) {
      const val = parseInt(trimmed, 10);
      if (trimmed.length <= 10) {
        setParsedDate(new Date(val * 1000));
        setDetectedFormat('Unix Seconds');
        setIsError(false);
      } else if (trimmed.length <= 13) {
        setParsedDate(new Date(val));
        setDetectedFormat('Unix Milliseconds');
        setIsError(false);
      } else if (trimmed.length <= 16) {
        // Microseconds
        setParsedDate(new Date(Math.floor(val / 1000)));
        setDetectedFormat('Unix Microseconds');
        setIsError(false);
      } else {
        // Nanoseconds
        setParsedDate(new Date(Math.floor(val / 1000000)));
        setDetectedFormat('Unix Nanoseconds');
        setIsError(false);
      }
      return;
    }

    // Try parsing as raw date string
    const parsedTime = Date.parse(trimmed);
    if (!isNaN(parsedTime)) {
      setParsedDate(new Date(parsedTime));
      if (trimmed.includes('T') || trimmed.includes('t')) {
        setDetectedFormat('ISO-8601 Date String');
      } else {
        setDetectedFormat('Human-Readable Date String');
      }
      setIsError(false);
    } else {
      setIsError(true);
      setDetectedFormat('Invalid Format');
    }
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    handleParse(val);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleParse('1715842800');
  }, []);

  // Live Ticker Effect
  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiveUnix(Math.floor(now.getTime() / 1000));
    setLiveIso(now.toISOString());

    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        const tickNow = new Date();
        setLiveUnix(Math.floor(tickNow.getTime() / 1000));
        setLiveIso(tickNow.toISOString());
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    });
  };

  // Paste helper
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleInputChange(text);
      }
    } catch {
      console.warn('Clipboard read access denied. Please paste manually.');
    }
  };

  // Format explicitly
  const handleFormatClick = () => {
    handleParse(inputValue);
  };

  // Formatted date results based on active timezone
  const getFormattedResults = () => {
    if (!parsedDate || isError) {
      return {
        unixSec: '-',
        unixMs: '-',
        iso: '-',
        utc: '-',
        local: '-'
      };
    }

    const ms = parsedDate.getTime();
    const sec = Math.floor(ms / 1000);
    const iso = parsedDate.toISOString();
    const utc = parsedDate.toUTCString();

    // Format local with custom timezone selected
    let local = '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    if (timezone === 'UTC') {
      local = parsedDate.toLocaleString('en-US', { ...options, timeZone: 'UTC' }) + ' UTC';
    } else if (timezone === 'Local') {
      local = parsedDate.toLocaleString('en-US', options);
    } else if (timezone === 'EST') {
      local = parsedDate.toLocaleString('en-US', { ...options, timeZone: 'America/New_York' }) + ' EST';
    } else if (timezone === 'PST') {
      local = parsedDate.toLocaleString('en-US', { ...options, timeZone: 'America/Los_Angeles' }) + ' PST';
    } else if (timezone === 'IST') {
      local = parsedDate.toLocaleString('en-US', { ...options, timeZone: 'Asia/Kolkata' }) + ' IST';
    }

    return {
      unixSec: sec.toString(),
      unixMs: ms.toString(),
      iso,
      utc,
      local
    };
  };

  const results = getFormattedResults();

  return (
    <ToolPageWrapper toolId="alternative-timestamps">
      <div className="space-y-8 font-sans">
        {/* Primary Conversion Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input & Formatter Cards */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Main Input Box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-200">
              <div className="flex flex-col gap-4">
                <label className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Input Timestamp or Date String
                </label>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input 
                      id="timestampInput"
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder="e.g., 1715842800 or 2024-05-16T07:00:00Z"
                      className={`w-full h-14 bg-gray-50/50 px-4 pr-16 py-3 rounded-lg border ${
                        isError 
                          ? 'border-red-200 focus:ring-red-100 focus:border-red-400' 
                          : 'border-gray-200 focus:ring-2 focus:ring-primary/10 focus:border-primary'
                      } outline-none transition-all text-sm font-sans font-medium text-gray-900`}
                    />
                    <button 
                      id="input-paste-btn"
                      onClick={handlePaste}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container font-sans text-xs font-bold uppercase cursor-pointer select-none"
                    >
                      Paste
                    </button>
                  </div>
                  
                  <button 
                    id="format-convert-btn"
                    onClick={handleFormatClick}
                    className="bg-primary hover:bg-primary-container text-white h-14 px-8 rounded-lg font-sans text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 cursor-pointer shadow-sm shadow-primary/20"
                  >
                    <RotateCw className="w-4 h-4" />
                    Format
                  </button>
                </div>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-50 mt-1">
                  <div className="flex items-center gap-2">
                    {isError ? (
                      <div className="flex items-center gap-1.5 text-red-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-semibold">Failed to recognize timestamp format</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-success-emerald">
                        <Check className="w-4 h-4" />
                        <span className="text-xs font-semibold">
                          Auto-detected: <span className="font-extrabold">{detectedFormat}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Preset Fast Actions */}
                  <div className="flex gap-2 text-[10px] font-bold uppercase text-gray-400">
                    <span className="self-center">Presets:</span>
                    <button 
                      id="preset-current-btn"
                      onClick={() => handleInputChange(Math.floor(Date.now() / 1000).toString())}
                      className="px-2 py-1 bg-gray-50 hover:bg-primary/5 hover:text-primary rounded transition-colors cursor-pointer border border-gray-100"
                    >
                      Now
                    </button>
                    <button 
                      id="preset-epoch-btn"
                      onClick={() => handleInputChange('1715842800')}
                      className="px-2 py-1 bg-gray-50 hover:bg-primary/5 hover:text-primary rounded transition-colors cursor-pointer border border-gray-100"
                    >
                      Epoch Sample
                    </button>
                    <button 
                      id="preset-iso-btn"
                      onClick={() => handleInputChange('2024-05-16T07:00:00Z')}
                      className="px-2 py-1 bg-gray-50 hover:bg-primary/5 hover:text-primary rounded transition-colors cursor-pointer border border-gray-100"
                    >
                      ISO Sample
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Unix Seconds Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Unix Seconds
                  </span>
                  <button 
                    id="copy-unix-seconds-btn"
                    onClick={() => handleCopy(results.unixSec, 'unixSec')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-all cursor-pointer"
                    title="Copy Unix seconds"
                  >
                    {copiedStates.unixSec ? <Check className="w-4 h-4 text-success-emerald" /> : <Clipboard className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-mono text-xl md:text-2xl font-bold text-gray-900 select-all overflow-x-auto whitespace-nowrap scrollbar-none">
                  {results.unixSec}
                </div>
              </div>

              {/* Unix Milliseconds Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Unix Milliseconds
                  </span>
                  <button 
                    id="copy-unix-ms-btn"
                    onClick={() => handleCopy(results.unixMs, 'unixMs')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-all cursor-pointer"
                    title="Copy Unix milliseconds"
                  >
                    {copiedStates.unixMs ? <Check className="w-4 h-4 text-success-emerald" /> : <Clipboard className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-mono text-xl md:text-2xl font-bold text-gray-900 select-all overflow-x-auto whitespace-nowrap scrollbar-none">
                  {results.unixMs}
                </div>
              </div>

              {/* ISO 8601 Card (Spans both columns) */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    ISO 8601 String
                  </span>
                  <button 
                    id="copy-iso8601-btn"
                    onClick={() => handleCopy(results.iso, 'iso')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-all cursor-pointer"
                    title="Copy ISO-8601"
                  >
                    {copiedStates.iso ? <Check className="w-4 h-4 text-success-emerald" /> : <Clipboard className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-mono text-lg md:text-2xl font-bold text-gray-900 break-all select-all">
                  {results.iso}
                </div>
              </div>

              {/* UTC String Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    UTC String
                  </span>
                  <button 
                    id="copy-utc-string-btn"
                    onClick={() => handleCopy(results.utc, 'utc')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-all cursor-pointer"
                    title="Copy UTC string"
                  >
                    {copiedStates.utc ? <Check className="w-4 h-4 text-success-emerald" /> : <Clipboard className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-sans text-sm md:text-base font-semibold text-gray-800 break-words select-all">
                  {results.utc}
                </div>
              </div>

              {/* Local Time Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Local Time ({timezone})
                  </span>
                  <button 
                    id="copy-local-time-btn"
                    onClick={() => handleCopy(results.local, 'local')}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-50 transition-all cursor-pointer"
                    title="Copy Local Time string"
                  >
                    {copiedStates.local ? <Check className="w-4 h-4 text-success-emerald" /> : <Clipboard className="w-4 h-4" />}
                  </button>
                </div>
                <div className="font-sans text-sm md:text-base font-semibold text-gray-800 break-words select-all">
                  {results.local}
                </div>
              </div>

            </div>
          </section>

          {/* Sidebar Widgets (Live Ticker + Settings) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Live Server Time Ticker Card */}
            <div className="bg-primary-container text-white p-6 rounded-xl border border-primary/20 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none transform translate-x-8 -translate-y-8 transition-transform duration-500 group-hover:scale-125" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-2.5 w-2.5 rounded-full bg-success-emerald ${autoRefresh ? 'animate-pulse' : ''}`} />
                    <span className="font-sans text-[11px] font-bold uppercase tracking-widest opacity-80">
                      Live Server Time
                    </span>
                  </div>
                  {!autoRefresh && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 rounded uppercase">
                      Paused
                    </span>
                  )}
                </div>

                <div>
                  <div className="font-mono text-2xl md:text-3xl font-bold tracking-tight" id="liveUnix">
                    {liveUnix}
                  </div>
                  <p className="font-sans text-xs opacity-90 mt-1 break-all" id="liveIso">
                    {liveIso}
                  </p>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button 
                    id="copy-live-unix-btn"
                    onClick={() => handleCopy(liveUnix.toString(), 'liveUnix')}
                    className="flex-1 bg-white/15 hover:bg-white/25 py-2.5 rounded-lg font-sans text-[10px] font-bold uppercase transition-all duration-200 active:scale-95 cursor-pointer text-center"
                  >
                    {copiedStates.liveUnix ? 'Copied!' : 'Copy Unix'}
                  </button>
                  <button 
                    id="copy-live-iso-btn"
                    onClick={() => handleCopy(liveIso, 'liveIso')}
                    className="flex-1 bg-white/15 hover:bg-white/25 py-2.5 rounded-lg font-sans text-[10px] font-bold uppercase transition-all duration-200 active:scale-95 cursor-pointer text-center"
                  >
                    {copiedStates.liveIso ? 'Copied!' : 'Copy ISO'}
                  </button>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5">
              <h3 className="font-display text-base font-bold text-gray-900 border-b border-gray-50 pb-2 flex items-center gap-1.5">
                Display Settings
              </h3>
              
              <div className="space-y-4 font-sans">
                
                {/* Timezone Select */}
                <div className="space-y-2">
                  <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Primary Timezone
                  </label>
                  <div className="relative">
                    <select 
                      id="timezone-select"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs font-semibold text-gray-700 outline-none hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                    >
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="Local">Local System Time</option>
                      <option value="EST">EST (Eastern Standard Time - NY)</option>
                      <option value="PST">PST (Pacific Standard Time - LA)</option>
                      <option value="IST">IST (Indian Standard Time - Kolkata)</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Ticker Auto-Refresh Toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xs font-semibold text-gray-700">
                    Auto-Refresh Ticker
                  </span>
                  <button 
                    id="auto-refresh-toggle"
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer outline-none ${
                      autoRefresh ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                        autoRefresh ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

              </div>
            </div>

          </aside>
        </div>

        {/* Explanation Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-gray-900">
              How Precision Conversions Work
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Our engine utilizes a multi-step detection pipeline to identify your input format. If the input is purely numeric, we check for digit length to differentiate between seconds, milliseconds, and microseconds.
              </p>
              <ul className="space-y-3 pl-4 list-disc font-medium text-xs text-gray-500">
                <li>
                  <span className="font-bold text-gray-900">Unix Epochs:</span> Measured as the number of seconds or milliseconds elapsed since January 1, 1970 (UTC).
                </li>
                <li>
                  <span className="font-bold text-gray-900">ISO-8601:</span> The international standard for date and time formatting (<code className="font-mono bg-gray-50 px-1 py-0.5 rounded text-primary text-xs">YYYY-MM-DDTHH:MM:SSZ</code>).
                </li>
                <li>
                  <span className="font-bold text-gray-900">Precision:</span> We support down to nanosecond precision, facilitating complex logging analysis and high-frequency trading debugging.
                </li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden border border-gray-100 shadow-lg">
            <img 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmpx--Qq_GntMX8luZ1UdPeXXPvf3Jr_TZRMiu8HSjGXp5pQR5jnp8sGus_nfYnBQrcWyHfgDrDpaprSHCqoVmOaT5YiC8-JZ_tizO00HSBKH4JfT1T_rwW0wuCJO9rt-EA-qxpdu-G4qsArMZzKg5TPBldA9qcnTEkktWo2_K4UsTG2sTG9hU1T6mUTdR0bXZVakdp5r8bSH6DmG4K5z7D-ewMw2pgr6klRdbWAzG7-QJxg_mfVkYetkA-rSxmDG8cPZe_KoSxg4"
              alt="Toolskyt developer dashboard displaying elegant timestamps conversion algorithms"
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>
      </div>
    </ToolPageWrapper>
  );
}
