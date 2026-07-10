import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Button, Card, Input, Select, Slider, CopyButton } from '@/components/ui';
import { Palette, RefreshCw } from 'lucide-react';

const GRADIENT_TYPES = [
  { value: 'linear', label: 'Linear Gradient' },
  { value: 'radial', label: 'Radial Gradient' },
];

export default function GradientGenerator() {
  const [type, setType] = useState<string>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [color1, setColor1] = useState<string>('#6366f1'); // Indigo
  const [color2, setColor2] = useState<string>('#a855f7'); // Purple
  const [stop1, setStop1] = useState<number>(0);
  const [stop2, setStop2] = useState<number>(100);

  const cssValue = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`
    : `radial-gradient(circle, ${color1} ${stop1}%, ${color2} ${stop2}%)`;

  const handleRandomize = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor1(randomHex());
    setColor2(randomHex());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <ToolPageWrapper toolId="gradient-generator">
      <div className="tool-layout lg:grid-cols-2 gap-6">
        {/* Left Column: Settings Panel */}
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
              <Palette size={16} />
              <span>Gradient Settings</span>
            </span>
            <Button onClick={handleRandomize} variant="secondary" size="xs" leftIcon={<RefreshCw size={14} />}>
              Randomize
            </Button>
          </div>

          {/* Gradient Type */}
          <Select
            label="Gradient Type"
            options={GRADIENT_TYPES}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          {/* Angle Slider for Linear type */}
          {type === 'linear' && (
            <Slider
              label="Gradient Angle"
              min={0}
              max={360}
              step={1}
              value={angle}
              onChange={setAngle}
              suffix="°"
            />
          )}

          {/* Color 1 Selector */}
          <div className="grid grid-cols-3 gap-3 items-end">
            <div className="col-span-2">
              <Input
                label="Color 1 (Start)"
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                placeholder="#6366f1"
                className="font-mono"
              />
            </div>
            <div className="h-10 border rounded-xl overflow-hidden relative" style={{ borderColor: 'var(--border-default)' }}>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Color 1 Picker"
              />
              <div className="w-full h-full" style={{ backgroundColor: color1 }} />
            </div>
          </div>

          <Slider
            label="Start Stop Position"
            min={0}
            max={100}
            value={stop1}
            onChange={setStop1}
            suffix="%"
          />

          {/* Color 2 Selector */}
          <div className="grid grid-cols-3 gap-3 items-end border-t pt-4" style={{ borderColor: 'var(--border-default)' }}>
            <div className="col-span-2">
              <Input
                label="Color 2 (End)"
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                placeholder="#a855f7"
                className="font-mono"
              />
            </div>
            <div className="h-10 border rounded-xl overflow-hidden relative" style={{ borderColor: 'var(--border-default)' }}>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Color 2 Picker"
              />
              <div className="w-full h-full" style={{ backgroundColor: color2 }} />
            </div>
          </div>

          <Slider
            label="End Stop Position"
            min={0}
            max={100}
            value={stop2}
            onChange={setStop2}
            suffix="%"
          />
        </Card>

        {/* Right Column: Visual Preview Panel */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 flex flex-col gap-4">
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Gradient Preview
            </span>
            <div
              className="flex-1 min-h-[220px] rounded-2xl border shadow-inner"
              style={{
                background: cssValue,
                borderColor: 'var(--border-default)',
              }}
              aria-label="Gradient Preview Swatch"
            />
          </Card>

          <Card className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                CSS Code Output
              </span>
              <CopyButton text={`background: ${cssValue};`} />
            </div>
            <pre
              className="p-3 border rounded-xl font-mono text-xs overflow-x-auto leading-relaxed select-all"
              style={{
                borderColor: 'var(--border-default)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
            >
              {`background: ${cssValue};`}
            </pre>
          </Card>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
