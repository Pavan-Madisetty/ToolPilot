import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { DiffMergeWorkspace } from '@/components/diff/DiffMergeWorkspace';

const ORIGINAL = `Toolskyt is a free collection of online tools.
Every tool runs in your browser, so your files never leave your device.
We add new tools every month.

Contact us if you find a bug.`;

const CHANGED = `Toolskyt is a free collection of fast online tools.
Every tool runs entirely in your browser, so your data never leaves your device.
We add new tools every week.

Found a bug or want a new tool? Contact us.`;

export default function TextDiff() {
  return (
    <ToolPageWrapper toolId="text-diff">
      <DiffMergeWorkspace
        initialLeft={ORIGINAL}
        initialRight={CHANGED}
        leftLabel="Original"
        rightLabel="Revised"
        defaultGranularity="word"
        fileExtension="txt"
      />
    </ToolPageWrapper>
  );
}
