import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface TabOption {
  key: string;
  name: string;
  emoji?: string;
  icon?: ReactNode;
}

export interface TabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  tabs: TabOption[];
  ariaLabel?: string;
  className?: string;
}

export function Tabs({
  activeTab,
  onTabChange,
  tabs,
  ariaLabel = 'Tabs',
  className,
}: TabsProps) {
  return (
    <div className={clsx('workspace-tabs-container', className)}>
      <div className="workspace-tabs" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={clsx('workspace-tab cursor-pointer', {
                'workspace-tab--active': isActive,
              })}
              aria-selected={isActive}
              role="tab"
            >
              {tab.emoji && (
                <span className="workspace-tab__emoji" aria-hidden="true">
                  {tab.emoji}
                </span>
              )}
              {tab.icon && (
                <span className="flex items-center justify-center shrink-0" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span className="workspace-tab__name">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
