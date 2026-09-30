import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { DiffMergeWorkspace } from '@/components/diff/DiffMergeWorkspace';

const ORIGINAL = `import { fetchUser } from './api';

export async function greet(id) {
  const user = await fetchUser(id);
  if (!user) return 'Hello, stranger';
  console.log('greeting', user.name);
  return 'Hello, ' + user.name;
}

export const VERSION = '1.0.0';
`;

const CHANGED = `import { fetchUser } from './api';
import { formatName } from './format';

export async function greet(id, locale = 'en') {
  const user = await fetchUser(id);
  if (!user) return 'Hello, stranger';
  return \`Hello, \${formatName(user, locale)}\`;
}

export const VERSION = '1.1.0';
`;

export default function DiffChecker() {
  return (
    <ToolPageWrapper toolId="diff-checker">
      <DiffMergeWorkspace
        initialLeft={ORIGINAL}
        initialRight={CHANGED}
        leftLabel="Original"
        rightLabel="Changed"
        defaultGranularity="word"
        codeEditor
      />
    </ToolPageWrapper>
  );
}
