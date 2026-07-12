import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, CopyButton, Textarea } from '@/components/ui';

// Unicode Alphabet Mappings
const NORMAL_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NORMAL_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NORMAL_NUM = '0123456789';

const FONT_PRESETS = [
  {
    name: 'Bold Serif',
    lower: Array.from('𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'),
    upper: Array.from('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'),
    num: Array.from('𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'),
  },
  {
    name: 'Italic Serif',
    lower: Array.from('𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'),
    upper: Array.from('𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'),
    num: Array.from('0123456789'),
  },
  {
    name: 'Bold Italic',
    lower: Array.from('𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'),
    upper: Array.from('𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'),
    num: Array.from('0123456789'),
  },
  {
    name: 'Script (Cursive)',
    lower: Array.from('𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'),
    upper: Array.from('𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'),
    num: Array.from('0123456789'),
  },
  {
    name: 'Bold Script',
    lower: Array.from('𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'),
    upper: Array.from('𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'),
    num: Array.from('0123456789'),
  },
  {
    name: 'Gothic (Fraktur)',
    lower: Array.from('𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'),
    upper: Array.from('𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔𝔖𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'),
    num: Array.from('0123456789'),
  },
  {
    name: 'Bold Gothic',
    lower: Array.from('𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'),
    upper: Array.from('𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'),
    num: Array.from('0123456789'),
  },
  {
    name: 'Double-Struck (Outline)',
    lower: Array.from('𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'),
    upper: Array.from('𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'),
    num: Array.from('𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'),
  },
  {
    name: 'Monospace',
    lower: Array.from('𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚠𝚡𝚢𝚣'),
    upper: Array.from('𝙰𝙱𝙲𝙳𝙴𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'),
    num: Array.from('𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'),
  },
  {
    name: 'Bubble Circled',
    lower: Array.from('ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'),
    upper: Array.from('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'),
    num: Array.from('⓪①②③④⑤⑥⑦⑧⑨'),
  },
  {
    name: 'Fullwidth',
    lower: Array.from('ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'),
    upper: Array.from('ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'),
    num: Array.from('０１２３４５６７８９'),
  },
];

const DECORATOR_PRESETS = [
  { name: 'Wings', prefix: '꧁ ', suffix: ' ꧂' },
  { prefix: '★彡 ', suffix: ' 彡★', name: 'Stars Wave' },
  { prefix: '｡☆✼★ ', suffix: ' ★✼☆｡', name: 'Sparkles Ribbon' },
  { prefix: '【 ', suffix: ' 】', name: 'Bold Brackets' },
  { prefix: '『 ', suffix: ' 』', name: 'Gothic Brackets' },
  { prefix: '✨ ', suffix: ' ✨', name: 'Magic Sparkles' },
  { prefix: '👑 ', suffix: ' 👑', name: 'Crown King' },
  { prefix: '⚡ ', suffix: ' ⚡', name: 'Lightning High' },
  { prefix: '✿ ♡‿♡ ', suffix: ' ♡‿♡ ✿', name: 'Hearts Bloom' },
  { prefix: '•´¯`•. ', suffix: ' .•´¯`•', name: 'Swirls Wave' },
  { prefix: '°°°·.°·..·°¯°·._.· ', suffix: ' ·._.·°¯°·.·° .·°°°', name: 'Complex Outline' },
  { prefix: 'ミ★ ', suffix: ' ★彡', name: 'Shooting Stars' },
  { prefix: '卍 ', suffix: ' 卍', name: 'Swastika Seal' },
  { prefix: '◤ ', suffix: ' ◢', name: 'Gamer Wedges' },
  { prefix: '♥ ', suffix: ' ♥', name: 'Hearts Accent' },
  { prefix: '★ ', suffix: ' ★', name: 'Star Accent' },
  { prefix: '  ▂ ▃ ▅ ▆ ▇ █ ', suffix: ' █ ▇ ▆ ▅ ▃ ▂  ', name: 'Bars Wave' },
  { prefix: '☠️ ', suffix: ' ☠️', name: 'Skull Danger' },
];

const FLIPPED_MAP: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: 'ᗺ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0',
  '.': '˙', ',': '`', '\'': ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '_': '‾',
};

interface OutputItem {
  name: string;
  text: string;
  category: 'font' | 'decoration' | 'special';
}

