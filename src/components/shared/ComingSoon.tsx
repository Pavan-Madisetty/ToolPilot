interface ComingSoonProps {
  /** Optional tool name for a more specific message. */
  name?: string;
}

/**
 * Shared placeholder for tools that are routed but not yet implemented.
 * Renders a consistent empty state. The `noindex` robots directive for
 * placeholder pages is applied centrally by ToolPageWrapper via
 * `isComingSoon`, so this component stays purely presentational.
 */
export function ComingSoon({ name }: ComingSoonProps) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon" aria-hidden="true">
        🚧
      </span>
      <h2 className="empty-state__title">Coming Soon</h2>
      <p className="empty-state__desc">
        {name ? `${name} is` : 'This tool is'} under active development. Check back soon — or
        explore the tools that are ready to use today.
      </p>
    </div>
  );
}

export default ComingSoon;
