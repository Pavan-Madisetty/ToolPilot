import { useState, ReactNode } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  className,
}: AccordionItemProps) {
  const [localOpen, setLocalOpen] = useState(false);
  const active = onToggle ? isOpen : localOpen;
  const toggle = onToggle ?? (() => setLocalOpen(!localOpen));

  return (
    <div
      className={clsx(
        'transition-colors duration-150',
        className
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={active}
        className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-sm hover:bg-[var(--bg-surface)] transition-colors cursor-pointer text-[var(--text-primary)]"
      >
        <span className="pr-4">{title}</span>
        <ChevronDown
          size={18}
          className={clsx(
            'shrink-0 text-[var(--text-tertiary)] transition-transform duration-200',
            {
              'rotate-180': active,
            }
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface AccordionProps {
  items: Array<{
    title: ReactNode;
    content: ReactNode;
  }>;
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div
      className={clsx(
        'rounded-[var(--radius-lg)] border border-border-default overflow-hidden divide-y divide-border-default',
        className
      )}
    >
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          isOpen={expandedIndex === idx}
          onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

export default Accordion;