// Helper function to map text to font
const applyFont = (text: string, style: typeof FONT_PRESETS[0]) => {
  let result = '';
  for (const char of text) {
    let idx = NORMAL_LOWER.indexOf(char);
    if (idx !== -1) {
      result += style.lower[idx] || char;
      continue;
    }

    idx = NORMAL_UPPER.indexOf(char);
    if (idx !== -1) {
      result += style.upper[idx] || char;
      continue;
    }

    idx = NORMAL_NUM.indexOf(char);
    if (idx !== -1) {
      result += style.num[idx] || char;
      continue;
    }

    result += char;
  }
  return result;
};

export default function StylishText() {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'fonts' | 'decorations' | 'special'>('all');

  const outputs: OutputItem[] = [];

  if (inputText.trim()) {
    // 1. Cool Fonts
    FONT_PRESETS.forEach((preset) => {
      outputs.push({
        name: preset.name,
        text: applyFont(inputText, preset),
        category: 'font',
      });
    });

    // 2. Decorated styles (Mix some presets with fancy fonts like Script/Bold script/Gothic)
    const scriptStyle = FONT_PRESETS.find((f) => f.name === 'Bold Script') || FONT_PRESETS[4];
    const doubleStruckStyle = FONT_PRESETS.find((f) => f.name === 'Double-Struck (Outline)') || FONT_PRESETS[7];
    const normalFormatted = inputText;

    DECORATOR_PRESETS.forEach((decor, idx) => {
      // Pick dynamic font mixes for variety
      let baseText = normalFormatted;
      if (idx % 3 === 0) {
        baseText = applyFont(inputText, scriptStyle);
      } else if (idx % 3 === 1) {
        baseText = applyFont(inputText, doubleStruckStyle);
      }

      outputs.push({
        name: decor.name,
        text: decor.prefix + baseText + decor.suffix,
        category: 'decoration',
      });
    });

    // 3. Special effects
    // Strikethrough
    const strikethroughText = inputText
      .split('')
      .map((char) => char + '\u0336')
      .join('');
    outputs.push({ name: 'Strikethrough', text: strikethroughText, category: 'special' });

    // Underline
    const underlineText = inputText
      .split('')
      .map((char) => char + '\u0332')
      .join('');
    outputs.push({ name: 'Underline', text: underlineText, category: 'special' });

    // Upside Down Flipped
    const flippedText = inputText
      .split('')
      .map((char) => FLIPPED_MAP[char] || char)
      .reverse()
      .join('');
    outputs.push({ name: 'Upside Down', text: flippedText, category: 'special' });

    // Zalgo / Glitch
    const glitchText = inputText
      .split('')
      .map((char, idx) => char + ((char.charCodeAt(0) + idx) % 3 === 0 ? '\u030d\u031a\u033d' : ''))
      .join('');
    outputs.push({ name: 'Glitch Text', text: glitchText, category: 'special' });
  }

  const filteredOutputs = outputs.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'fonts') return item.category === 'font';
    if (activeTab === 'decorations') return item.category === 'decoration';
    if (activeTab === 'special') return item.category === 'special';
    return true;
  });

  return (
    <ToolPageWrapper toolId="stylish-text">
      <div className="space-y-6">
        <Textarea
          label={
            <div className="flex items-center justify-between w-full">
              <span>Input Plain Text</span>
              {inputText && (
                <Button onClick={() => setInputText('')} variant="ghost" size="xs">
                  Clear
                </Button>
              )}
            </div>
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste the text you want to decorate here..."
          className="h-[120px] resize-none text-base"
        />

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--border-default)] pb-3">
          {(['all', 'fonts', 'decorations', 'special'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Output list */}
        {filteredOutputs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOutputs.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col justify-between gap-4 group relative"
              >
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest block mb-1">
                    {item.name}
                  </span>
                  <p className="text-xl font-medium text-[var(--text-primary)] select-all break-words leading-relaxed">
                    {item.text}
                  </p>
                </div>
                <div className="flex justify-end pt-2 border-t border-[var(--border-subtle)]">
                  <CopyButton text={item.text} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          inputText && (
            <div className="text-center py-12">
              <span className="text-4xl block mb-2">💡</span>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">No fonts match the selected filter</p>
            </div>
          )
        )}
      </div>
    </ToolPageWrapper>
  );
}
